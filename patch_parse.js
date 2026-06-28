const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace(
    /if \(item\.aspectValues && item\.aspectValues\.length > 0\) val = item\.aspectValues\[0\];/g,
    'if (item.aspectValues && item.aspectValues.length > 0) val = parseFloat(item.aspectValues[0]) || 0;'
);

appJs = appJs.replace(
    /if \(item\.aspectValues && item\.aspectValues\.length > 0\) v = item\.aspectValues\[0\];/g,
    'if (item.aspectValues && item.aspectValues.length > 0) v = parseFloat(item.aspectValues[0]) || 0;'
);

fs.writeFileSync('app.js', appJs, 'utf8');
