const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

// Add Desecration hotfix multiplier in window.renderGlyphTooltip
app = app.replace(/'Darkness': 0\.66, \/\/ Nerfed in-game, JSON still has 1\.0\/0\.075/g, 
`'Darkness': 0.66, // Nerfed in-game, JSON still has 1.0/0.075
                'Desecration': 0.99, // 9.9% base, caps at 65.2%`);

fs.writeFileSync('paragon_logic.js', app);
console.log('Patched Desecration glyph multiplier');
