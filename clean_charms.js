const fs = require('fs');

const path = 'assets/database.js';
let content = fs.readFileSync(path, 'utf8');

const startRegex = /const charmModifiers = (\[[\s\S]*?\]);\s*if \(window\.D4_DATABASE/m;
const match = content.match(startRegex);

if (match) {
    const jsonString = match[1];
    
    try {
        let modifiers = JSON.parse(jsonString);
        const toRemove = [
            'of the Focused'
        ];
        
        modifiers = modifiers.filter(mod => {
            return !toRemove.some(prefix => mod.name.startsWith(prefix));
        });
        
        const newJsonString = JSON.stringify(modifiers, null, 4);
        
        content = content.replace(jsonString, newJsonString);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Successfully removed 'of the Focused'. Remaining count:", modifiers.length);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
