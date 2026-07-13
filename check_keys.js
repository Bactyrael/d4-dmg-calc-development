const fs = require('fs');

global.window = {};

eval(fs.readFileSync('assets/database.js', 'utf8'));

setTimeout(() => {
    if (window.D4_DATABASE && window.D4_DATABASE.classData && window.D4_DATABASE.classData['Necromancer'] && window.D4_DATABASE.classData['Necromancer'].equipment) {
        const equip = window.D4_DATABASE.classData['Necromancer'].equipment;
        console.log(Object.keys(equip));
        if (equip['charm']) {
            console.log("Charm modifiers count:", equip['charm'].modifiers ? equip['charm'].modifiers.length : 0);
        } else {
            console.log("No 'charm' key found in Necromancer equipment after timeout.");
        }
    } else {
        console.log("Database structure not found.");
    }
}, 1000);
