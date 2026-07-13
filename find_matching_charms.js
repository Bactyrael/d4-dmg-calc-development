const fs = require('fs');

global.window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const charms = window.D4_DATABASE.charms || [];
const db = window.D4_DATABASE.itemDatabase || {};

console.log(`Total charms: ${charms.length}`);

let matchCount = 0;
for (const charm of charms) {
    let counterpart = null;
    let counterpartSlot = '';
    
    for (const slot in db) {
        const found = db[slot].find(i => i.name === charm.name && (i.rarity === 'unique' || i.rarity === 'mythic'));
        if (found) {
            counterpart = found;
            counterpartSlot = slot;
            break;
        }
    }
    
    if (counterpart) {
        matchCount++;
        console.log(`Charm: ${charm.name}`);
        console.log(`Counterpart: ${counterpart.name} (${counterpartSlot})`);
        console.log(`Affixes:`, counterpart.affixes);
        console.log('---');
    }
}

console.log(`Total matched unique charms: ${matchCount}`);
