const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Fix variables declaration
const regexVars = /let mainhandDmg = 0;\s*let offhandDmg = 0;/;
if (regexVars.test(app)) {
    app = app.replace(regexVars, `let mainhandDmg = 0; let mainhandMin = 0; let mainhandMax = 0;\n        let offhandDmg = 0; let offhandMin = 0; let offhandMax = 0;`);
} else {
    console.log("Failed to match regexVars");
}

// 2. Fix mainhandMin and mainhandMax
const regexMh = /mainhandDmg = \(\(min \+ max\) \/ 2\) \* qMult;/;
if (regexMh.test(app)) {
    app = app.replace(regexMh, `mainhandDmg = ((min + max) / 2) * qMult;\n                  mainhandMin = min * qMult;\n                  mainhandMax = max * qMult;`);
} else {
    console.log("Failed to match regexMh");
}

// 3. Fix offhandMin and offhandMax
const regexOh = /offhandDmg = \(\(min \+ max\) \/ 2\) \* qMult;/;
if (regexOh.test(app)) {
    app = app.replace(regexOh, `offhandDmg = ((min + max) / 2) * qMult;\n                      offhandMin = min * qMult;\n                      offhandMax = max * qMult;`);
} else {
    console.log("Failed to match regexOh");
}

// 4. Fix window variables injection
const regexShield = /if \(hasShield\) \{\s*totalWeaponDmg = mainhandDmg \* 2;\s*\} else \{\s*totalWeaponDmg = mainhandDmg \+ offhandDmg;\s*\}/;
if (regexShield.test(app)) {
    app = app.replace(regexShield, `if (hasShield) {
            totalWeaponDmg = mainhandDmg * 2;
            window.weaponMinDmg = mainhandMin * 2;
            window.weaponMaxDmg = mainhandMax * 2;
        } else {
            totalWeaponDmg = mainhandDmg + offhandDmg;
            window.weaponMinDmg = mainhandMin + offhandMin;
            window.weaponMaxDmg = mainhandMax + offhandMax;
        }`);
} else {
    console.log("Failed to match regexShield");
}

fs.writeFileSync('app.js', app);
console.log('Fixed calculate logic variables with Regex!');
