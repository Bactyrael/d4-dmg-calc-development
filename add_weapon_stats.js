const fs = require('fs');
let dbStr = fs.readFileSync('assets/database.js', 'utf8');
const window = {};
eval(dbStr);

const weaponData = {
  "Bearded Axe": { type: "Axe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1 },
  "Bone Blade": { type: "Dagger", damageRange: "1,152 - 1,728", weaponSpeed: 1.2 },
  "Bone Wand": { type: "Wand", damageRange: "1,152 - 1,728", weaponSpeed: 1.2 },
  "Bonebreaker": { type: "Two-Handed Mace", damageRange: "3,071 - 4,607", weaponSpeed: 0.9 },
  "Demonblade": { type: "Two-Handed Sword", damageRange: "2,764 - 4,146", weaponSpeed: 1 },
  "Obsidian Blade": { type: "Sword", damageRange: "1,256 - 1,884", weaponSpeed: 1.1 },
  "Ossified Scythe": { type: "Scythe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1 },
  "Parashu": { type: "Two-Handed Axe", damageRange: "3,071 - 4,607", weaponSpeed: 0.9 },
  "Skullsplitter": { type: "Mace", damageRange: "1,256 - 1,884", weaponSpeed: 1.1 },
  "Sparr": { type: "Two-Handed Scythe", damageRange: "3,071 - 4,607", weaponSpeed: 0.9 },
  "Spiked Flail": { type: "Flail", damageRange: "1,152 - 1,728", weaponSpeed: 1.2 },
  "Bone Shield": { type: "Shield" },
  "Enigma Cube": { type: "Focus", damageRange: "1,152 - 1,728", weaponSpeed: 1.2 },
  "Serpent Stone": { type: "Focus", damageRange: "1,152 - 1,728", weaponSpeed: 1.2 }
};

const db = window.D4_DATABASE.itemDatabase;
Object.keys(db).forEach(slot => {
  db[slot].forEach(item => {
    if (weaponData[item.name]) {
      const data = weaponData[item.name];
      item.weaponType = data.type;
      if (data.damageRange) item.damageRange = data.damageRange;
      if (data.weaponSpeed) item.weaponSpeed = data.weaponSpeed;
    }
  });
});

window.D4_DATABASE.itemDatabase = db;
fs.writeFileSync('assets/database.js', `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`);
console.log('Successfully added weapon stats to database.');
