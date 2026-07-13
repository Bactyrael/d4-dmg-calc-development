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
                "name": "Dazing: Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Daze for 2 Seconds",
                "shortName": "Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Daze for 2 Seconds",
                "htmlName": "<div style='color:#ff8500;'>Dazing</div><div style='color:#b3b3b3; font-size: 0.9em;'>Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Daze for 2 Seconds</div>",
                "category": "Utility",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Immobilization: Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Immobilize for 2 Seconds",
                "shortName": "Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Immobilize for 2 Seconds",
                "htmlName": "<div style='color:#ff8500;'>Immobilization</div><div style='color:#b3b3b3; font-size: 0.9em;'>Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Immobilize for 2 Seconds</div>",
                "category": "Utility",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Slowing: Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Slow for 2 Seconds",
                "shortName": "Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Slow for 2 Seconds",
                "htmlName": "<div style='color:#ff8500;'>Slowing</div><div style='color:#b3b3b3; font-size: 0.9em;'>Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Slow for 2 Seconds</div>",
                "category": "Utility",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Stunning: Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Stun for 2 Seconds",
                "shortName": "Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Stun for 2 Seconds",
                "htmlName": "<div style='color:#ff8500;'>Stunning</div><div style='color:#b3b3b3; font-size: 0.9em;'>Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Stun for 2 Seconds</div>",
                "category": "Utility",
                "classes": [0, 0, 0, 0, 1]
            },
            {
                "name": "Freezing: Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Freeze for 2 Seconds",
                "shortName": "Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Freeze for 2 Seconds",
                "htmlName": "<div style='color:#ff8500;'>Freezing</div><div style='color:#b3b3b3; font-size: 0.9em;'>Lucky Hit: Up to a +[3.0 - 4.0]% Chance to Freeze for 2 Seconds</div>",
                "category": "Utility",
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
        console.log("Successfully added 5 missing modifiers. New count:", modifiers.length);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
