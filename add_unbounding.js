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
                "name": "Unbounding: +[8 - 10]% Impairment Reduction",
                "shortName": "+[8 - 10]% Impairment Reduction",
                "htmlName": "<div style='color:#ff8500;'>Unbounding</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[8 - 10]% Impairment Reduction</div>",
                "category": "Defensive",
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
        console.log("Successfully added missing modifier. New count:", modifiers.length);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
