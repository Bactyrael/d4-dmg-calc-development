const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');

const window = {};
eval(dbStr);

let affixes = window.D4_DATABASE.affixes;

const coreStats = ['Intelligence', 'Strength', 'Dexterity', 'Willpower'];
const tier1Slots = ['Helm', 'Chest Armor', 'Pants', 'Boots', 'Ring', 'Left Ring', 'Right Ring'];
const tier2Slots = ['Gloves', 'Amulet', 'Mainhand', 'Offhand', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)'];
const tier3Slots = ['Mainhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)'];

// Remove the existing core stat objects
affixes = affixes.filter(a => !coreStats.includes(a.shortName));

// Add the split versions back
coreStats.forEach(stat => {
  affixes.push({
    name: `+[100 - 121] ${stat}`,
    shortName: stat,
    classes: [1,1,1,1,1,1,1,1],
    slots: tier1Slots,
    tempering: false
  });
  affixes.push({
    name: `+[150 - 180] ${stat}`,
    shortName: stat,
    classes: [1,1,1,1,1,1,1,1],
    slots: tier2Slots,
    tempering: false
  });
  affixes.push({
    name: `+[300 - 360] ${stat}`,
    shortName: stat,
    classes: [1,1,1,1,1,1,1,1],
    slots: tier3Slots,
    tempering: false
  });
});

window.D4_DATABASE.affixes = affixes;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully split core stats.');
