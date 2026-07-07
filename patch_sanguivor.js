const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /({\s*"name":\s*"Sanguivor, Blade of Zir",\s*"rarity":\s*"unique",\s*"classes":\s*\[[^\]]+\]\s*,)/g;
content = content.replace(regex, `$1\n        "affixes": [\n          "x[15.0 - 25.0]% All Damage Multiplier"\n        ],`);

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched Sanguivor in database.js successfully");
