const fs = require('fs');

// Load database
let c = fs.readFileSync('./assets/database.js', 'utf8');
let window = {};
eval(c);

let itemObj = { name: "Mace of King Leoric", power: 900, quality: 0, rarity: "unique", affixes: ["", "", "", ""] };
const slotName = "Mainhand";

function getDbItems(slotName) {
    if (!window.D4_DATABASE || !window.D4_DATABASE.itemDatabase) return [];
    let mapped = slotName.toLowerCase();
    if (slotName === 'Left Ring' || slotName === 'Right Ring') mapped = 'Ring';
    if (slotName === 'Ranged Weapon') mapped = 'Mainhand';
    if (slotName === 'Bludgeoning Weapon' || slotName === 'Slicing Weapon') mapped = 'Mainhand';
    
    // Check class filter
    const currentClassVal = 'Necromancer';
    const D4_CLASS_MAP = { 'Barbarian': 0, 'Druid': 1, 'Necromancer': 4, 'Rogue': 5, 'Sorcerer': 6, 'Spiritborn': 7 };
    const d4Idx = D4_CLASS_MAP[currentClassVal];
    
    // Capitalize mapped
    mapped = mapped.charAt(0).toUpperCase() + mapped.slice(1);
    const dbItems = window.D4_DATABASE.itemDatabase[mapped] || [];
    if (d4Idx !== undefined) {
      let filtered = dbItems.filter(i => !i.classes || i.classes[d4Idx] === 1);
      if (d4Idx === 4) { // Necromancer
        const invalidForNecro = ['Ahavarion, Spear of Lycander', 'Eggcecutioner', 'Eggis', 'Shattered Vow'];
        filtered = filtered.filter(i => !invalidForNecro.includes(i.name));
      }
      return filtered;
    }
    return dbItems;
}

let rarity = 'rare';
const dbItems = getDbItems(slotName);
const foundItem = dbItems.find(i => i.name === itemObj.name);
if (foundItem) {
    rarity = foundItem.rarity;

    // Auto-heal missing inherent affixes for uniques patched into the database
    if (rarity === 'unique' && foundItem.affixes && foundItem.affixes.length > 0) {
        if (!itemObj.affixes) itemObj.affixes = [];
        let patched = false;
        foundItem.affixes.forEach((aff, idx) => {
            if (itemObj.affixes[idx] !== aff) {
                itemObj.affixes[idx] = aff;
                patched = true;
            }
        });
        if (patched) {
            console.log("Patched! New affixes:", itemObj.affixes);
        } else {
            console.log("No patch needed.");
        }
    } else {
        console.log("Did not enter auto-heal block.", rarity, foundItem.affixes);
    }
} else {
    console.log("foundItem not found for", itemObj.name, "in slot", slotName);
}
