const fs = require('fs');
let data = fs.readFileSync('assets/paragon_formulas.js', 'utf8');
data = data.replace(/"Damage_Bonus_To_HIgh_Health"/g, '"Damage_Bonus_To_High_Health"');
fs.writeFileSync('assets/paragon_formulas.js', data);
console.log('Fixed typo in formulas');
