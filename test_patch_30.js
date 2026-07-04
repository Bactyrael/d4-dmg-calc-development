const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

let target = `        if (spec === "Cold Mage" && Number(node) === 2) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.dot = {
                scalar: 2.0,
                tags: ["Search_Summoning", "Skill_Primary_Minion", "Keyword_Core", "Search_Cold", "Skill_Cold", "Search_DoT", "Damage_Override_Cold"]
            };
        }`;

let replace = `        if (spec === "Cold Mage" && Number(node) === 2) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.dot = {
                scalar: 2.0,
                tags: ["Search_Summoning", "Skill_Primary_Minion", "Keyword_Core", "Search_Cold", "Skill_Cold", "Search_DoT", "Damage_Override_Cold"]
            };
        }
        
        if (spec === "Shadow Mage" && Number(node) === 0) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.shadow_dot = {
                scalar: 1.0,
                isHit: false,
                nameOverride: "Shadow Mage Upgrade 1",
                addTags: ["Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow", "Search_ShadowDOT"]
            };
        }`;

let result = appContent.replace(target, replace);
if (result === appContent) {
    console.log("NO MATCH");
} else {
    fs.writeFileSync('app.js', result);
    console.log("Patched Shadow Mage upgrade 1");
}
