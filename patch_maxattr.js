const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Fix 1: Aspects
appJs = appJs.replace(
    /let minAttr = min !== null \? \` min="\$\{min\}"\` : '';\s*let maxAttr = ''; \/\/ Allow overriding max for higher item power tiers/,
    `let minAttr = min !== null ? \` min="\${min}"\` : '';\n              let maxAttr = max !== null ? \` max="\${max}"\` : '';`
);

// Fix 2: Uniques
appJs = appJs.replace(
    /let minAttr = min \? \` min="\$\{min\}"\` : '';\s*let stepAttr = \(min && min\.includes\('\.'\)\)/,
    `let minAttr = min ? \` min="\${min}"\` : '';\n            let maxAttr = max ? \` max="\${max}"\` : '';\n            let stepAttr = (min && min.includes('.'))`
);

appJs = appJs.replace(
    /\$\{minAttr\}\$\{stepAttr\}/g,
    `\${minAttr}\${maxAttr}\${stepAttr}`
);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('app.js updated successfully for min/max attributes.');
