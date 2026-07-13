const fs = require('fs');

const js = fs.readFileSync('assets/database.js', 'utf8');
const match = js.match(/window\.D4_DATABASE,\s*(\{[\s\S]*\})\s*\);/);
if (!match) {
    console.log("Could not extract database JSON");
    process.exit(1);
}

// Safely evaluate the extracted database object
const dbStr = match[1];
const dbObj = eval(`(${dbStr})`);

const parsedSeals = JSON.parse(fs.readFileSync('parsed_seals.json', 'utf8'));

const generic_normal = {
    "Vigorous": "[6.5 - 8.0]% Maximum Life",
    "Swift": "[7.5 - 10.0]% Cooldown Reduction",
    "Keen": "+[8.0 - 10.0]% Attack Speed",
    "Adept": "+[7.5 - 10.0]% Critical Strike Chance",
    "Ferocious": "[12.0 - 20.0]% [x] Damage",
    "Stalwart's": "+[7.5 - 10.0]% Total Armor",
    "Resistant": "+[7.5 - 10.0]% Resistance to All Elements",
    "Efficient": "[7.5 - 10.0]% Resource Cost Reduction",
    "Resourceful": "+[15 - 20] Maximum Resource",
    "Astute": "+[7.5 - 10.0]% Intelligence",
    "Harmonious": "+[6.0 - 8.0]% All Stats"
};

const known_values = {
    "of Brawn": "+[6.5 - 8.0] Maximum Life",
    "of Proficiency": "+[6.0 - 8.0] All Stats",
    "of Luck": "+[8.0 - 9.0] Lucky Hit Chance",
    "of Elements": "+[7.0 - 10.0] Non-Physical Damage",
    "of Reapers": "+[7.0 - 10.0]% [x] Ultimate Skill Damage",
    "of the Fleet Footed": "+[20 - 24]% Movement Speed for 4 Seconds After Killing an Elite",
    "of Glory": "+1 Charm Slot",
    "of Technique": "+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)"
};

function cleanStat(s) {
    s = s.replace("++", "+").replace(/<\/?b>/g, "");
    return s;
}

const classNames = ["Barbarian", "Druid", "Necromancer", "Rogue", "Sorcerer", "Spiritborn"];

for (const cls of classNames) {
    let mods = [];
    
    for (const [k, v] of Object.entries(generic_normal)) {
        let htmlName = `<div style='color:#6879d1;'>${k}</div><div style='color:#b3b3b3; font-size: 0.9em;'>${v}</div>`;
        mods.push({ name: `${k}: ${v}`, shortName: v, htmlName: htmlName, category: "Utility" });
    }
    
    // Generic Sets
    const genSets = parsedSeals["Generic"] || {};
    for (const [s_name, affixes] of Object.entries(genSets)) {
        for (const [k, original_v] of Object.entries(affixes)) {
            let v = cleanStat(original_v);
            let finalVal = known_values[k] ? known_values[k] : v;
            
            let color = "#2bd42b";
            let htmlName = `<div style='color:#ff8500;'>${k}</div><div style='color:${color}; font-size: 0.9em;'>${s_name}:</div><div style='color:#b3b3b3; font-size: 0.9em;'>${finalVal}</div>`;
            mods.push({ name: `${k}: ${finalVal}`, shortName: finalVal, htmlName: htmlName, category: "Utility" });
        }
    }
    
    // Class Sets
    const clsSets = parsedSeals[cls] || {};
    for (const [s_name, affixes] of Object.entries(clsSets)) {
        for (const [k, original_v] of Object.entries(affixes)) {
            let v = cleanStat(original_v);
            let htmlName = `<div style='color:#ff8500;'>${k}</div><div style='color:#2bd42b; font-size: 0.9em;'>${s_name}:</div><div style='color:#b3b3b3; font-size: 0.9em;'>${v}</div>`;
            mods.push({ name: `${k}: ${v}`, shortName: v, htmlName: htmlName, category: "Utility" });
        }
    }
    
    // Create the seal slot object
    if (!dbObj.classData[cls]) dbObj.classData[cls] = { equipment: {} };
    if (!dbObj.classData[cls].equipment) dbObj.classData[cls].equipment = {};
    
    dbObj.classData[cls].equipment.seal = {
        modifiers: mods
    };
}

// Convert back to JSON and write
const newStr = JSON.stringify(dbObj, null, 2);
const newJs = `window.D4_DATABASE = window.D4_DATABASE || {};\nObject.assign(window.D4_DATABASE, ${newStr});\n`;
fs.writeFileSync('assets/database.js', newJs, 'utf8');

console.log("Safely injected seal modifiers via Node.js JSON parsing!");
