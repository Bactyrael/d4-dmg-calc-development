const fs = require('fs');

// Update maxroll_data.json
let data = fs.readFileSync('maxroll_data.json', 'utf8');
let d4 = JSON.parse(data);

let witherNode = Object.values(d4.paragonNodes).find(n => n && n.name === 'Wither');
if (witherNode) {
    if (!witherNode.tags.includes('Search_Cold')) witherNode.tags.push('Search_Cold');
    if (!witherNode.tags.includes('Search_Shadow')) witherNode.tags.push('Search_Shadow'); // Darkness is Shadow
}

if (d4.skills['Paragon_Necro_Legendary_016']) {
    d4.skills['Paragon_Necro_Legendary_016'].desc = "Your Shadow and Cold damage has a {c_number}20%{/c} chance to deal {c_number}300%{c_lightgray}\\[x\\]{/c}{/c} increased damage.";
}

fs.writeFileSync('maxroll_data.json', JSON.stringify(d4, null, 2));

// Update assets/paragon_formulas.js
let formulas = fs.readFileSync('assets/paragon_formulas.js', 'utf8');
const oldDesc = "Your Shadow damage has a {c_number}20%{/c} chance to deal {c_number}300%{c_lightgray}\\\\[x\\\\]{/c}{/c} increased damage.";
const newDesc = "Your Shadow and Cold damage has a {c_number}20%{/c} chance to deal {c_number}300%{c_lightgray}\\\\[x\\\\]{/c}{/c} increased damage.";
formulas = formulas.replace(oldDesc, newDesc);
fs.writeFileSync('assets/paragon_formulas.js', formulas);

console.log('Fixed Wither legendary node text and tags');
