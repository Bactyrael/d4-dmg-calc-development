const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

content = content.replace(
  /"desc":\s*"Your Darkness Skills Chill enemies for up to 100% and deal \[100 - 125\]%\[x\] increased damage to Frozen enemies and bosses.Every 800 times you damage enemies with Darkness Skills, all Nearby enemies are Feared for 0.25 seconds before Freezing for 3 more seconds."/g,
  '"desc": "Your Darkness Skills Chill enemies for up to 100% and deal [200 - 250]%[x] increased damage to Frozen enemies and bosses. Every 800 times you damage enemies with Darkness Skills, all Nearby enemies are Feared for 0.25 seconds before Freezing for 3 more seconds."'
);

const regex = /({\s*"name":\s*"Bloodless Scream",\s*"rarity":\s*"unique",\s*"classes":\s*\[[^\]]+\]\s*,)/g;
content = content.replace(regex, "$1\n        \"affixes\": [\n          \"+[2.0 - 4.0] to Darkness Skills\"\n        ],");

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched database.js successfully");
