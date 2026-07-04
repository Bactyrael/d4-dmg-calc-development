const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

let regex = /<details style="margin-left: 20px; font-size: 0\.9em; margin-bottom: 6px;">\s*<summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">\s*<span style="color: #555;">└<\/span> Critical Hit: <span style="font-weight: bold;">\$\{b\.critStrMin\} - \$\{b\.critStrMax\}<\/span>\s*<\/summary>\s*<div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">\s*<span style="color: #555;">├<\/span> Base Critical Multiplier: x1\.5\s*<\/div>\s*\$\{\(b\.critMultiplicativeComponents \|\| \[\]\)\.map\(comp => `<div style="margin-left: 20px; font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├<\/span> \$\{comp\.name\}: x\$\{Number\(comp\.value\.toFixed\(6\)\)\}<\/div>`\)\.join\(''\)\}\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">\s*<span style="color: #555;">├<\/span> Additive Critical Bonus: \+\$\{Number\(\(\(b\.critAdditiveMult - b\.additiveMult\) \* 100\)\.toFixed\(1\)\)\}%\s*<\/div>\s*<\/div>\s*<\/details>/;

let replace = `\${!b.isHit ? '' : \`<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">\${b.critStrMin} - \${b.critStrMax}</span>
                                      </summary>
                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                        </div>
                                        \${(b.critMultiplicativeComponents || []).map(comp => \\\`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> \${comp.name}: x\${Number(comp.value.toFixed(6))}</div>\\\`).join('')}
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                          <span style="color: #555;">├</span> Additive Critical Bonus: +\${Number(((b.critAdditiveMult - b.additiveMult) * 100).toFixed(1))}%
                                        </div>
                                      </div>
                                    </details>\`}`;

let result = appContent.replace(regex, replace);
if (result === appContent) {
    console.log("NO MATCH FOUND!");
} else {
    fs.writeFileSync('app.js', result);
    console.log("SUCCESS");
}
