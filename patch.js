const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(/if \(applies\) \{\s*bucket \*= \(1 \+ \(val \/ 100\)\);\s*\}\s*\}\s*\}\s*return bucket;/g, `if (applies) {
                let valMult = (1 + (val / 100));
                bucket *= valMult;
                components.push({ name: key, value: valMult });
            }
        }
    }
    
    return { total: bucket, components: components };`);

// Also fix getSkillDamageBreakdown returning the object!
// Wait! Previously I completely forgot to patch getSkillDamageBreakdown return block in patch_breakdown.js correctly?
// Ah! Let's check if getSkillDamageBreakdown is returning components.
if (!app.includes('additiveComponents')) {
    app = app.replace(/return \{\s*mainStatName,\s*mainStatMult,\s*additiveMult,\s*multiMult,\s*finalScalar,\s*wpMin,\s*wpMax,\s*minStr: minDmg.toLocaleString\(\),\s*maxStr: maxDmg.toLocaleString\(\),\s*rankMultiplier\s*\};/g, 
`return {
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
        additiveComponents: addData.components,
        multiplicativeComponents: multiData.components
    };`);
}

fs.writeFileSync('app.js', app);
