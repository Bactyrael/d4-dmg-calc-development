const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

// The verified Necro Helm Modifiers list
const necroHelmAllowed = [
  'Armor', 'Impairment Reduction', 'Cooldown Reduction', 'Intelligence', 'Maximum Life', 
  'Lucky Hit Chance', 'Fire Resistance', 'Lightning Resistance', 'Poison Resistance', 
  'Shadow Resistance', 'Cold Resistance', 'Resource Generation', 'Thorns', 'Maximum Essence', 
  'Healing Received', 'Resistance to All Elements', 'Physical Resistance', 'Ranks to Decrepify', 
  'Ranks to Iron Maiden', 'Ranks to Curse Skills', 'Ranks to Skeleton Warrior Mastery', 
  'Resource Cost Reduction', 'Life Regeneration', 'Essence Regeneration', 'Fortify Generation', 
  'Barrier Generation'
];

// Extract the exact objects from the old database
const necroHelmModifiers = [];
window.D4_DATABASE.affixes.forEach(a => {
    if (a.classes[4] === 1 && !a.tempering && necroHelmAllowed.includes(a.shortName)) {
        // Ensure we don't add duplicates
        if (!necroHelmModifiers.some(ex => ex.shortName === a.shortName)) {
            // Create a clean copy without slots and classes since the hierarchy implies it
            const cleanAffix = {
                name: a.name,
                shortName: a.shortName
            };
            necroHelmModifiers.push(cleanAffix);
        }
    }
});

// Build the new hierarchy
window.D4_DATABASE.classData = {
    'Sorcerer': { equipment: {} },
    'Druid': { equipment: {} },
    'Barbarian': { equipment: {} },
    'Rogue': { equipment: {} },
    'Necromancer': {
        equipment: {
            'helm': {
                modifiers: necroHelmModifiers,
                tempers: [],
                transfigures: []
            }
        }
    },
    'Spiritborn': { equipment: {} }
};

// Purge the old affixes array
delete window.D4_DATABASE.affixes;

// Write back to file
fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');

console.log('Successfully migrated database to classData hierarchy!');
console.log(`Migrated ${necroHelmModifiers.length} verified modifiers to Necromancer Helm.`);
