const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. calculateSkillAdditiveBucket
app = app.replace(/let bucket = 0;\s*\/\/\s*Helper to safely add stat\s*const addStat = \(statName\) => \{\s*if \(stats\[statName\] && stats\[statName\].final\) \{\s*\/\/.*?\\n\s*\/\/.*?\\n\s*bucket \+= stats\[statName\].final \/ 100;\s*\}\s*\};/s, 
`let bucket = 0;
    let components = [];
    
    // Helper to safely add stat
    const addStat = (statName) => {
        if (stats[statName] && stats[statName].final) {
            let val = stats[statName].final / 100;
            bucket += val;
            components.push({ name: statName, value: val });
        }
    };`);

app = app.replace(/addStat\('Skill Damage'\); \/\/ Additive specific to skills/, `addStat('Skill Damage'); // Additive specific to skills
    addStat('Damage Per Overpower Stack');`);

app = app.replace(/return bucket;\n\}/s, `return { total: bucket, components: components };\n}`);

// 2. calculateSkillMultiplicativeBucket
app = app.replace(/let bucket = 1;\s*\/\/ Iterate over all stats to find multiplicative ones/s, `let bucket = 1;\n    let components = [];\n    \n    // Iterate over all stats to find multiplicative ones`);

app = app.replace(/bucket \*= valMult;/g, `bucket *= valMult;\n            components.push({ name: key, value: valMult });`);

// The second return bucket; inside calculateSkillMultiplicativeBucket (which is now the last one before getSkillDamageBreakdown)
// We'll replace it carefully.
let regexMulti = /(function calculateSkillMultiplicativeBucket[\s\S]*?)return bucket;\n\}/;
app = app.replace(regexMulti, `$1return { total: bucket, components: components };\n}`);

// 3. getSkillDamageBreakdown
app = app.replace(/let additiveMult = typeof calculateSkillAdditiveBucket === 'function' \? 1 \+ calculateSkillAdditiveBucket\(skillObj\) : 1;/g, 
`let addData = typeof calculateSkillAdditiveBucket === 'function' ? calculateSkillAdditiveBucket(skillObj) : { total: 0, components: [] };
    let additiveMult = 1 + addData.total;`);

app = app.replace(/let multiMult = typeof calculateSkillMultiplicativeBucket === 'function' \? calculateSkillMultiplicativeBucket\(skillObj\) : 1;/g, 
`let multiData = typeof calculateSkillMultiplicativeBucket === 'function' ? calculateSkillMultiplicativeBucket(skillObj) : { total: 1, components: [] };
    let multiMult = multiData.total;`);

app = app.replace(/return \{\s*minStr: minStr,\s*maxStr: maxStr,\s*mainStatName: mainStatName,\s*mainStatMult: mainStatMult,\s*additiveMult: additiveMult,\s*multiMult: multiMult,\s*finalScalar: finalScalar\s*\};/g, 
`return {
        minStr: minStr,
        maxStr: maxStr,
        mainStatName: mainStatName,
        mainStatMult: mainStatMult,
        additiveMult: additiveMult,
        multiMult: multiMult,
        finalScalar: finalScalar,
        additiveComponents: addData.components,
        multiplicativeComponents: multiData.components
    };`);

// 4. renderCalcSkills HTML update
app = app.replace(/<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">\s*<span style="color: #555;">└<\/span> Additive Multiplier: <span style="color: #fff;">1 \+ \(\$\{addStr\}%\)<\/span>\s*<\/div>/, 
`<div style="margin-bottom: 3px;">
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (\${addStr}%)</span>
                                        </div>
                                        \${(b.additiveComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> \${comp.name}: +\${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>\`).join('')}
                                      </div>`);

app = app.replace(/<div style="display: flex; align-items: center; gap: 5px;">\s*<span style="color: #555;">└<\/span> Multiplicative Multiplier: <span style="color: #fff;">x\$\{Number\(b\.multiMult\.toFixed\(6\)\)\}<\/span>\s*<\/div>/, 
`<div>
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x\${Number(b.multiMult.toFixed(6))}</span>
                                        </div>
                                        \${(b.multiplicativeComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> \${comp.name}: x\${Number(comp.value.toFixed(6))}</div>\`).join('')}
                                      </div>`);

fs.writeFileSync('app.js', app);
console.log('Patched app.js successfully');
