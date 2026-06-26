const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const affixes = window.D4_DATABASE.affixes;
const extras = [
  'Block Chance', 
  'Damage Reduction for Your Summons', 
  'Ranks to Skeleton Warrior', 
  'Maximum Resource', 
  'Crowd Control Duration', 
  'Arbiter Duration', 
  'Chance For Minion Attacks to Fortify You for 3% Maximum Life', 
  'Minions Inherit +% of Your Thorns'
];

extras.forEach(shortName => {
    const a = affixes.find(x => x.shortName === shortName);
    if (a) {
        if (shortName === 'Arbiter Duration') {
            a.classes[4] = 0; // Remove Necromancer
        } else {
            // Remove 'helm' from slots
            a.slots = a.slots.filter(s => s !== 'helm');
        }
    }
});

// Since the user said Ranks to Skeleton Warrior should be replaced, let's just make sure it doesn't show up.
// 'Ranks to Skeleton Warrior' without Mastery was the old one. We removed 'helm' from it.

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Cleaned up extra affixes from helm/necromancer!');
