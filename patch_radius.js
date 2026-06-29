const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

// Patch 1: getCompiledParagonStats
let search1 = `              let lvl = pData.glyph.level || 1;
              let radius = 2;
              if (lvl >= 15 && lvl <= 45) radius = 3;
              else if (lvl >= 46) radius = 4;`;
let replace1 = `              let lvl = pData.glyph.level || 1;
              let radius = 3;
              if (lvl >= 25 && lvl <= 49) radius = 4;
              else if (lvl >= 50) radius = 5;`;
code = code.replace(search1, replace1);

// Patch 2: renderParagonGrid
let search2 = `                    let lvl = pData.glyph.level || 1;
                    if (lvl >= 1 && lvl <= 14) glyphRadius = 2;
                    else if (lvl >= 15 && lvl <= 45) glyphRadius = 3;
                    else glyphRadius = 4;`;
let replace2 = `                    let lvl = pData.glyph.level || 1;
                    if (lvl >= 1 && lvl <= 24) glyphRadius = 3;
                    else if (lvl >= 25 && lvl <= 49) glyphRadius = 4;
                    else glyphRadius = 5;`;
code = code.replace(search2, replace2);

// Patch 3: updateGlyphRadiusDisplay
let search3 = `function updateGlyphRadiusDisplay(level) {
    let radius = 2;
    if (level >= 15 && level <= 45) radius = 3;
    else if (level >= 46) radius = 4;`;
let replace3 = `function updateGlyphRadiusDisplay(level) {
    let radius = 3;
    if (level >= 25 && level <= 49) radius = 4;
    else if (level >= 50) radius = 5;`;
code = code.replace(search3, replace3);

fs.writeFileSync('paragon_logic.js', code);
console.log('Radius patched successfully');
