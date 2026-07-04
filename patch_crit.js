const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Add Vulnerable 1.2x to calculateSkillMultiplicativeBucket
const multiTarget = `    // Iterate over all stats to find multiplicative ones`;
const multiRepl = `    // Apply Native Vulnerable Multiplier if applicable
    if (conds.vulnerable) {
        bucket *= 1.2;
        components.push({ name: 'Vulnerable (Native)', value: 1.2 });
    }
    
    // Iterate over all stats to find multiplicative ones`;
app = app.replace(multiTarget, multiRepl);

// 2. Modify getSkillDamageBreakdown
const bkdnTarget = `    return {
        mainStatName,
        mainStatMult,
        additiveMult,
        multiMult,
        finalScalar,
        wpMin,
        wpMax,
        minStr: minDmg.toLocaleString(),
        maxStr: maxDmg.toLocaleString(),
        rankMultiplier
    };`;
const bkdnRepl = `    let canCrit = true; // For base breakdown, we assume true unless explicitly overridden outside or if it's a DoT
    let critMin = 0;
    let critMax = 0;
    let critStrMin = "0";
    let critStrMax = "0";

    // Grab additive crit damage
    let additiveCritBonus = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Critical Strike Damage']) ? window.D4_COMPILED_STATS['Critical Strike Damage'].final / 100 : 0;
    let critAdditiveMult = additiveMult + additiveCritBonus;

    // Grab multiplicative crit multipliers
    let critMultiMult = multiMult * 1.5; // Base native 1.5x for critical hits
    
    if (window.D4_COMPILED_STATS) {
        // The Grandfather: 120%[x] -> 2.2x
        let gf = window.D4_COMPILED_STATS['The Grandfather'];
        if (gf && gf.final > 0) {
            critMultiMult *= (1 + (gf.final / 100));
        }
        
        // Blood Moon Breeches: 60%[x] conditionally (if cursed, but let's assume active if equipped for now, or check conditions)
        let bmb = window.D4_COMPILED_STATS['Blood Moon Breeches'];
        if (bmb && bmb.final > 0) {
            // Note: This applies strictly to enemies affected by curses, but as a generic multiplier we can assume it for the calculator
            critMultiMult *= (1 + (bmb.final / 100));
        }
    }

    let finalCritScalar = rankMultiplier * mainStatMult * critAdditiveMult * critMultiMult;

    if (skillObj.baseDamageScalar) {
        critMin = Math.floor(wpMin * skillObj.baseDamageScalar * finalCritScalar);
        critMax = Math.floor(wpMax * skillObj.baseDamageScalar * finalCritScalar);
        critStrMin = critMin.toLocaleString();
        critStrMax = critMax.toLocaleString();
    }

    return {
        mainStatName,
        mainStatMult,
        additiveMult,
        multiMult,
        finalScalar,
        wpMin,
        wpMax,
        minStr: minDmg.toLocaleString(),
        maxStr: maxDmg.toLocaleString(),
        rankMultiplier,
        critStrMin,
        critStrMax,
        critMultiMult,
        critAdditiveMult,
        multiplicativeComponents: multiData.components
    };`;
app = app.replace(bkdnTarget, bkdnRepl);

// 3. Modify renderCalcSkills (primary tooltip)
const rdr1Target = `            <div style="font-size: 0.95rem; color: #c9a55c; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #333; padding-top: 5px;">
              <span>Final Damage:</span> <span>\${b.minStr} - \${b.maxStr}</span>
            </div>`;
const rdr1Repl = `            <details style="margin-bottom: 5px;">
              <summary style="font-size: 0.85rem; color: #88a; cursor: pointer; user-select: none;">Show Multipliers</summary>
              <div style="padding-left: 10px; margin-top: 3px;">
                 \${(b.multiplicativeComponents || []).map(comp => 
                   \`<div style="font-size: 0.8rem; color: #aaa; display: flex; justify-content: space-between;">
                     <span>\${comp.name}</span> <span>x\${Number(comp.value.toFixed(4))}</span>
                    </div>\`
                 ).join('')}
              </div>
            </details>
            <div style="font-size: 0.95rem; color: #c9a55c; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #333; padding-top: 5px;">
              <span>Final Damage:</span> <span>\${b.minStr} - \${b.maxStr}</span>
            </div>
            <div style="font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">
              <span>Critical Hit:</span> <span>\${b.critStrMin} - \${b.critStrMax}</span>
            </div>`;
app = app.replace(rdr1Target, rdr1Repl);

// 4. Modify renderCalcSkills (secondary tooltip)
const rdr2Target = `                                      let minStr = Math.floor(wpMin * val * finalScalar).toLocaleString();
                                      let maxStr = Math.floor(wpMax * val * finalScalar).toLocaleString();
                                    html += \`<div style="margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
                                      <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">\${minStr} - \${maxStr}</span>
                                    </div>\`;`;
const rdr2Repl = `                                      let minStr = Math.floor(wpMin * val * finalScalar).toLocaleString();
                                      let maxStr = Math.floor(wpMax * val * finalScalar).toLocaleString();
                                      let canCrit = !key.toLowerCase().includes('dot');
                                      let critMinStr = Math.floor(wpMin * val * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      let critMaxStr = Math.floor(wpMax * val * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      
                                    html += \`<div style="margin-bottom: 4px; display: flex; flex-direction: column;">
                                      <div style="display: flex; align-items: center; justify-content: space-between;">
                                        <span style="color: #555;">├</span> \${label} (\${pct}%): <span style="color: #fff;">\${minStr} - \${maxStr}</span>
                                      </div>
                                      \${canCrit ? \`
                                      <div style="display: flex; align-items: center; justify-content: space-between; margin-left: 15px;">
                                        <span style="color: #555;">└</span> Critical Hit: <span style="color: #f9d85c; font-weight:bold;">\${critMinStr} - \${critMaxStr}</span>
                                      </div>\` : ''}
                                    </div>\`;`;
app = app.replace(rdr2Target, rdr2Repl);

fs.writeFileSync('app.js', app);
console.log('Patched app.js for critical hits and multiplicative components');
