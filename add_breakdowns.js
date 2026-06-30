const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Inject the helper function
const helperFn = `
function getSkillDamageBreakdown(skillObj, displayRank) {
    let rankMultiplier = 1 + ((displayRank || 1) - 1) * 0.1;
    let wpMin = window.weaponMinDmg || 0;
    let wpMax = window.weaponMaxDmg || 0;

    let cls = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
    let statVal = 0;
    let factor = 0.125;
    let mainStatName = 'Intelligence';

    if (window.D4_COMPILED_STATS) {
        if (cls === 'Barbarian') { mainStatName = 'Strength'; statVal = window.D4_COMPILED_STATS['Strength']?.final||0; factor = 0.11; }
        else if (cls === 'Paladin') { mainStatName = 'Strength'; statVal = window.D4_COMPILED_STATS['Strength']?.final||0; factor = 0.125; }
        else if (cls === 'Druid') { mainStatName = 'Willpower'; statVal = window.D4_COMPILED_STATS['Willpower']?.final||0; factor = 0.125; }
        else if (cls === 'Rogue') { mainStatName = 'Dexterity'; statVal = window.D4_COMPILED_STATS['Dexterity']?.final||0; factor = 0.11; }
        else if (cls === 'Sorcerer' || cls === 'Necromancer') { mainStatName = 'Intelligence'; statVal = window.D4_COMPILED_STATS['Intelligence']?.final||0; factor = 0.125; }
        else if (cls === 'Spiritborn') { mainStatName = 'Dexterity'; statVal = window.D4_COMPILED_STATS['Dexterity']?.final||0; factor = 0.125; }
    }

    let mainStatPct = statVal * factor;
    let mainStatMult = 1 + (mainStatPct / 100);

    let additiveMult = typeof calculateSkillAdditiveBucket === 'function' ? 1 + calculateSkillAdditiveBucket(skillObj) : 1;
    
    // In our compile logic, main stat was incorrectly added to the additive 'Skill Damage' stat.
    // We remove it here so it is purely multiplicative as per D4 math.
    additiveMult -= (mainStatPct / 100);
    if (additiveMult < 1) additiveMult = 1; // safety

    let multiMult = typeof calculateSkillMultiplicativeBucket === 'function' ? calculateSkillMultiplicativeBucket(skillObj) : 1;
    
    let finalScalar = rankMultiplier * mainStatMult * additiveMult * multiMult;

    let minDmg = 0;
    let maxDmg = 0;
    if (skillObj.baseDamageScalar) {
        minDmg = Math.floor(wpMin * skillObj.baseDamageScalar * finalScalar);
        maxDmg = Math.floor(wpMax * skillObj.baseDamageScalar * finalScalar);
    }

    return {
        mainStatName,
        mainStatMult,
        additiveMult,
        multiMult,
        finalScalar,
        wpMin,
        wpMax,
        minStr: minDmg.toLocaleString(),
        maxStr: maxDmg.toLocaleString(),
        rankMultiplier
    };
}
`;

if (!app.includes('getSkillDamageBreakdown')) {
    app += '\n' + helperFn;
}

// 2. Replace the tooltip logic
const tooltipRegex = /    let breakdownHtml = '';[\s\S]*?let footerHtml = `/m;

const newTooltipLogic = `    let breakdownHtml = '';
    if (skillObj.baseDamageScalar) {
        let b = getSkillDamageBreakdown(skillObj, displayRank);
        let addStr = ((b.additiveMult - 1) * 100).toFixed(1).replace('.0', '');
        
        breakdownHtml = \\\`
            <div class="d4-tooltip-upgrades-header" style="margin-top: 15px;">DAMAGE BREAKDOWN</div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>\${b.mainStatName} Multiplier:</span> <span style="color: #fff;">x\${b.mainStatMult.toFixed(2)}</span>
            </div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Additive Stats:</span> <span style="color: #fff;">+\${addStr}%</span>
            </div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Multiplicative Stats:</span> <span style="color: #fff;">x\${b.multiMult.toFixed(2)}</span>
            </div>
            <div style="font-size: 0.95rem; color: #c9a55c; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #333; padding-top: 5px;">
              <span>Final Damage:</span> <span>\${b.minStr} - \${b.maxStr}</span>
            </div>
        \\\`;
    }

    let footerHtml = \``;

app = app.replace(tooltipRegex, newTooltipLogic);

// 3. Replace the renderCalcSkills logic
const calcRegex = /let additiveMult = 1 \+ calculateSkillAdditiveBucket\(modSkill\);[\s\S]*?<\/div>\`;\s*\}/m;

const newCalcLogic = `let b = getSkillDamageBreakdown(modSkill, rank);
                              let finalScalar = b.finalScalar;

                              if (modSkill.baseDamageScalar) {
                                  let pct = (modSkill.baseDamageScalar * 100).toFixed(1).replace('.0', '');
                                  let addStr = ((b.additiveMult - 1) * 100).toFixed(1).replace('.0', '');
                                  html += \\\`<details style="margin-bottom: 4px;">
                                    <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                      <span style="color: #555;">├</span> Damage (\${pct}%): <span style="color: #fff; font-weight: bold;">\${b.minStr} - \${b.maxStr}</span>
                                    </summary>
                                    <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> \${b.mainStatName} Multiplier: <span style="color: #fff;">x\${b.mainStatMult.toFixed(2)}</span>
                                      </div>
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (\${addStr}%)</span>
                                      </div>
                                      <div style="display: flex; align-items: center; gap: 5px;">
                                        <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x\${b.multiMult.toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </details>\\\`;
                              }`;

app = app.replace(calcRegex, newCalcLogic);

fs.writeFileSync('app.js', app);
console.log("Updated both breakdown locations.");
