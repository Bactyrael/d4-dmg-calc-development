const fs = require('fs');

const path = 'assets/database.js';
let content = fs.readFileSync(path, 'utf8');

const startRegex = /const charmModifiers = (\[[\s\S]*?\]);\s*if \(window\.D4_DATABASE/m;
const match = content.match(startRegex);

if (match) {
    const jsonString = match[1];
    
    try {
        let modifiers = JSON.parse(jsonString);
        
        const newMods = [
            {
                "name": "Osseous: +[2 - 3] to Bone Skills",
                "shortName": "+[2 - 3] to Bone Skills",
                "htmlName": "<div style='color:#ff8500;'>Osseous</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[2 - 3] to Bone Skills</div>",
                "category": "Offensive",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Bloody: +[2 - 3] to Blood Skills",
                "shortName": "+[2 - 3] to Blood Skills",
                "htmlName": "<div style='color:#ff8500;'>Bloody</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[2 - 3] to Blood Skills</div>",
                "category": "Offensive",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Gloomy: +[2 - 3] to Darkness Skills",
                "shortName": "+[2 - 3] to Darkness Skills",
                "htmlName": "<div style='color:#ff8500;'>Gloomy</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[2 - 3] to Darkness Skills</div>",
                "category": "Offensive",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Reanimator's: +[2 - 3] to Minion Skills",
                "shortName": "+[2 - 3] to Minion Skills",
                "htmlName": "<div style='color:#ff8500;'>Reanimator's</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[2 - 3] to Minion Skills</div>",
                "category": "Offensive",
                "classes": [0, 0, 0, 0, 1]
            }
        ];
        
        // Prevent adding them twice if script runs multiple times
        for (const nm of newMods) {
            if (!modifiers.find(m => m.name === nm.name)) {
                modifiers.push(nm);
            }
        }
        
        const newJsonString = JSON.stringify(modifiers, null, 4);
        
        content = content.replace(jsonString, newJsonString);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Successfully added missing modifiers. New count:", modifiers.length);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
