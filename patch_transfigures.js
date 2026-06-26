const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const transfiguresData = [
  { name: "+[3.5 - 5.0]% Intelligence", shortName: "Intelligence (%)" },
  { name: "+[75 - 100]% Gem Strength", shortName: "Gem Strength" },
  { name: "+[8 - 10]% Total Armor", shortName: "Total Armor" },
  { name: "+[8 - 10]% Resistance to All Elements", shortName: "Resistance to All Elements" },
  { name: "+[2 - 3] Curse Skills", shortName: "Curse Skills" },
  { name: "+[2 - 3] Macabre Skills", shortName: "Macabre Skills" },
  { name: "+[75 - 100] All Stats", shortName: "All Stats" },
  { name: "+[3.5 - 5.0]% Critical Strike Chance", shortName: "Critical Strike Chance" },
  { name: "+[8 - 10]% Attack Speed", shortName: "Attack Speed" },
  { name: "+[150 - 180] Intelligence", shortName: "Intelligence" },
  { name: "+[6 - 8]% Lucky Hit Chance", shortName: "Lucky Hit Chance" },
  { name: "[6 - 8]% Resource Cost Reduction", shortName: "Resource Cost Reduction" },
  { name: "+[15 - 20] Maximum Resource", shortName: "Maximum Resource" },
  { name: "+[8 - 10]% Shadow Damage", shortName: "Shadow Damage" },
  { name: "+[8 - 10]% Physical Damage", shortName: "Physical Damage" },
  { name: "+[6 - 8]% Maximum Life", shortName: "Maximum Life" },
  { name: "+[1 - 15] Item Quality", shortName: "Item Quality" }
];

window.D4_DATABASE.classData.Necromancer.equipment.helm.transfigures = transfiguresData;

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Successfully re-formatted 17 Transfigures for Necromancer Helm!');
