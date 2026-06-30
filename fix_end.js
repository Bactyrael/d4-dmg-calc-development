const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Remove the junk from the end
code = code.replace(/\\nwindow\.getGlyphStatsInRadius.*$/g, '');
code = code.replace(/window\.getGlyphStatsInRadius.*$/g, '');

// Expose getGlyphStatsInRadius inside the file where it's defined
code = code.replace(/function getGlyphStatsInRadius\(slotIndex, glyphData\) \{/, 'window.getGlyphStatsInRadius = function getGlyphStatsInRadius(slotIndex, glyphData) {');

fs.writeFileSync('app.js', code);
