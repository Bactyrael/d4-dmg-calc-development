const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

if (content.includes("'1781953454': 'Blood'")) {
    content = content.replace("'1781953454': 'Blood'", "'1781953454': 'Blood',\n    '-466600286': 'Bone'");
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Bone param mapping');
} else {
    console.log('Target not found');
}
