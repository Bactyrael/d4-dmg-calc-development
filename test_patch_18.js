const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

appContent = appContent.replace(
  /let bucket = 0;\s*let components = \[\];\s*\/\/ Helper to safely add stat/g,
  'let bucket = 0;\n    let components = [];\n    let addedKeys = new Set();\n    \n    // Helper to safely add stat'
);

appContent = appContent.replace(
  /if \(actualKey && stats\[actualKey\] && stats\[actualKey\]\.final\) \{/g,
  'if (actualKey && stats[actualKey] && stats[actualKey].final && !addedKeys.has(actualKey.toLowerCase())) {'
);

appContent = appContent.replace(
  /components\.push\(\{ name: actualKey, value: val \}\);\s*\}/g,
  'components.push({ name: actualKey, value: val });\n            addedKeys.add(actualKey.toLowerCase());\n        }'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched deduplication');
