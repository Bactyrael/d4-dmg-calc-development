const fs = require('fs');

const maxroll = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));
const skills = maxroll.skills;

// We will read assets/skills.js, strip the "const skillsDatabase = " and parse it
let skillsJsText = fs.readFileSync('assets/skills.js', 'utf8');
skillsJsText = skillsJsText.replace('const skillsDatabase = ', '');
// It might end with a semicolon
skillsJsText = skillsJsText.trim();
if (skillsJsText.endsWith(';')) {
    skillsJsText = skillsJsText.slice(0, -1);
}

const skillsDatabase = JSON.parse(skillsJsText);

for (const category in skillsDatabase) {
    for (const skill of skillsDatabase[category]) {
        // Find the skill in maxroll data
        let maxrollKey = "Necromancer_" + skill.name.replace(/\s+/g, '');
        if (!skills[maxrollKey]) {
            // some mismatch? e.g. "Bone Splinters" -> "Necromancer_BoneSplinters"
            console.log("Missing maxroll key:", maxrollKey);
            continue;
        }
        
        const maxrollSkill = skills[maxrollKey];
        if (maxrollSkill.mods) {
            skill.modifiers = [];
            maxrollSkill.mods.forEach(mod => {
                skill.modifiers.push({
                    name: mod.name,
                    maxRank: 1
                });
            });
            // delete the old enhancement structure
            delete skill.enhancement;
        }
    }
}

fs.writeFileSync('assets/skills.js', "const skillsDatabase = " + JSON.stringify(skillsDatabase, null, 2) + ";\n", 'utf8');
console.log("Updated assets/skills.js with 7 modifiers per skill.");
