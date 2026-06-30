const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `
                        <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">├</span> Damage: <span style="color: #fff;">TBD - TBD</span>
                        </div>
`;

const replacementStr = `
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

let replaced = false;

// Do a fallback regex if exact string replacement fails due to encoding / line endings
const regex = /<div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">\s*<span style="color: #555;">[^<]+<\/span> Damage: <span style="color: #fff;">TBD - TBD<\/span>\s*<\/div>/;

if (app.includes(targetStr.trim())) {
    app = app.replace(targetStr.trim(), replacementStr.trim());
    replaced = true;
} else if (regex.test(app)) {
    app = app.replace(regex, replacementStr.trim());
    replaced = true;
}

if (replaced) {
    fs.writeFileSync('app.js', app);
    console.log('Successfully updated damage components block!');
} else {
    console.log('Failed to find damage block in app.js');
}
