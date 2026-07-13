const fs = require('fs');

global.window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const charms = window.D4_DATABASE.charms || [];
const uniques = charms.filter(c => c.rarity === 'unique' || c.rarity === 'mythic');

console.log(`Found ${uniques.length} unique/mythic charms.`);

// Let's look at the first one and its counterpart
if (uniques.length > 0) {
    const sample = uniques.find(u => u.name === 'The Grandfather') || uniques[0];
    console.log("Sample Charm:", JSON.stringify(sample, null, 2));
    
    // Find counterpart in itemDatabase
    const db = window.D4_DATABASE.itemDatabase || {};
    let counterpart = null;
    for (const slot in db) {
        const found = db[slot].find(i => i.name === sample.name);
        if (found) {
            counterpart = found;
            console.log(`Found counterpart in slot ${slot}`);
            break;
        }
    }
    
    if (counterpart) {
        console.log("Counterpart Affixes:", JSON.stringify(counterpart.affixes, null, 2));
    } else {
        console.log("No counterpart found for", sample.name);
    }
}
