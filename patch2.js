const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(
    /const sName = slotName\.toLowerCase\(\);\s*const isWeapon = sName\.includes\('weapon'\) \|\| sName === 'mainhand' \|\| sName === 'offhand';\s*const isJewelry = sName === 'amulet' \|\| sName\.includes\('ring'\);/,
    "const sName = slotName.toLowerCase();\n              const isShield = item.type === 'Shield' || item.weaponType === 'Shield';\n              const isWeapon = !isShield && (sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand');\n              const isJewelry = sName === 'amulet' || sName.includes('ring');"
);

app = app.replace(
    /const sName = slotName\.toLowerCase\(\);\s*const isWeapon = sName\.includes\('weapon'\) \|\| sName === 'mainhand' \|\| sName === 'offhand';\s*const isArmor = sName === 'helm' \|\| sName === 'chest armor' \|\| sName === 'pants' \|\| sName === 'boots' \|\| sName === 'gloves';\s*const isJewelry = sName === 'amulet' \|\| sName\.includes\('ring'\);/,
    "const sName = slotName.toLowerCase();\n        const isShield = item.type === 'Shield' || item.weaponType === 'Shield';\n        const isWeapon = !isShield && (sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand');\n        const isArmor = isShield || sName === 'helm' || sName === 'chest armor' || sName === 'pants' || sName === 'boots' || sName === 'gloves';\n        const isJewelry = sName === 'amulet' || sName.includes('ring');"
);

app = app.replace(
    /const sName = slotName\.toLowerCase\(\);\s*const isWeapon = sName\.includes\('weapon'\) \|\| sName === 'mainhand' \|\| sName === 'offhand' \|\| sName\.includes\('slicing'\);\s*const isArmor = sName === 'helm' \|\| sName === 'chest armor' \|\| sName === 'pants' \|\| sName === 'boots' \|\| sName === 'gloves';\s*const isJewelry = sName === 'amulet' \|\| sName\.includes\('ring'\);/,
    "const sName = slotName.toLowerCase();\n                const isShield = itemObj.type === 'Shield' || itemObj.weaponType === 'Shield';\n                const isWeapon = !isShield && (sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand' || sName.includes('slicing'));\n                const isArmor = isShield || sName === 'helm' || sName === 'chest armor' || sName === 'pants' || sName === 'boots' || sName === 'gloves';\n                const isJewelry = sName === 'amulet' || sName.includes('ring');"
);

fs.writeFileSync('app.js', app);
console.log('Patched app.js');
