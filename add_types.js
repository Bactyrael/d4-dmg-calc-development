const fs = require('fs');
const path = './assets/database.js';

let fileContent = fs.readFileSync(path, 'utf8');

// The file contains a global assignment: window.D4_DATABASE = { ... };
// We need to carefully parse it, modify it, and write it back.
// Since it's a JS file and not strict JSON, it's safer to execute it, modify the object, and serialize it back,
// BUT window isn't defined in Node.
// Let's create a fake window object.

global.window = {};
eval(fileContent);

const db = window.D4_DATABASE;

if (db && db.itemDatabase) {
    for (const [category, items] of Object.entries(db.itemDatabase)) {
        items.forEach(item => {
            // For weapons, type should be weaponType if it exists
            if (item.weaponType) {
                item.type = item.weaponType;
            } else {
                // Otherwise use the category (e.g., 'Helm', 'Chest Armor')
                item.type = category;
            }
        });
    }
}

// Now we need to write it back. We can just stringify the whole D4_DATABASE object.
// We'll format it nicely.
const newContent = 'window.D4_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n';
fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully updated database with item types.');
