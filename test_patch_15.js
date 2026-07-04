const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

content = content.replace(
    /secSkill\.isComponentDot = !canCrit;/,
    "secSkill.isComponentDot = key.toLowerCase().includes('dot');"
);

fs.writeFileSync('app.js', content);
console.log('Successfully fixed ReferenceError for canCrit');
