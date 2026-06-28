const fs = require('fs');

// 1. Prepare temp skills.js
let rawSkills = fs.readFileSync('assets/skills.js', 'utf8');
rawSkills = rawSkills.replace('const skillsDatabase =', 'module.exports =');
fs.writeFileSync('temp_skills.js', rawSkills);

// 2. Load modules
const db = require('./temp_skills.js');
const maxroll = require('./maxroll_data.json');

// 3. Map maxroll skills by name
const mrSkills = {};
for (const [id, skill] of Object.entries(maxroll.skills)) {
    if (skill.name && skill.class === 4) { // Necromancer
        mrSkills[skill.name.toLowerCase().trim()] = skill;
    }
}

function parseScalar(payloads) {
    if (Array.isArray(payloads) && payloads.length > 0) {
        for (let p of payloads) {
            if (p.damage && p.damage.scalar) {
                let scalarStr = String(p.damage.scalar);
                let match = scalarStr.match(/([\d\.]+)\*Table/);
                if (match) return parseFloat(match[1]);
                if (!isNaN(parseFloat(scalarStr))) return parseFloat(scalarStr);
            }
        }
    }
    return null;
}

function parseCost(costArr) {
    if (Array.isArray(costArr) && costArr.length > 0 && costArr[0].cost) {
        let costStr = String(costArr[0].cost);
        let match = costStr.match(/:(\d+)$/);
        if (match) return parseInt(match[1]);
        if (/^\d+$/.test(costStr)) return parseInt(costStr);
        let modMatch = costStr.match(/Mod.*?(\d+)$/);
        if (modMatch) return parseInt(modMatch[1]);
    }
    return null;
}

function parseCooldown(cdArr) {
    if (Array.isArray(cdArr) && cdArr.length > 0 && cdArr[0].cooldown) {
        let cdStr = String(cdArr[0].cooldown);
        let match = cdStr.match(/:([\d\.]+)$/);
        if (match) return parseFloat(match[1]);
        if (/^[\d\.]+$/.test(cdStr)) return parseFloat(cdStr);
    }
    return null;
}

// 4. Update the database hierarchically
for (const [category, skills] of Object.entries(db)) {
    for (let i = 0; i < skills.length; i++) {
        let skill = skills[i];
        let mrMatch = mrSkills[skill.name.toLowerCase().trim()];
        
        if (mrMatch) {
            if (mrMatch.desc) {
                skill.description = mrMatch.desc.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n');
            }
            if (mrMatch.payloads) {
                let s = parseScalar(mrMatch.payloads);
                if (s) skill.baseDamageScalar = s;
            }
            if (mrMatch.tags) skill.tags = mrMatch.tags;
            if (mrMatch.combatEffectChance !== undefined) skill.luckyHitChance = parseInt(mrMatch.combatEffectChance);
            
            if (mrMatch.cost) {
                let c = parseCost(mrMatch.cost);
                if (c !== null && c !== 0) skill.resourceCost = c;
                else delete skill.resourceCost; // Remove if 0 or unparseable to avoid showing [object Object] or 0
            }
            if (mrMatch.cooldown) {
                let cd = parseCooldown(mrMatch.cooldown);
                if (cd !== null && cd !== 0) skill.cooldown = cd;
                else delete skill.cooldown;
            }
            
            if (skill.modifiers && mrMatch.mods) {
                for (let j = 0; j < skill.modifiers.length; j++) {
                    let mod = skill.modifiers[j];
                    let mrModMatch = mrMatch.mods.find(m => m.name.toLowerCase().trim() === mod.name.toLowerCase().trim());
                    if (mrModMatch) {
                        if (mrModMatch.desc) {
                            mod.description = mrModMatch.desc.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n');
                        }
                        if (mrModMatch.tags) mod.tags = mrModMatch.tags;
                        if (mrModMatch.payloads) {
                            let s = parseScalar(mrModMatch.payloads);
                            if (s) mod.baseDamageScalar = s;
                        }
                    }
                }
            }
        }
    }
}

// 5. Serialize back to skills.js
const output = `const skillsDatabase = ${JSON.stringify(db, null, 2)};`;
fs.writeFileSync('assets/skills.js', output);
console.log("Successfully rebuilt skills.js hierarchically with payloads!");
