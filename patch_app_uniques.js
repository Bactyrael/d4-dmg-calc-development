const fs = require('fs');

const path = 'app.js';
let content = fs.readFileSync(path, 'utf8');

// Replace all uniqueObj lookups to strip ' (Charm)' first
const target1 = `const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === item.name);`;
const replace1 = `let baseName1 = item.name.replace(' (Charm)', '');
                  const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === baseName1) || (window.D4_DATABASE?.mythics || []).find(u => u.name === baseName1);`;
content = content.replace(target1, replace1);

const target2 = `const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === itemObj.name);`;
const replace2 = `let baseName2 = itemObj.name.replace(' (Charm)', '');
          const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === baseName2) || (window.D4_DATABASE?.mythics || []).find(u => u.name === baseName2);`;
content = content.split(target2).join(replace2);

// Fix the aspect section hiding
const target3 = `    if (slotName.toLowerCase() === 'seal' || slotName.toLowerCase().startsWith('charm')) {
        aspectSection = '';
        temperSection = '';
        socketSection = '';
    }`;
const replace3 = `    if (slotName.toLowerCase() === 'seal' || slotName.toLowerCase().startsWith('charm')) {
        if (itemObj.rarity !== 'unique' && itemObj.rarity !== 'mythic') {
            aspectSection = '';
        }
        temperSection = '';
        socketSection = '';
    }`;
content = content.replace(target3, replace3);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully patched app.js unique charm logic.");
