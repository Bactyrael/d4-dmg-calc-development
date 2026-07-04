const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');
c = c.replace('if (spec === "Shadow Mage" && Number(node) === 0)', 'if (spec === "Shadow Mage" && Number(node) === 1)');
fs.writeFileSync('app.js', c);
console.log('Fixed node index');
