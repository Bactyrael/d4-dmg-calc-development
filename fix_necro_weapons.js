const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');

const window = {};
eval(dbStr);

const db = window.D4_DATABASE.itemDatabase;
const badWeapons = [
  "Ahavarion, Spear of Lycander",
  "Black River",
  "Eggcecutioner",
  "Shattered Vow",
  "El'Druin, Sword of Justice",
  "Eggis"
];

// Necromancer is index 4
Object.keys(db).forEach(slot => {
  db[slot].forEach(item => {
    if (badWeapons.includes(item.name) && item.classes && item.classes.length > 4) {
      item.classes[4] = 0; // Remove Necromancer compatibility
    }
  });
});

window.D4_DATABASE.itemDatabase = db;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully removed invalid Necromancer weapons.');
