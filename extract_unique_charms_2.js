const fs = require('fs');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

const targetNames = [
  "andariel", "doombringer", "harlequin", "heir of perdition", "selig", "starless skies",
  "shroud of false death", "grandfather", "tyrael's might", "azurewrath", "banished lord",
  "blood moon", "blood-mad", "bloodless", "lucion", "endurant faith", "fists of fate",
  "flickerstep", "frostburn", "godslayer", "gravewalker", "locran", "mother's embrace",
  "omen of pain", "pact of bone", "paingorger", "penitent", "rakanoth", "razorplate",
  "red blessing", "rustbitten", "soulbrand", "tassets of the dawning sky", "temerity", "butcher's cleaver",
  "gloom ward", "thousand-eye", "tibault", "wendigo brand", "will of rathma", "wyrdskin",
  "x'fal", "yen's blessing"
];

const results = [];

for (const key in data) {
    if (key.includes("Talisman_Charm_Affix_UNIQUE_") || key.includes("Talisman_Charm_Affix_UBERUNIQUE_")) {
        const item = data[key];
        if (item) {
            results.push({
                key: key,
                desc: item.desc || "N/A"
            });
        }
    }
}

fs.writeFileSync('unique_charms_dump.json', JSON.stringify(results, null, 2));
console.log(`Extracted ${results.length} unique charm affixes`);
