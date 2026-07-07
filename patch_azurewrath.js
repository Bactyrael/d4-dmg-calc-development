const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /({\s*"name":\s*"Azurewrath",\s*"rarity":\s*"unique",\s*"classes":\s*\[[^\]]+\]\s*,)/g;
content = content.replace(regex, `$1\n        "affixes": [\n          "+[200 - 400] Maximum Life"\n        ],`);

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched Azurewrath in database.js successfully");
