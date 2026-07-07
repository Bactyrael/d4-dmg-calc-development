const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'assets', 'database.js');
let content = fs.readFileSync(dbPath, 'utf8');

const regex = /souls\.Only Army of the Dead/g;
content = content.replace(regex, 'souls. Only Army of the Dead');

fs.writeFileSync(dbPath, content, 'utf8');
console.log("Fixed Sanguivor spacing in database.js successfully");
