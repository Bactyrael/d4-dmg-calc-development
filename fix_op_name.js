const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
app = app.replace(/addStat\(stats, 'Overpower Damage', activeBuffs\.overpower \* 15, 'Overpower Stacks'\);/g, "addStat(stats, 'Damage Per Overpower Stack', activeBuffs.overpower * 15, 'Overpower Stacks');");
fs.writeFileSync('app.js', app);
