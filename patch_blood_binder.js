const fs = require('fs');
let content = fs.readFileSync('assets/database.js', 'utf8');

// 1. Rename the set from "The Blood Binder" to "Word of the Blood Binder" for the charms
content = content.replace(/set: "The Blood Binder"/g, 'set: "Word of the Blood Binder"');

// 2. Add the set bonuses
const newSet = {
    "Word of the Blood Binder": {
        2: "Your Blood Skills Fortify you for 5% of your Maximum Life on cast and deal 60%[x] increased damage while Fortify is actively healing you.",
        3: "Every percentage of Fortified Life you gain also increases your Maximum Life by an equal percentage for 20 seconds, up to 50%.",
        5: "Your Basic, Core, and Ultimate Blood Skills drain 3% of your Maximum Life on Cast to trigger twice. Your Blood Skills deal 75%[x] increased damage."
    }
};

// Insert into talismanSets
const setJsonStr = `        "Word of the Blood Binder": {
            "2": "Your Blood Skills Fortify you for 5% of your Maximum Life on cast and deal 60%[x] increased damage while Fortify is actively healing you.",
            "3": "Every percentage of Fortified Life you gain also increases your Maximum Life by an equal percentage for 20 seconds, up to 50%.",
            "5": "Your Basic, Core, and Ultimate Blood Skills drain 3% of your Maximum Life on Cast to trigger twice. Your Blood Skills deal 75%[x] increased damage."
        },\n`;

// Find Rathma's Waking Touch or any other set to insert before it
content = content.replace(/"Rathma's Waking Touch":/g, setJsonStr + '        "Rathma\'s Waking Touch":');

fs.writeFileSync('assets/database.js', content, 'utf8');
console.log("Successfully patched Word of the Blood Binder set!");
