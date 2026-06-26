const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');
const window = {};
eval(dbStr);

let affixes = window.D4_DATABASE.affixes;
affixes = affixes.filter(a => a.shortName !== 'Weapon Damage'); // Clear existing

// 1.2 Speed Weapons (Daggers, Wands, Flails, Focus)
affixes.push({
  name: '+[86 - 143] Weapon Damage',
  shortName: 'Weapon Damage',
  targetSpeeds: [1.2],
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Offhand', 'Slicing Weapon', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)'],
  tempering: false
});

// 1.1 Speed Weapons (Axes, Swords, Scythes, Maces)
affixes.push({
  name: '+[94 - 157] Weapon Damage',
  shortName: 'Weapon Damage',
  targetSpeeds: [1.1],
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Offhand', 'Slicing Weapon', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)'],
  tempering: false
});

// 1.0 Speed Two-Handed Weapons (Swords)
affixes.push({
  name: '+[207 - 345] Weapon Damage',
  shortName: 'Weapon Damage',
  targetSpeeds: [1],
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)'],
  tempering: false
});

// 0.9 Speed Two-Handed Weapons (Maces, Axes, Scythes)
affixes.push({
  name: '+[230 - 383] Weapon Damage',
  shortName: 'Weapon Damage',
  targetSpeeds: [0.9],
  classes: [1, 1, 1, 1, 1, 1, 1, 1],
  slots: ['Mainhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)'],
  tempering: false
});

window.D4_DATABASE.affixes = affixes;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully added targetSpeeds to Weapon Damage variants.');
