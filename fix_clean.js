const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace('const clean = cleanStatName(item.aspect);\n                        addStat(stats, clean, v, slotName);', 'addStat(stats, item.aspect, v, slotName);');
fs.writeFileSync('app.js', appJs, 'utf8');
