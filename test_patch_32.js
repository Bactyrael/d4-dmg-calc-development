const fs = require('fs');
let appContent = fs.readFileSync('app.js', 'utf8').split('\n');

let startIdx = 5114; // Index is line number - 1
let endIdx = 5130;

let newLines = [
'        if (spec === "Cold Mage" && Number(node) === 2) {',
'            modified.secondaryScalars = modified.secondaryScalars || {};',
'            modified.secondaryScalars.dot = {',
'                scalar: 2.0,',
'                tags: ["Search_Summoning", "Skill_Primary_Minion", "Keyword_Core", "Search_Cold", "Skill_Cold", "Search_DoT", "Damage_Override_Cold"]',
'            };',
'        }',
'        ',
'        if (spec === "Shadow Mage" && Number(node) === 0) {',
'            modified.secondaryScalars = modified.secondaryScalars || {};',
'            modified.secondaryScalars.shadow_dot = {',
'                scalar: 1.0,',
'                isHit: false,',
'                nameOverride: "Shadow Mage Upgrade 1",',
'                addTags: ["Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow", "Search_ShadowDOT"]',
'            };',
'        }'
];

appContent.splice(startIdx, endIdx - startIdx + 1, ...newLines);

fs.writeFileSync('app.js', appContent.join('\n'));
console.log("Syntax patched");
