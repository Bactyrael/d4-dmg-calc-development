const fs = require('fs');
let appContent = fs.readFileSync('app.js', 'utf8');

let target = 'if (spec === "Cold Mage" && Number(node) === 2) {';
let index = appContent.indexOf(target);

if (index !== -1) {
    let blockStart = index;
    let blockEnd = appContent.indexOf('}', blockStart) + 1;
    
    let block = appContent.substring(blockStart, blockEnd);
    let newBlock = block + `
        
        if (spec === "Shadow Mage" && Number(node) === 0) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.shadow_dot = {
                scalar: 1.0,
                isHit: false,
                nameOverride: "Shadow Mage Upgrade 1",
                addTags: ["Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow", "Search_ShadowDOT"]
            };
        }`;
        
    appContent = appContent.replace(block, newBlock);
    fs.writeFileSync('app.js', appContent);
    console.log("SUCCESS");
} else {
    console.log("FAIL");
}
