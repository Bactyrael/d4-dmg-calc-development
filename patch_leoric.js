const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /({\s*"name":\s*"Mace of King Leoric",\s*"rarity":\s*"unique",\s*"classes":\s*\[[^\]]+\]\s*,)/g;
content = content.replace(regex, `$1\n        "affixes": [\n          "+[1 - 2] to Golem"\n        ],`);

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched Mace of King Leoric in database.js successfully");
