const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Remove from hotfixMultipliers
app = app.replace(/'Scourge': 0\.7 \/\/ Nerfed in-game, JSON still has 1\.0\/0\.075\s*/, '');

// 2. Add override to getCompiledParagonStats
const target1 = `                      // Dominate S14 override
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

const repl1 = `                      // Dominate S14 override
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
                      }
                      
                      // Scourge S14 override
                      if (affixKey === 'ShadowDoTDamage_Intelligence_Main') {
                          val = 0.7 + (0.049 * (level - 1));
                      }`;
app = app.replace(target1, repl1);

// 3. Add override to renderGlyphTooltip
const target2 = `            // Dominate S14 override
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

const repl2 = `            // Dominate S14 override
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
            }
            
            // Scourge S14 override
            if (affixKey === 'ShadowDoTDamage_Intelligence_Main') {
                val = 0.7 + (0.049 * (level - 1));
            }`;
app = app.replace(target2, repl2);

fs.writeFileSync('paragon_logic.js', app);
console.log('Patched Scourge glyph override');
