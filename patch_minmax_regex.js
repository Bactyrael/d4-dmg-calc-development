const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace(
    /let min = minStr \? parseFloat\(minStr\.replace\(\/,\/g, ''\)\) \* aspectMult : null;/g,
    "let min = minStr ? parseFloat(minStr.replace(/,/g, '')) * aspectMult : (aspectObj.minVal ? parseFloat(aspectObj.minVal) * aspectMult : null);"
);

appJs = appJs.replace(
    /let max = maxStr \? parseFloat\(maxStr\.replace\(\/,\/g, ''\)\) \* aspectMult : null;/g,
    "let max = maxStr ? parseFloat(maxStr.replace(/,/g, '')) * aspectMult : (aspectObj.maxVal ? parseFloat(aspectObj.maxVal) * aspectMult : null);"
);

fs.writeFileSync('app.js', appJs, 'utf8');
