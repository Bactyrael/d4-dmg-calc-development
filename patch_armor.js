const fs = require('fs');
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

if (window.D4_DATABASE.itemDatabase.Helm) {
    window.D4_DATABASE.itemDatabase.Helm.forEach(item => {
        item.armor = 1603;
    });
}

fs.writeFileSync('assets/database.js', 'window.D4_DATABASE = ' + JSON.stringify(window.D4_DATABASE, null, 2) + ';\n');
console.log('Added armor: 1603 to all Helms');
