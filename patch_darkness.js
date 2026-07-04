const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

// Update the Darkness hotfix multiplier in window.renderGlyphTooltip
app = app.replace(/'Darkness': 2\/3, \/\/ Nerfed in-game, JSON still has 1\.0\/0\.075/g, 
`'Darkness': 0.66, // Nerfed in-game, JSON still has 1.0/0.075`);

fs.writeFileSync('paragon_logic.js', app);
console.log('Patched Darkness glyph multiplier');
