const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');
const window = {};
eval(dbStr);

let affixes = window.D4_DATABASE.affixes;
affixes = affixes.filter(a => a.shortName !== 'Weapon Damage'); // Remove existing

affixes.push({
  name: '+[86 - 143] Weapon Damage',
  shortName: 'Weapon Damage',
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Offhand', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)', 'Slicing Weapon'],
  tempering: false
});

affixes.push({
  name: '+[172 - 286] Weapon Damage',
  shortName: 'Weapon Damage',
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)'],
  tempering: false
});

window.D4_DATABASE.affixes = affixes;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully split Weapon Damage affix.');
