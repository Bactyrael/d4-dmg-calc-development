const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /causing both Army of the Dead and the souls to deal \[20\.0 - 25\.0\]%\[x\] increased damage/g;
content = content.replace(regex, 'causing both Army of the Dead and the souls to deal [40 - 50]%[x] increased damage');

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Patched Sanguivor description in database.js successfully");
