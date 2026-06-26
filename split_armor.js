const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');

const window = {};
eval(dbStr);

let affixes = window.D4_DATABASE.affixes;

// 1. Update Maximum Life
const lifeAffix = affixes.find(a => a.shortName === 'Maximum Life');
if (lifeAffix) {
  lifeAffix.name = '+[1206 - 1450] Maximum Life';
}

// 2. Split Armor
affixes = affixes.filter(a => a.shortName !== 'Armor'); // Remove existing Armor

affixes.push({
  name: '+[1963 - 2450] Armor',
  shortName: 'Armor',
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Chest Armor', 'Pants'], // Usually Pants have same armor scale as Chest
  tempering: false
});

affixes.push({
  name: '+[981 - 1225] Armor',
  shortName: 'Armor',
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Helm', 'Boots', 'Gloves', 'Amulet'], // Standard scaling for other slots
  tempering: false
});

window.D4_DATABASE.affixes = affixes;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully updated Maximum Life and split Armor.');
