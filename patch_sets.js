const fs = require('fs');
let content = fs.readFileSync('assets/database.js', 'utf8');

let patchCount = 0;
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('rarity: "set"')) {
        // Look back up to 5 lines for the name
        let name = "";
        for (let j = i - 1; j >= i - 5 && j >= 0; j--) {
            if (lines[j].includes('name: "')) {
                const match = lines[j].match(/name:\s*"([^"]+)"/);
                if (match) {
                    name = match[1];
                    break;
                }
            }
        }
        
        if (name) {
            let setName = "";
            if (name.includes("of the Waking Touch")) setName = "Rathma's Waking Touch";
            else if (name.includes("of Desecration")) setName = "Radament's Desecration";
            else if (name.includes("of the Bone Weaver")) setName = "Art of the Bone Weaver";
            else if (name.includes("of the Black Shroud")) setName = "Peace of the Black Shroud";
            else if (name.includes("of the Blood Binder")) setName = "The Blood Binder";

            if (setName) {
                // Check if set is already assigned on the next line or previous lines
                if (!lines[i+1].includes('set: "') && !lines[i-1].includes('set: "') && !lines[i-2].includes('set: "')) {
                    lines[i] = line + `\n              set: "${setName}",`;
                    patchCount++;
                }
            }
        }
    }
}

fs.writeFileSync('assets/database.js', lines.join('\n'), 'utf8');
console.log(`Mapped ${patchCount} charms to their respective sets.`);
