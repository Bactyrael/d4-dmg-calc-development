const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `
                        \${(function() {
                            let html = '';
                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * 100).toFixed(1).replace('.0', '');
                                html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                  <span style="color: #555;">├</span> Base Damage (\${pct}%): <span style="color: #fff;">TBD - TBD</span>
                                </div>\`;
                            }
                            if (modSkill.secondaryScalars) {
                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\\b\\w/g, c => c.toUpperCase());
                                    let pct = (val * 100).toFixed(1).replace('.0', '');
                                    html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                      <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">TBD - TBD</span>
                                    </div>\`;
                                }
                            }
                            return html;
                        })()}
`;

const replacementStr = `
                        \${(function() {
                            let html = '';
                            let rank = window.selectedSkills[baseSkill.name] || 1;
                            let rankMultiplier = 1 + (rank - 1) * 0.1;

                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                  <span style="color: #555;">├</span> Damage (\${pct}%): <span style="color: #fff;">TBD - TBD</span>
                                </div>\`;
                            }
                            if (modSkill.secondaryScalars) {
                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\\b\\w/g, c => c.toUpperCase());
                                    let pct = (val * rankMultiplier * 100).toFixed(1).replace('.0', '');
                                    html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                                      <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">TBD - TBD</span>
                                    </div>\`;
                                }
                            }
                            return html;
                        })()}
`;

if (app.includes(targetStr.trim())) {
    app = app.replace(targetStr.trim(), replacementStr.trim());
    fs.writeFileSync('app.js', app);
    console.log('Successfully updated rank scalar logic!');
} else {
    console.log('Failed to match string in app.js');
}
