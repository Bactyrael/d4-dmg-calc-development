const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

// Location 1: getCompiledParagonStats
const target1 = `                      let val = (affixInfo.base || 0) + ((affixInfo.perLevel || 0) * (level - 1));`;
const repl1 = `                      let val = (affixInfo.base || 0) + ((affixInfo.perLevel || 0) * (level - 1));
                      
                      // Dominate S14 override
                      if (affixKey === 'OverpowerDamage_Willpower_Side') {
                          if (level < 12) val = 1.0;
                          else if (level < 30) val = 1.1;
                          else if (level < 48) val = 1.2;
                          else if (level < 66) val = 1.3;
                          else if (level < 84) val = 1.4;
                          else if (level < 102) val = 1.5;
                          else if (level < 120) val = 1.6;
                          else if (level < 138) val = 1.7;
                          else val = 1.8;
                      }`;
app = app.replace(target1, repl1);

// Location 2: renderGlyphTooltip
const target2 = `            let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));`;
const repl2 = `            let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
            
            // Dominate S14 override
            if (affixKey === 'OverpowerDamage_Willpower_Side') {
                if (level < 12) val = 1.0;
                else if (level < 30) val = 1.1;
                else if (level < 48) val = 1.2;
                else if (level < 66) val = 1.3;
                else if (level < 84) val = 1.4;
                else if (level < 102) val = 1.5;
                else if (level < 120) val = 1.6;
                else if (level < 138) val = 1.7;
                else val = 1.8;
            }`;
app = app.replace(target2, repl2);

fs.writeFileSync('paragon_logic.js', app);
console.log('Patched Dominate glyph scaling for S14');
