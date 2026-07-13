const fs = require('fs');

global.window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

const charms = window.D4_DATABASE.charms || [];

console.log(JSON.stringify(charms, null, 2));
