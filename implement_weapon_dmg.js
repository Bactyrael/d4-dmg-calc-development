const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Move renderCalcSkills()
if (app.includes("if (typeof renderCalcSkills === 'function') renderCalcSkills();")) {
    app = app.replace("if (typeof renderCalcSkills === 'function') renderCalcSkills();", "");
    
    // Add it to the end of calculate
    const endCalcTarget = `      } finally {
        isLoading = false;
      }`;
    const endCalcReplacement = `      } finally {
        isLoading = false;
      }
      if (typeof renderCalcSkills === 'function') renderCalcSkills();`;
    
    app = app.replace(endCalcTarget, endCalcReplacement);
}

// 2. Add min/max parsing
const varTarget = `let mainhandDmg = 0;
          let offhandDmg = 0;`;
const varReplacement = `let mainhandDmg = 0, mainhandMin = 0, mainhandMax = 0;
          let offhandDmg = 0, offhandMin = 0, offhandMax = 0;`;
app = app.replace(varTarget, varReplacement);

const mhTarget = `mainhandDmg = ((min + max) / 2) * qMult;
                }`;
const mhReplacement = `mainhandDmg = ((min + max) / 2) * qMult;
                    mainhandMin = min * qMult;
                    mainhandMax = max * qMult;
                }`;
app = app.replace(mhTarget, mhReplacement);

const ohTarget = `offhandDmg = ((min + max) / 2) * qMult;
                    }`;
const ohReplacement = `offhandDmg = ((min + max) / 2) * qMult;
                        offhandMin = min * qMult;
                        offhandMax = max * qMult;
                    }`;
app = app.replace(ohTarget, ohReplacement);

const shieldTarget = `if (hasShield) {
              totalWeaponDmg = mainhandDmg * 2;
          } else {
              totalWeaponDmg = mainhandDmg + offhandDmg;
          }`;
const shieldReplacement = `if (hasShield) {
              totalWeaponDmg = mainhandDmg * 2;
              window.weaponMinDmg = mainhandMin * 2;
              window.weaponMaxDmg = mainhandMax * 2;
          } else {
              totalWeaponDmg = mainhandDmg + offhandDmg;
              window.weaponMinDmg = mainhandMin + offhandMin;
              window.weaponMaxDmg = mainhandMax + offhandMax;
          }`;
app = app.replace(shieldTarget, shieldReplacement);

// 3. Update renderCalcSkills output
const renderTargetRegex = /\$\(function\(\) \{\s*let html = '';\s*let rank = window.selectedSkills\[baseSkill.name\] \|\| 1;\s*let rankMultiplier = 1 \+ \(rank - 1\) \* 0.1;[\s\S]*?return html;\s*\}\)\(\)/;

const renderReplacement = `$(function() {
                            let html = '';
                            let rank = window.selectedSkills[baseSkill.name] || 1;
                            let rankMultiplier = 1 + (rank - 1) * 0.1;
                            let wpMin = window.weaponMinDmg || 0;
                            let wpMax = window.weaponMaxDmg || 0;

                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                let minStr = Math.floor(wpMin * modSkill.baseDamageScalar * rankMultiplier).toLocaleString();
                                let maxStr = Math.floor(wpMax * modSkill.baseDamageScalar * rankMultiplier).toLocaleString();
                                html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                  <span style="color: #555;">├</span> Damage (\${pct}%): <span style="color: #fff;">\${minStr} - \${maxStr}</span>
                                </div>\`;
                            }
                            if (modSkill.secondaryScalars) {
                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\\b\\w/g, c => c.toUpperCase());
                                    let pct = (val * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                    let minStr = Math.floor(wpMin * val * rankMultiplier).toLocaleString();
                                    let maxStr = Math.floor(wpMax * val * rankMultiplier).toLocaleString();
                                    html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                      <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">\${minStr} - \${maxStr}</span>
                                    </div>\`;
                                }
                            }
                            return html;
                        })()`;

if (renderTargetRegex.test(app)) {
    app = app.replace(renderTargetRegex, renderReplacement);
    fs.writeFileSync('app.js', app);
    console.log('Successfully implemented weapon damage integration!');
} else {
    console.log('Failed to match render target regex');
}
