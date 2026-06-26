const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');

const window = {};
eval(dbStr);

const db = window.D4_DATABASE.itemDatabase;

Object.keys(db).forEach(slot => {
  db[slot] = db[slot].filter(item => item.name !== "Legendary Weapon" && item.name !== "Legendary Offhand");
});

window.D4_DATABASE.itemDatabase = db;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully removed generic Legendary Weapon and Offhand options.');
