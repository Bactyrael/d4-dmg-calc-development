const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /"x\[15\.0 - 25\.0\]% All Damage Multiplier"/g;
content = content.replace(regex, '"x[12 - 20]% All Damage Multiplier"');

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Fixed Sanguivor affix in database.js successfully");
