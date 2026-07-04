const fs = require('fs');

let skillsContent = fs.readFileSync('assets/skills.js', 'utf8');

let index = skillsContent.indexOf('"name": "Unfinished Business"');
if (index !== -1) {
    let target = '"name": "Unfinished Business",';
    let blockEnd = skillsContent.indexOf('},', index);
    
    let block = skillsContent.substring(index, blockEnd);
    let newBlock = block.replace('"maxRank": 1', '"maxRank": 1,\n          "secondaryScalars": {\n            "tooltip_dot": {\n              "scalar": 2.5,\n              "isHit": false,\n              "nameOverride": "Unfinished Business"\n            }\n          }');
    
    skillsContent = skillsContent.replace(block, newBlock);
    fs.writeFileSync('assets/skills.js', skillsContent);
    console.log("Patched Unfinished Business successfully");
} else {
    console.log("NO MATCH FOUND");
}
