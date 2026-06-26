const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const weaponsData = [
  { name: "Bearded Axe", weaponType: "Axe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Bone Blade", weaponType: "Dagger", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Bone Wand", weaponType: "Wand", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Bonebreaker", weaponType: "Two-Handed Mace", damageRange: "3,071 - 4,607", weaponSpeed: 0.9, sockets: 2, slot: "Mainhand", rarity: "rare" },
  { name: "Demonblade", weaponType: "Two-Handed Sword", damageRange: "2,764 - 4,146", weaponSpeed: 1.0, sockets: 2, slot: "Mainhand", rarity: "rare" },
  { name: "Obsidian Blade", weaponType: "Sword", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Ossified Scythe", weaponType: "Scythe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Parashu", weaponType: "Two-Handed Axe", damageRange: "3,071 - 4,607", weaponSpeed: 0.9, sockets: 2, slot: "Mainhand", rarity: "rare" },
  { name: "Skullsplitter", weaponType: "Mace", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Sparr", weaponType: "Two-Handed Scythe", damageRange: "3,071 - 4,607", weaponSpeed: 0.9, sockets: 2, slot: "Mainhand", rarity: "rare" },
  { name: "Spiked Flail", weaponType: "Flail", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Mainhand", rarity: "rare" },
  { name: "Bone Shield", weaponType: "Shield", damageRange: "same as mainhand", weaponSpeed: "same as mainhand", sockets: 1, slot: "Offhand", rarity: "rare" },
  { name: "Enigma Cube", weaponType: "Focus", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Offhand", rarity: "rare" },
  { name: "Serpent Stone", weaponType: "Focus", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Offhand", rarity: "rare" },
  { name: "Doombringer", weaponType: "Sword", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "mythic" },
  { name: "El'Druin, Sword of Justice", weaponType: "Sword", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "The Grandfather", weaponType: "Two-Handed Sword", damageRange: "2,764 - 4,146", weaponSpeed: 1.0, sockets: 2, slot: "Mainhand", rarity: "mythic" },
  { name: "Azurewrath", weaponType: "Sword", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "Bloodless Scream", weaponType: "Two-Handed Scythe", damageRange: "3,071 - 4,607", weaponSpeed: 0.9, sockets: 2, slot: "Mainhand", rarity: "unique" },
  { name: "Mace of King Leoric", weaponType: "Mace", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "Rustbitten Dirk", weaponType: "Dagger", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "Sanguivor, Blade of Zir", weaponType: "Two-Handed Sword", damageRange: "2,764 - 4,146", weaponSpeed: 1.0, sockets: 2, slot: "Mainhand", rarity: "unique" },
  { name: "The Butcher's Cleaver", weaponType: "Axe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "The Mortacrux", weaponType: "Dagger", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "Thousand-Eye Reaver", weaponType: "Axe", damageRange: "1,256 - 1,884", weaponSpeed: 1.1, sockets: 1, slot: "Mainhand", rarity: "unique" },
  { name: "Gospel of the Devotee", weaponType: "Focus", damageRange: "1,152 - 1,728", weaponSpeed: 1.2, sockets: 1, slot: "Offhand", rarity: "unique" },
  { name: "Lidless Wall", weaponType: "Shield", damageRange: "same as mainhand", weaponSpeed: "same as mainhand", sockets: 1, slot: "Offhand", rarity: "unique" },
  { name: "The Gloom Ward", weaponType: "Shield", damageRange: "same as mainhand", weaponSpeed: "same as mainhand", sockets: 1, slot: "Offhand", rarity: "unique" }
];

// Step 1: Remove Necromancer access (index 4) from all existing Mainhand and Offhand items
const db = window.D4_DATABASE.itemDatabase;
if (db.Mainhand) {
    db.Mainhand.forEach(item => {
        if (item.classes && item.classes.length > 4) {
            item.classes[4] = 0;
        }
    });
}
if (db.Offhand) {
    db.Offhand.forEach(item => {
        if (item.classes && item.classes.length > 4) {
            item.classes[4] = 0;
        }
    });
}

// Step 2: Inject the verified weapons for Necromancer ONLY
weaponsData.forEach(wd => {
    const item = {
        name: wd.name,
        rarity: wd.rarity,
        classes: [0, 0, 0, 0, 1, 0, 0, 0], // Only Necro
        weaponType: wd.weaponType,
        damageRange: wd.damageRange,
        weaponSpeed: wd.weaponSpeed,
        sockets: wd.sockets
    };
    if (!db[wd.slot]) db[wd.slot] = [];
    db[wd.slot].push(item);
});

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Successfully applied verified Necromancer weapon data!');
