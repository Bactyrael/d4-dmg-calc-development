const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Inject helpers before renderCalcSkills
const helperStr = `
function getActiveConditions() {
    return {
        vulnerable: document.getElementById('cond-vulnerable')?.checked || false,
        close: document.getElementById('cond-close')?.checked || false,
        distant: document.getElementById('cond-distant')?.checked || false,
        healthy: document.getElementById('cond-healthy')?.checked || false,
        injured: document.getElementById('cond-injured')?.checked || false,
        cc: document.getElementById('cond-cc')?.checked || false,
        overpower: document.getElementById('cond-overpower')?.checked || false
    };
}

function calculateSkillAdditiveBucket(skill) {
    if (!window.D4_COMPILED_STATS) return 0;
    const stats = window.D4_COMPILED_STATS;
    const conds = getActiveConditions();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    const dType = (skill.damageType || '').toLowerCase();
    
    let bucket = 0;
    
    // Helper to safely add stat
    const addStat = (statName) => {
        if (stats[statName] && stats[statName].final) {
            // Stats are typically stored as whole numbers (e.g., 50 for 50%), so divide by 100 for multiplier
            // Wait, compiledStats might already be handled. Let's assume stats are e.g., 50 = 50%.
            bucket += stats[statName].final / 100;
        }
    };

    // Generic Additives
    addStat('Damage');
    addStat('Skill Damage'); // Additive specific to skills

    // Type Additives
    if (dType === 'shadow' || tags.includes('skill_shadow') || tags.includes('search_shadow')) addStat('Shadow Damage');
    if (dType === 'physical' || tags.includes('skill_physical') || tags.includes('search_physical')) addStat('Physical Damage');
    if (dType === 'bone' || tags.includes('skill_bone') || tags.includes('search_bone')) addStat('Bone Damage');
    if (tags.includes('skill_blood')) addStat('Blood Damage');
    if (tags.includes('skill_darkness')) addStat('Darkness Damage');

    // Category Additives
    if (tags.includes('keyword_core')) addStat('Core Skill Damage');
    if (tags.includes('keyword_basic')) addStat('Basic Skill Damage');
    if (tags.includes('keyword_macabre')) addStat('Macabre Skill Damage');
    if (tags.includes('keyword_corruption')) addStat('Corruption Skill Damage');
    if (tags.includes('keyword_summoning')) addStat('Summoning Skill Damage');

    // DoT Additives
    if (tags.includes('search_dot')) {
        addStat('Damage over Time');
        if (dType === 'shadow' || tags.includes('skill_shadow')) addStat('Shadow Damage over Time');
    }

    // Conditional Additives
    if (conds.vulnerable) addStat('Damage to Vulnerable Enemies');
    if (conds.close) addStat('Damage to Close Enemies');
    if (conds.distant) addStat('Damage to Distant Enemies');
    if (conds.healthy) addStat('Damage while Healthy');
    if (conds.injured) addStat('Damage while Injured');
    if (conds.cc) {
        addStat('Damage to Crowd Controlled Enemies');
        addStat('Damage to Slowed Enemies');
        addStat('Damage to Stunned Enemies');
    }
    
    // Fortify is a player state, assume 100% if they have fortify generation, but we'll just check if they have Max Life fortify
    // We'll leave conditional player states simple for now.

    return bucket;
}

function calculateSkillMultiplicativeBucket(skill) {
    if (!window.D4_COMPILED_STATS) return 1;
    const stats = window.D4_COMPILED_STATS;
    const conds = getActiveConditions();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    
    let bucket = 1;
    
    // Iterate over all stats to find multiplicative ones
    for (let key in stats) {
        if (!stats.hasOwnProperty(key)) continue;
        const stat = stats[key];
        const val = stat.final;
        if (!val || val === 0) continue;
        
        // Match generic Multipliers
        // [x] is usually appended to the name or it's tagged as isMultiplicative = true inside compileCharacterStats
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('[x]') || stat.isMultiplicative) {
            // Check if it applies to this skill
            let applies = false;
            
            if (lowerKey.includes('damage') && !lowerKey.includes('to')) {
                // Generic damage multiplier (e.g. 20% [x] Damage)
                applies = true;
            }
            
            if (lowerKey.includes('vulnerable') && conds.vulnerable) applies = true;
            if (lowerKey.includes('shadow') && (tags.includes('skill_shadow') || tags.includes('search_shadow'))) applies = true;
            if (lowerKey.includes('bone') && (tags.includes('skill_bone') || tags.includes('search_bone'))) applies = true;
            if (lowerKey.includes('blood') && tags.includes('skill_blood')) applies = true;
            if (lowerKey.includes('core') && tags.includes('keyword_core')) applies = true;
            if (lowerKey.includes('macabre') && tags.includes('keyword_macabre')) applies = true;
            
            // Temporary catch-all for aspect multipliers if they don't specify type
            if (!lowerKey.includes('shadow') && !lowerKey.includes('bone') && !lowerKey.includes('blood') && !lowerKey.includes('core') && !lowerKey.includes('macabre') && !lowerKey.includes('vulnerable')) {
                applies = true;
            }

            if (applies) {
                bucket *= (1 + (val / 100));
            }
        }
    }
    
    return bucket;
}
`;

const renderFnRegex = /function renderCalcSkills\(\) \{/;
if (app.match(renderFnRegex)) {
    app = app.replace(renderFnRegex, helperStr + '\nfunction renderCalcSkills() {');
} else {
    console.log("Could not find renderCalcSkills definition!");
}

// 2. Inject bucket usage into renderCalcSkills inner loop
const innerTarget = `                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                let minStr = Math.floor(wpMin * modSkill.baseDamageScalar * rankMultiplier).toLocaleString();
                                let maxStr = Math.floor(wpMax * modSkill.baseDamageScalar * rankMultiplier).toLocaleString();`;
                                
const innerReplacement = `                            let additiveMult = 1 + calculateSkillAdditiveBucket(modSkill);
                            let multiMult = calculateSkillMultiplicativeBucket(modSkill);
                            let finalScalar = rankMultiplier * additiveMult * multiMult;

                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * finalScalar * 100).toFixed(1).replace('.0', '');
                                let minStr = Math.floor(wpMin * modSkill.baseDamageScalar * finalScalar).toLocaleString();
                                let maxStr = Math.floor(wpMax * modSkill.baseDamageScalar * finalScalar).toLocaleString();`;

if (app.includes(innerTarget)) {
    app = app.replace(innerTarget, innerReplacement);
} else {
    console.log("Could not find innerTarget 1!");
}

const innerSecondaryTarget = `                                    let pct = (val * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                    let minStr = Math.floor(wpMin * val * rankMultiplier).toLocaleString();
                                    let maxStr = Math.floor(wpMax * val * rankMultiplier).toLocaleString();`;

const innerSecondaryReplacement = `                                    let pct = (val * finalScalar * 100).toFixed(1).replace('.0', '');
                                    let minStr = Math.floor(wpMin * val * finalScalar).toLocaleString();
                                    let maxStr = Math.floor(wpMax * val * finalScalar).toLocaleString();`;

if (app.includes(innerSecondaryTarget)) {
    app = app.replace(innerSecondaryTarget, innerSecondaryReplacement);
} else {
    console.log("Could not find innerSecondaryTarget!");
}

// 3. Inject event listeners in document ready
const initTarget = `  document.querySelectorAll('.calc-nav-btn').forEach(btn => {`;
const initReplacement = `  document.querySelectorAll('.calc-condition').forEach(chk => {
    chk.addEventListener('change', () => {
      if (typeof renderCalcSkills === 'function') renderCalcSkills();
    });
  });

  document.querySelectorAll('.calc-nav-btn').forEach(btn => {`;

if (app.includes(initTarget)) {
    app = app.replace(initTarget, initReplacement);
} else {
    console.log("Could not find initTarget!");
}

fs.writeFileSync('app.js', app);
console.log("Successfully injected buckets!");
