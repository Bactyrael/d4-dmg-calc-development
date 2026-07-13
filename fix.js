const fs = require('fs');
let code = fs.readFileSync('assets/database.js', 'utf8');
code = code.replace(/("name":\s*"Doombringer",\s*"rarity":\s*"mythic",)/g, '$1\n        "affixes": [\n          "+[15]% Maximum Life"\n        ],');
fs.writeFileSync('assets/database.js', code);
console.log('done');
