const fs = require('fs');

let dbContent = fs.readFileSync('assets/database.js', 'utf8');
// Mock window to eval the file
const window = {};
eval(dbContent);

const uniques = [
  "Andariel's Visage", "Doombringer", "Harlequin Crest", "Heir of Perdition", "Melted Heart of Selig", "Ring of Starless Skies",
  "Shroud of False Death", "The Grandfather", "Tyrael's Might", "Azurewrath", "Banished Lord's Talisman",
  "Blood Moon Breeches", "Blood-Mad Idol", "Bloodless Scream", "Crown of Lucion", "Endurant Faith", "Fists of Fate",
  "Flickerstep", "Frostburn", "Godslayer Crown", "Gravewalker's Hand", "Locran's Talisman", "Mother's Embrace",
  "Omen of Pain", "Pact of Bone", "Paingorger's Gauntlets", "Penitent Greaves", "Rakanoth's Wake", "Razorplate",
  "Red Blessing", "Rustbitten Dirk", "Soulbrand", "Tassets of the Dawning Sky", "Temerity", "The Butcher's Cleaver",
  "The Gloom Ward", "Thousand-Eye Reaver", "Tibault's Will", "Wendigo Brand", "Will of Rathma", "Wyrdskin",
  "X'Fal's Corroded Signet", "Yen's Blessing"
];

const results = [];
for (const item of (window.D4_DATABASE.uniques || [])) {
    if (uniques.includes(item.name)) {
        results.push({ name: item.name, desc: item.desc });
    }
}
for (const item of (window.D4_DATABASE.mythics || [])) {
    if (uniques.includes(item.name)) {
        results.push({ name: item.name, desc: item.desc });
    }
}

let output = "# Unique Charms & Seals\n\n";
for (const res of results) {
    output += `## ${res.name}\n**Power:** ${res.desc || "N/A"}\n\n`;
}
fs.writeFileSync('unique_charms_summary.md', output);
console.log("Wrote summary for " + results.length + " items.");
