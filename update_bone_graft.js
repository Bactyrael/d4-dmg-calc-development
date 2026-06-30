const fs = require('fs');

// Update maxroll_data.json
let data = fs.readFileSync('maxroll_data.json', 'utf8');
let d4 = JSON.parse(data);

if (d4.skills['Paragon_Necro_Legendary_017']) {
    d4.skills['Paragon_Necro_Legendary_017'].desc = "Your {c_important}Bone{/c} Skills deal {c_number}60%{c_lightgray}\\[x\\]{/c}{/c} increased damage and your Maximum Essence is increased by {c_number}10{/c}.";
}

fs.writeFileSync('maxroll_data.json', JSON.stringify(d4, null, 2));

// Update assets/paragon_formulas.js
let formulas = fs.readFileSync('assets/paragon_formulas.js', 'utf8');
const oldDesc = "Your {c_important}Bone{/c} Skills deal {c_number}40%{c_lightgray}\\\\[x\\\\]{/c}{/c} increased damage and your Maximum Essence is increased by {c_number}10{/c}.";
const newDesc = "Your {c_important}Bone{/c} Skills deal {c_number}60%{c_lightgray}\\\\[x\\\\]{/c}{/c} increased damage and your Maximum Essence is increased by {c_number}10{/c}.";
formulas = formulas.replace(oldDesc, newDesc);
fs.writeFileSync('assets/paragon_formulas.js', formulas);

console.log('Fixed Bone Graft legendary node text');
