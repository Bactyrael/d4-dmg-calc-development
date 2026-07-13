const fs = require('fs');

const path = 'assets/database.js';
let content = fs.readFileSync(path, 'utf8');

const startRegex = /const charmModifiers = (\[[\s\S]*?\]);\s*if \(window\.D4_DATABASE/m;
const match = content.match(startRegex);

if (match) {
    const jsonString = match[1];
    
    try {
        let modifiers = JSON.parse(jsonString);
        
        // Define the ordered prefixes for Lucky Hit
        const damagePrefixes = [
            'Frigid', 'Pyric', 'Divine', 'Voltaic', 'Brutal', 'Noxious', 'Umbral'
        ];
        
        const ccPrefixes = [
            'Dazing', 'Immobilization', 'Slowing', 'Stunning', 'Freezing'
        ];
        
        // Separate the modifiers
        let others = [];
        let damageMods = [];
        let ccMods = [];
        
        modifiers.forEach(mod => {
            if (damagePrefixes.some(p => mod.name.startsWith(p + ':'))) {
                damageMods.push(mod);
            } else if (ccPrefixes.some(p => mod.name.startsWith(p + ':'))) {
                ccMods.push(mod);
            } else {
                others.push(mod);
            }
        });
        
        // Optional: Sort the extracted mods by their prefix order just to be safe
        damageMods.sort((a, b) => {
            const aIdx = damagePrefixes.findIndex(p => a.name.startsWith(p));
            const bIdx = damagePrefixes.findIndex(p => b.name.startsWith(p));
            return aIdx - bIdx;
        });
        
        ccMods.sort((a, b) => {
            const aIdx = ccPrefixes.findIndex(p => a.name.startsWith(p));
            const bIdx = ccPrefixes.findIndex(p => b.name.startsWith(p));
            return aIdx - bIdx;
        });
        
        // Reconstruct array: others first, then damage lucky hits, then CC lucky hits
        // Alternatively, put ALL lucky hits at the very end. 
        // The prompt says "group the lucky hit effects together with the ones that deal damage first then the conditional ones after to clean up the charm list"
        const reordered = [...others, ...damageMods, ...ccMods];
        
        const newJsonString = JSON.stringify(reordered, null, 4);
        
        content = content.replace(jsonString, newJsonString);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Successfully reordered Lucky Hit modifiers. Total count:", reordered.length);
    } catch (e) {
        console.error("Error parsing JSON array:", e);
    }
} else {
    console.log("Could not find injected charm modifiers array using regex.");
}
