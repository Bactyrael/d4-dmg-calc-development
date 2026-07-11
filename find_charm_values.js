const fs = require('fs');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

const uniques = [
  "andariel", "doombringer", "harlequin", "heir of perdition", "selig", "starless skies",
  "shroud of false death", "grandfather", "tyrael's might", "azurewrath", "banished lord",
  "blood moon", "blood-mad", "bloodless", "lucion", "endurant faith", "fists of fate",
  "flickerstep", "frostburn", "godslayer", "gravewalker", "locran", "mother's embrace",
  "omen of pain", "pact of bone", "paingorger", "penitent", "rakanoth", "razorplate",
  "red blessing", "rustbitten", "soulbrand", "tassets of the dawning sky", "temerity", "butcher's cleaver",
  "gloom ward", "thousand-eye", "tibault", "wendigo brand", "will of rathma", "wyrdskin",
  "x'fal", "yen's blessing", "diamond mind", "golden epiphany"
];

const results = {};

for (const key of Object.keys(data)) {
    const item = data[key];
    if (!item) continue;
    
    // Look for items with the name
    if (item.name) {
        const nameLower = item.name.toLowerCase();
        for (const u of uniques) {
            if (nameLower.includes(u) && (key.toLowerCase().includes("charm") || key.toLowerCase().includes("seal") || key.toLowerCase().includes("talisman"))) {
                results[item.name] = {
                    key: key,
                    desc: item.desc,
                    explicits: item.explicits || []
                };
            }
        }
    }
}

// Now lookup explicits for descriptions if the item itself doesn't have it
for (const name in results) {
    const item = results[name];
    if (item.explicits.length > 0) {
        item.powers = [];
        for (const exp of item.explicits) {
            if (data[exp] && data[exp].desc) {
                item.powers.push(data[exp].desc);
            }
        }
    }
}

let output = "# Unique Charms & Seals\n\n";
for (const name in results) {
    const item = results[name];
    output += `## ${name}\n`;
    if (item.desc) output += `**Desc:** ${item.desc}\n`;
    if (item.powers && item.powers.length > 0) {
        output += `**Powers:**\n`;
        for (const p of item.powers) output += `- ${p}\n`;
    }
    output += "\n";
}

fs.writeFileSync('unique_charms_summary.md', output);
console.log(`Saved summary`);
