const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

if (content.includes("'6': 'Essence'")) {
    content = content.replace("'6': 'Essence'", "'6': 'Essence',\n    '-1745774146': 'Summon'");
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Summon param mapping');
} else {
    console.log('Target not found');
}
