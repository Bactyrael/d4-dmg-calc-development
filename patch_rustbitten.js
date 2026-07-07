const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /({\s*"name":\s*"Rustbitten Dirk",\s*"rarity":\s*"unique",\s*"classes":\s*\[[^\]]+\]\s*,)/g;
content = content.replace(regex, `$1\n        "affixes": [\n          "x[8.0 - 13.0]% All Damage Multiplier"\n        ],`);

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched Rustbitten Dirk in database.js successfully");
