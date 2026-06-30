const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const regex1 = /if \(modSkill\.baseDamageScalar\) \{\s*let pct = \(modSkill\.baseDamageScalar \* rankMultiplier \* 100\)\.toFixed\(1\)\.replace\('\.0', ''\);\s*let minStr = Math\.floor\(wpMin \* modSkill\.baseDamageScalar \* rankMultiplier\)\.toLocaleString\(\);\s*let maxStr = Math\.floor\(wpMax \* modSkill\.baseDamageScalar \* rankMultiplier\)\.toLocaleString\(\);/;

if (regex1.test(app)) {
    app = app.replace(regex1, `let additiveMult = 1 + calculateSkillAdditiveBucket(modSkill);
                            let multiMult = calculateSkillMultiplicativeBucket(modSkill);
                            let finalScalar = rankMultiplier * additiveMult * multiMult;

                            if (modSkill.baseDamageScalar) {
                                let pct = (modSkill.baseDamageScalar * finalScalar * 100).toFixed(1).replace('.0', '');
                                let minStr = Math.floor(wpMin * modSkill.baseDamageScalar * finalScalar).toLocaleString();
                                let maxStr = Math.floor(wpMax * modSkill.baseDamageScalar * finalScalar).toLocaleString();`);
    console.log("Replaced target 1");
} else {
    console.log("Failed to match target 1");
}

const regex2 = /let pct = \(val \* rankMultiplier \* 100\)\.toFixed\(1\)\.replace\('\.0', ''\);\s*let minStr = Math\.floor\(wpMin \* val \* rankMultiplier\)\.toLocaleString\(\);\s*let maxStr = Math\.floor\(wpMax \* val \* rankMultiplier\)\.toLocaleString\(\);/;

if (regex2.test(app)) {
    app = app.replace(regex2, `let pct = (val * finalScalar * 100).toFixed(1).replace('.0', '');
                                      let minStr = Math.floor(wpMin * val * finalScalar).toLocaleString();
                                      let maxStr = Math.floor(wpMax * val * finalScalar).toLocaleString();`);
    console.log("Replaced target 2");
} else {
    console.log("Failed to match target 2");
}

fs.writeFileSync('app.js', app);
