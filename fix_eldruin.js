const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');

const window = {};
eval(dbStr);

const db = window.D4_DATABASE.itemDatabase;

Object.keys(db).forEach(slot => {
  db[slot].forEach(item => {
    if (item.name === "El'Druin, Sword of Justice") {
      if (item.classes && item.classes.length > 4) {
        item.classes[4] = 1; // Restore Necromancer
      }
      item.rarity = 'mythic'; // Set rarity to mythic
    }
  });
});

window.D4_DATABASE.itemDatabase = db;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log("Successfully restored El'Druin and set rarity to mythic.");
