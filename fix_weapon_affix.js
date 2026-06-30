const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target = `    // Add flat "Weapon Damage" from modifiers
    if (compiledStats['Weapon Damage']) {
        totalWeaponDmg += compiledStats['Weapon Damage'].final;
    }`;
const replacement = `    // Add flat "Weapon Damage" from modifiers
    if (compiledStats['Weapon Damage']) {
        totalWeaponDmg += compiledStats['Weapon Damage'].final;
        if (typeof window.weaponMinDmg !== 'undefined') window.weaponMinDmg += compiledStats['Weapon Damage'].final;
        if (typeof window.weaponMaxDmg !== 'undefined') window.weaponMaxDmg += compiledStats['Weapon Damage'].final;
    }`;

app = app.replace(target, replacement);

// Wait, the target string might have different indentation or carriage returns. Let's use regex.
const regex = /\/\/ Add flat "Weapon Damage" from modifiers[\s\S]*?totalWeaponDmg \+= compiledStats\['Weapon Damage'\]\.final;\s*\}/;
if (regex.test(app)) {
    app = app.replace(regex, `// Add flat "Weapon Damage" from modifiers\n    if (compiledStats['Weapon Damage']) {\n        totalWeaponDmg += compiledStats['Weapon Damage'].final;\n        if (typeof window.weaponMinDmg !== 'undefined') window.weaponMinDmg += compiledStats['Weapon Damage'].final;\n        if (typeof window.weaponMaxDmg !== 'undefined') window.weaponMaxDmg += compiledStats['Weapon Damage'].final;\n    }`);
    fs.writeFileSync('app.js', app);
    console.log("Successfully updated weapon affix logic.");
} else {
    console.log("Failed to match weapon affix logic.");
}
