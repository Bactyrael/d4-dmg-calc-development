const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

if (content.includes("'-466600286': 'Bone'")) {
    content = content.replace("'-466600286': 'Bone'", "'-466600286': 'Bone',\n    '6': 'Essence'");
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Essence param mapping');
} else {
    console.log('Target not found');
}
