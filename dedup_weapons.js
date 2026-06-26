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

const db = window.D4_DATABASE.itemDatabase;

// Step 1: Dedup items. If there are duplicates, merge the weapon properties into the ORIGINAL one, and delete the duplicate.
for (let slot in db) {
    const uniqueNames = new Set();
    const toKeep = [];
    
    // Reverse iterate so we process the original (which has classes mapped) first?
    // Wait, the original was pushed first, the duplicate was pushed last.
    for (let item of db[slot]) {
        if (!uniqueNames.has(item.name)) {
            uniqueNames.add(item.name);
            toKeep.push(item);
        } else {
            // It's a duplicate (probably the one we injected).
            // Grab its weapon data and merge it into the original!
            const original = toKeep.find(i => i.name === item.name);
            if (item.weaponType) original.weaponType = item.weaponType;
            if (item.weaponSpeed) original.weaponSpeed = item.weaponSpeed;
            if (item.damageRange) original.damageRange = item.damageRange;
            if (item.sockets) original.sockets = item.sockets;
            
            // Also ensure the original has classes[4] = 1 if it's a Necro item!
            // We know it's a Necro item if it was in the duplicate injected list.
            if (original.classes) original.classes[4] = 1;
        }
    }
    
    db[slot] = toKeep;
}

// Ensure the originals have classes[4] = 1 for the verified weapons
weaponsData.forEach(wd => {
    let found = false;
    for (let slot in db) {
        const item = db[slot].find(i => i.name === wd.name);
        if (item) {
            item.weaponType = wd.weaponType;
            item.weaponSpeed = wd.weaponSpeed;
            item.damageRange = wd.damageRange;
            item.sockets = wd.sockets;
            if (item.classes) item.classes[4] = 1;
            found = true;
        }
    }
    // If not found at all, add it to Mainhand or Offhand
    if (!found) {
        db[wd.slot].push({
            name: wd.name,
            rarity: wd.rarity,
            classes: [0, 0, 0, 0, 1, 0, 0, 0],
            weaponType: wd.weaponType,
            damageRange: wd.damageRange,
            weaponSpeed: wd.weaponSpeed,
            sockets: wd.sockets
        });
    }
});

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Database deduplicated and verified properties merged successfully!');
