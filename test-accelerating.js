const fs = require('fs');
let skillsData = fs.readFileSync('assets/skills.js', 'utf8').replace('const skillsDatabase = ', 'global.skillsDatabase = ').replace(/;$/, '');
eval(skillsData);

const appJs = fs.readFileSync('app.js', 'utf8');

// We just want to extract the logic that evaluates Accelerating Aspect
let hasCore = false;
let currentBuild = {
    activeSkills: ['Blood Lance', null, null, null, null, null]
};

for (let skillName of currentBuild.activeSkills) {
    if (!skillName) continue;
    let found = null;
    for (let cat in global.skillsDatabase) {
        found = global.skillsDatabase[cat].find(s => s.name === skillName);
        if (found) break;
    }
    if (found) {
        console.log("Found skill: " + skillName);
        console.log("Tags:", found.tags);
        if (found.tags && found.tags.some(t => t.toLowerCase() === 'skill_core' || t.toLowerCase() === 'skill_primary_core')) {
            let isHit = found.isHit !== undefined ? found.isHit : !['Decompose', 'Blighted Corpse Explosion'].includes(found.baseName || found.name);
            console.log("IsHit:", isHit);
            if (isHit) {
                hasCore = true;
                break;
            }
        } else {
            console.log("Core tags not found!");
        }
    } else {
        console.log("Skill not found in database");
    }
}
console.log("HasCore evaluated to:", hasCore);
