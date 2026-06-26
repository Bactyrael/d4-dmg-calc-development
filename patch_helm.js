const fs = require('fs');

const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const affixes = window.D4_DATABASE.affixes;
const necromancerHelmAffixes = [
    { name: '+[981 - 1,225] Armor', shortName: 'Armor', classIdx: 4 },
    { name: '+[8.0 - 10.0]% Impairment Reduction', shortName: 'Impairment Reduction', classIdx: 4 },
    { name: '+[5.0 - 8.0]% Cooldown Reduction', shortName: 'Cooldown Reduction', classIdx: 4 },
    { name: '+[100 - 121] Intelligence', shortName: 'Intelligence', classIdx: 4 },
    { name: '+[1,226 - 1,450] Maximum Life', shortName: 'Maximum Life', classIdx: 4 },
    { name: '+[8.0 - 9.0]% Lucky Hit Chance', shortName: 'Lucky Hit Chance', classIdx: 4 },
    { name: '+[524 - 630] Fire Resistance', shortName: 'Fire Resistance', classIdx: 4 },
    { name: '+[524 - 630] Lightning Resistance', shortName: 'Lightning Resistance', classIdx: 4 },
    { name: '+[524 - 630] Poison Resistance', shortName: 'Poison Resistance', classIdx: 4 },
    { name: '+[524 - 630] Shadow Resistance', shortName: 'Shadow Resistance', classIdx: 4 },
    { name: '+[524 - 630] Cold Resistance', shortName: 'Cold Resistance', classIdx: 4 },
    { name: '+[11.0 - 15.0]% Resource Generation', shortName: 'Resource Generation', classIdx: 4 },
    { name: '+[1,221 - 1,526] Thorns', shortName: 'Thorns', classIdx: 4 },
    { name: '+[15 - 20] Maximum Essence', shortName: 'Maximum Essence', classIdx: 4 },
    { name: '+[11.0 - 15.0]% Healing Received', shortName: 'Healing Received', classIdx: 4 },
    { name: '+[326 - 392] Resistance to All Elements', shortName: 'Resistance to All Elements', classIdx: 4 },
    { name: '+[524 - 630] Physical Resistance', shortName: 'Physical Resistance', classIdx: 4 },
    { name: '+[2 - 3] to Decrepify', shortName: 'Ranks to Decrepify', classIdx: 4 },
    { name: '+[2 - 3] to Iron Maiden', shortName: 'Ranks to Iron Maiden', classIdx: 4 },
    { name: '+[1 - 2] to Curse Skills', shortName: 'Ranks to Curse Skills', classIdx: 4 },
    { name: '+[1 - 2] to Skeleton Warrior Mastery', shortName: 'Ranks to Skeleton Warrior Mastery', classIdx: 4 },
    { name: '+[6.0 - 7.0]% Resource Cost Reduction', shortName: 'Resource Cost Reduction', classIdx: 4 },
    { name: '+[153 - 184] Life Regeneration', shortName: 'Life Regeneration', classIdx: 4 },
    { name: '+[3 - 4] Essence Regeneration', shortName: 'Essence Regeneration', classIdx: 4 },
    { name: '+[10.0 - 15.0]% Fortify Generation', shortName: 'Fortify Generation', classIdx: 4 },
    { name: '+[10.0 - 15.0]% Barrier Generation', shortName: 'Barrier Generation', classIdx: 4 }
];

let addedCount = 0;
let modifiedCount = 0;

necromancerHelmAffixes.forEach(newAffix => {
    let existing = affixes.find(a => a.shortName === newAffix.shortName);
    if (!existing) {
        // Create new affix
        existing = {
            name: newAffix.name,
            shortName: newAffix.shortName,
            classes: [0, 0, 0, 0, 0, 0, 0, 0],
            slots: ['helm'],
            tempering: false
        };
        existing.classes[newAffix.classIdx] = 1;
        affixes.push(existing);
        addedCount++;
    } else {
        // Ensure it has helm
        if (!existing.slots.includes('helm')) {
            existing.slots.push('helm');
            modifiedCount++;
        }
        // Ensure it has class
        if (existing.classes[newAffix.classIdx] !== 1) {
            existing.classes[newAffix.classIdx] = 1;
            modifiedCount++;
        }
    }
});

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');

console.log('Added:', addedCount);
console.log('Modified:', modifiedCount);
