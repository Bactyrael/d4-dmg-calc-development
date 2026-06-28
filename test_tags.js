const fs = require('fs');

let skillsData = fs.readFileSync('assets/skills.js', 'utf8').replace('const skillsDatabase = ', 'global.skillsDatabase = ').replace(/;$/, '');
eval(skillsData);

global.currentBuild = {
    bookOfTheDead: {
        warriors: { spec: 'Skirmisher', node: '1' }
    }
};

function updateDynamicSkillTags() {
    let warrior = null;
    if (typeof global.skillsDatabase !== 'undefined') {
        for (let cat in global.skillsDatabase) {
            warrior = global.skillsDatabase[cat].find(s => s.name === "Skeleton Warrior");
            if (warrior) break;
        }
    }

    if (warrior && global.currentBuild && global.currentBuild.bookOfTheDead) {
        let spec = global.currentBuild.bookOfTheDead.warriors.spec;
        let node = global.currentBuild.bookOfTheDead.warriors.node;
        
        warrior.tags = warrior.tags.filter(t => !["Search_Bone", "Search_Blood", "Search_Darkness", "Search_Physical", "Search_Shadow", "Damage_Override_Physical", "Damage_Override_Shadow", "Skill_Bone", "Skill_Blood", "Skill_Shadow"].includes(t));
        warrior.damageType = "Physical"; 
        
        if (node !== null) {
            if (spec === "Skirmisher") {
                warrior.damageType = "Physical";
                warrior.tags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
            } else if (spec === "Defender") {
                warrior.damageType = "Physical";
                warrior.tags.push("Search_Physical", "Search_Blood", "Damage_Override_Physical", "Skill_Blood");
            } else if (spec === "Reaper") {
                warrior.damageType = "Shadow";
                warrior.tags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
            }
        }
    }
    return warrior;
}

let w = updateDynamicSkillTags();
console.log(w.tags);
