const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace(
    /document\.getElementById\('compiled-stats-content'\);/g,
    `document.getElementById('character-sheet-content');`
);

fs.writeFileSync('app.js', appJs, 'utf8');
