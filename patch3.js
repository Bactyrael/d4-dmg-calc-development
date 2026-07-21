const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(
    /const isShield = item\.type === 'Shield' \|\| item\.weaponType === 'Shield';/g,
    "const bItem = (window.D4_DATABASE?.itemDatabase?.[slotName] || []).find(i => i.name === item.name) || {};\n              const isShield = bItem.type === 'Shield' || bItem.weaponType === 'Shield';"
);

app = app.replace(
    /const isShield = itemObj\.type === 'Shield' \|\| itemObj\.weaponType === 'Shield';/g,
    "const bItem = (window.D4_DATABASE?.itemDatabase?.[slotName] || []).find(i => i.name === itemObj.name) || {};\n                const isShield = bItem.type === 'Shield' || bItem.weaponType === 'Shield';"
);

fs.writeFileSync('app.js', app);
console.log('Patched app.js successfully');
