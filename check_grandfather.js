const fs = require('fs');

global.window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const db = window.D4_DATABASE.itemDatabase || {};
let gf = null;
for (const slot in db) {
    gf = db[slot].find(i => i.name === 'The Grandfather');
    if (gf) break;
}
if (gf) {
    console.log(JSON.stringify(gf.affixes, null, 2));
} else {
    console.log("Grandfather not found!");
}
