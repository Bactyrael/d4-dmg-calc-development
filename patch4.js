const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// We replace the previously inserted logic in compileCharacterStats
app = app.replace(
    /const bItem = \(window\.D4_DATABASE\?\.itemDatabase\?\.\[slotName\] \|\| \[\]\)\.find\(i => i\.name === item\.name\) \|\| \{\};\s*const isShield = bItem\.type === 'Shield' \|\| bItem\.weaponType === 'Shield';/,
    `let bItem = {};
              Object.values(window.D4_DATABASE?.itemDatabase || {}).forEach(arr => {
                  const found = arr.find(i => i.name === item.name);
                  if (found) bItem = found;
              });
              const isShield = bItem.type === 'Shield' || bItem.weaponType === 'Shield';`
);

// We replace the previously inserted logic in renderEquippedItems
app = app.replace(
    /const bItem = \(window\.D4_DATABASE\?\.itemDatabase\?\.\[slotName\] \|\| \[\]\)\.find\(i => i\.name === item\.name\) \|\| \{\};\s*const isShield = bItem\.type === 'Shield' \|\| bItem\.weaponType === 'Shield';/,
    `let bItem = {};
        Object.values(window.D4_DATABASE?.itemDatabase || {}).forEach(arr => {
            const found = arr.find(i => i.name === item.name);
            if (found) bItem = found;
        });
        const isShield = bItem.type === 'Shield' || bItem.weaponType === 'Shield';`
);

// We replace the previously inserted logic in renderGemSelect
app = app.replace(
    /const bItem = \(window\.D4_DATABASE\?\.itemDatabase\?\.\[slotName\] \|\| \[\]\)\.find\(i => i\.name === itemObj\.name\) \|\| \{\};\s*const isShield = bItem\.type === 'Shield' \|\| bItem\.weaponType === 'Shield';/,
    `let bItem = {};
                Object.values(window.D4_DATABASE?.itemDatabase || {}).forEach(arr => {
                    const found = arr.find(i => i.name === itemObj.name);
                    if (found) bItem = found;
                });
                const isShield = bItem.type === 'Shield' || bItem.weaponType === 'Shield';`
);

fs.writeFileSync('app.js', app);
console.log('Patched app.js successfully for bItem search');
