const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

const targetNames = [
  "andariel", "doombringer", "harlequin", "heir of perdition", "selig", "starless skies",
  "shroud of false death", "grandfather", "tyrael's might", "azurewrath", "banished lord",
  "blood moon", "blood-mad", "bloodless", "lucion", "endurant faith", "fists of fate",
  "flickerstep", "frostburn", "godslayer", "gravewalker", "locran", "mother's embrace",
  "omen of pain", "pact of bone", "paingorger", "penitent", "rakanoth", "razorplate",
  "red blessing", "rustbitten", "soulbrand", "tassets of the dawning sky", "temerity", "butcher's cleaver",
  "gloom ward", "thousand-eye", "tibault", "wendigo brand", "will of rathma", "wyrdskin",
  "x'fal", "yen's blessing", "diamond mind", "golden epiphany"
];

const results = [];

for (const key in data) {
    const item = data[key];
    if (item && item.name) {
        const nameLower = item.name.toLowerCase();
        // Look for items that are either charms or seals and match the target names
        if (key.includes("Talisman") || key.includes("Charm") || key.includes("Seal")) {
            for (const target of targetNames) {
                if (nameLower.includes(target)) {
                    results.push({
                        key: key,
                        name: item.name,
                        explicits: item.explicits || [],
                        desc: item.desc || "N/A"
                    });
                    break; // stop checking target names for this item
                }
            }
        }
    }
}

// Now lookup the explicits to get the actual unique power description if it exists
for (const res of results) {
    res.powers = [];
    for (const exp of res.explicits) {
        if (data[exp] && data[exp].desc) {
            res.powers.push({
                key: exp,
                desc: data[exp].desc
            });
        }
    }
}

fs.writeFileSync('unique_charms_dump.json', JSON.stringify(results, null, 2));
console.log(`Extracted ${results.length} items`);
