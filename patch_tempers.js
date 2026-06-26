const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const tempersData = [
  { name: "+[440 - 490] Fire Resistance", shortName: "Fire Resistance", desc: "Natural Resistance" },
  { name: "+[440 - 490] Lightning Resistance", shortName: "Lightning Resistance", desc: "Natural Resistance" },
  { name: "+[440 - 490] Cold Resistance", shortName: "Cold Resistance", desc: "Natural Resistance" },
  { name: "+[440 - 490] Poison Resistance", shortName: "Poison Resistance", desc: "Natural Resistance" },
  { name: "+[440 - 490] Shadow Resistance", shortName: "Shadow Resistance", desc: "Natural Resistance" },
  { name: "+[440 - 490] Physical Resistance", shortName: "Physical Resistance", desc: "Natural Resistance" },
  { name: "+[20 - 30]% Damage Reduction for Your Summons", shortName: "Damage Reduction for Your Summons", desc: "Necromancer Wall" },
  { name: "+[7 - 10]% Chance for Minion Attacks to Fortify You for 3% Maximum Life", shortName: "Chance for Minion Attacks to Fortify You for 3% Maximum Life", desc: "Necromancer Wall" },
  { name: "+[10 - 12]% Minions Inherit +% of Your Thorns", shortName: "Minions Inherit +% of Your Thorns", desc: "Necromancer Wall" },
  { name: "+[2.5 - 5.0]% Block Chance", shortName: "Block Chance", desc: "Necromancer Wall" },
  { name: "+[1,000 - 1,500] Maximum Life", shortName: "Maximum Life", desc: "Wordly Endurance" },
  { name: "+[1,250 - 2,000] Armor", shortName: "Armor", desc: "Wordly Endurance" },
  { name: "+[60 - 70] Resistance to All Elements", shortName: "Resistance to All Elements", desc: "Wordly Endurance" },
  { name: "+[2 - 3] Maximum Resolve Stacks", shortName: "Maximum Resolve Stacks", desc: "Wordly Endurance" },
  { name: "+[484 - 646] Thorns", shortName: "Thorns", desc: "Natural Schemes" },
  { name: "+[10 - 12.5]% Fortify Generation", shortName: "Fortify Generation", desc: "Natural Schemes" },
  { name: "+[10 - 12.5]% Barrier Generation", shortName: "Barrier Generation", desc: "Natural Schemes" },
  { name: "+[2.5 - 5.0]% Lucky Hit Chance", shortName: "Lucky Hit Chance", desc: "Worldy Fortune" },
  { name: "+[10 - 12.5]% Impairment Reduction", shortName: "Impairment Reduction", desc: "Worldy Fortune" },
  { name: "+[12 - 15]% Crowd Control Duration", shortName: "Crowd Control Duration", desc: "Worldy Fortune" }
];

// Initialize array if it doesn't exist
if (!window.D4_DATABASE.classData.Necromancer.equipment.helm.tempers) {
    window.D4_DATABASE.classData.Necromancer.equipment.helm.tempers = [];
}

window.D4_DATABASE.classData.Necromancer.equipment.helm.tempers = tempersData;

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Successfully injected 20 Tempers to Necromancer Helm!');
