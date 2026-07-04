const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Add Critical Hit to base scalar in renderCalcSkills
const rdrBaseTarget = `                                      </div>
                                    </div>
                                  </details>\`;`;
const rdrBaseRepl = `                                      </div>
                                    </div>
                                    <div style="margin-left: 20px; font-size: 0.9em; color: #f9d85c; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
                                      <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">\${b.critStrMin} - \${b.critStrMax}</span>
                                    </div>
                                  </details>\`;`;
app = app.replace(rdrBaseTarget, rdrBaseRepl);

// 2. Change secondary scalars to <details> and add Critical Hit
const rdrSecTarget = `                                    html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                      <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">\${minStr} - \${maxStr}</span>
                                    </div>\`;`;
const rdrSecRepl = `                                      let b2 = getSkillDamageBreakdown(secSkill, rank);
                                      let addStr2 = Number(((b2.additiveMult - 1) * 100).toFixed(6));
                                      let canCrit = !key.toLowerCase().includes('dot');
                                      let critMinStr = Math.floor(wpMin * val * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      let critMaxStr = Math.floor(wpMax * val * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      
                                    html += \`<details style="margin-bottom: 4px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                        <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff; font-weight: bold;">\${minStr} - \${maxStr}</span>
                                      </summary>
                                      <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                          <span style="color: #555;">└</span> \${b2.mainStatName} Multiplier: <span style="color: #fff;">x\${Number(b2.mainStatMult.toFixed(6))}</span>
                                        </div>
                                        <div style="margin-bottom: 3px;">
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (\${addStr2}%)</span>
                                          </div>
                                          \${(b2.additiveComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> \${comp.name}: +\${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>\`).join('')}
                                        </div>
                                        <div>
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x\${Number(b2.multiMult.toFixed(6))}</span>
                                          </div>
                                          \${(b2.multiplicativeComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> \${comp.name}: x\${Number(comp.value.toFixed(6))}</div>\`).join('')}
                                        </div>
                                      </div>
                                      \${canCrit ? \`
                                      <div style="margin-left: 20px; font-size: 0.9em; color: #f9d85c; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">\${critMinStr} - \${critMaxStr}</span>
                                      </div>\` : ''}
                                    </details>\`;`;
app = app.replace(rdrSecTarget, rdrSecRepl);

// Wait, the b2 variable needs to be created.
// In app.js line 7306:
// for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
// We need to define secSkill inside the loop.
const rdrSecSkillTarget = `                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\\b\\w/g, c => c.toUpperCase());`;
const rdrSecSkillRepl = `                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\\b\\w/g, c => c.toUpperCase());
                                    let secSkill = JSON.parse(JSON.stringify(modSkill));
                                    secSkill.baseDamageScalar = val;`;
app = app.replace(rdrSecSkillTarget, rdrSecSkillRepl);

fs.writeFileSync('app.js', app);
console.log('Patched app.js pane HTML');
