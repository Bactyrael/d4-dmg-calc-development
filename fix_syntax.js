const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.split('\\`skill_${el.toLowerCase()}\\`').join('`skill_${el.toLowerCase()}`');
code = code.split('\\`search_${el.toLowerCase()}\\`').join('`search_${el.toLowerCase()}`');
code = code.split('\\`skill_${override.toLowerCase()}\\`').join('`skill_${override.toLowerCase()}`');
code = code.split('\\`search_${override.toLowerCase()}\\`').join('`search_${override.toLowerCase()}`');
code = code.split('\\`Skill_${override}\\`').join('`Skill_${override}`');
code = code.split('\\`Search_${override}\\`').join('`Search_${override}`');

fs.writeFileSync('app.js', code);
console.log('Fixed syntax error via string split');
