const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
app = app.replaceAll('let maxAttr = max ? ` max="${max}"` : \'\';', 'let maxAttr = \'\'; // Allow overriding max for higher item power tiers');
fs.writeFileSync('app.js', app);
