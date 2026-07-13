const fs = require('fs');

const path = 'assets/database.js';
let content = fs.readFileSync(path, 'utf8');

const startRegex = /const charmModifiers = (\[[\s\S]*?\]);\s*if \(window\.D4_DATABASE/m;
const match = content.match(startRegex);

if (match) {
    const jsonString = match[1];
    
    try {
        let modifiers = JSON.parse(jsonString);
        
        const targets = [
            'Skillful', 'The Macabre', 'Principal', 'Doom', 'Arisen'
        ];
        
        let updateCount = 0;
        
        modifiers.forEach(mod => {
            if (targets.some(prefix => mod.name.startsWith(prefix + ':'))) {
                if (mod.name.includes('[3 - 4]')) {
                    mod.name = mod.name.replace('[3 - 4]', '[2 - 3]');
                    mod.shortName = mod.shortName.replace('[3 - 4]', '[2 - 3]');
                    mod.htmlName = mod.htmlName.replace('[3 - 4]', '[2 - 3]');
                    updateCount++;
                }
            }
        });
        
        const newJsonString = JSON.stringify(modifiers, null, 4);
        
        content = content.replace(jsonString, newJsonString);
        fs.writeFileSync(path, content, 'utf8');
        console.log(`Successfully updated ${updateCount} skill rank modifiers to [2 - 3].`);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
