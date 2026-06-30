const fs = require('fs');
let data = fs.readFileSync('maxroll_data.json', 'utf8');
data = data.replace(/"Damage_Bonus_To_HIgh_Health"/g, '"Damage_Bonus_To_High_Health"');
fs.writeFileSync('maxroll_data.json', data);
console.log('Fixed typo');
