const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const regex = /addStat\(stats, 'Damage', activeBuffs\.overpower \* 15, 'Overpower Stacks'\);/;
app = app.replace(regex, `addStat(stats, 'Overpower Damage', activeBuffs.overpower * 15, 'Overpower Stacks');`);

fs.writeFileSync('app.js', app);
console.log("Fixed Overpower buff stat name.");
