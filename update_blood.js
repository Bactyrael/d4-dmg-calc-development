const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

if (content.includes("'5': 'Shadow'")) {
    content = content.replace("'5': 'Shadow'", "'5': 'Shadow',\n    '1781953454': 'Blood'");
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Blood param mapping');
} else {
    console.log('Target not found');
}
