const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Fix calculateSkillAdditiveBucket to check for both 'Damage to X' and 'X Damage' naming conventions
const addBucketRegex = /if \(conds\.vulnerable\) addStat\('Damage to Vulnerable Enemies'\);\s*if \(conds\.close\) addStat\('Damage to Close Enemies'\);\s*if \(conds\.distant\) addStat\('Damage to Distant Enemies'\);\s*if \(conds\.healthy\) addStat\('Damage while Healthy'\);\s*if \(conds\.injured\) addStat\('Damage while Injured'\);\s*if \(conds\.cc\) \{\s*addStat\('Damage to Crowd Controlled Enemies'\);\s*addStat\('Damage to Slowed Enemies'\);\s*addStat\('Damage to Stunned Enemies'\);\s*\}\s*if \(conds\.elite\) \{\s*addStat\('Damage to Elites'\);\s*\}/m;

const addBucketReplacement = `if (conds.vulnerable) { addStat('Damage to Vulnerable Enemies'); addStat('Vulnerable Damage'); }
    if (conds.close) { addStat('Damage to Close Enemies'); addStat('Close Damage'); }
    if (conds.distant) { addStat('Damage to Distant Enemies'); addStat('Distant Damage'); }
    if (conds.healthy) addStat('Damage while Healthy');
    if (conds.injured) addStat('Damage while Injured');
    if (conds.cc) {
        addStat('Damage to Crowd Controlled Enemies');
        addStat('Damage to Slowed Enemies');
        addStat('Damage to Stunned Enemies');
        addStat('Crowd Control Damage');
    }
    if (conds.elite) {
        addStat('Damage to Elites');
        addStat('Elite Damage');
    }`;

if (addBucketRegex.test(app)) {
    app = app.replace(addBucketRegex, addBucketReplacement);
    console.log("Fixed calculateSkillAdditiveBucket logic.");
} else {
    console.log("Failed to find calculateSkillAdditiveBucket block.");
}

// 2. Fix the rounding in getSkillDamageBreakdown strings in both tooltips and renderCalcSkills
app = app.replace(/x\$\{(b\.mainStatMult\.toFixed\(2\))\}/g, "x${Number(b.mainStatMult.toFixed(6))}");
app = app.replace(/x\$\{(b\.multiMult\.toFixed\(2\))\}/g, "x${Number(b.multiMult.toFixed(6))}");

// 3. Fix the addStr formatting (remove toFixed(1) for true values)
app = app.replace(/let addStr = \(\(b\.additiveMult - 1\) \* 100\)\.toFixed\(1\)\.replace\('\.0', ''\);/g, "let addStr = Number(((b.additiveMult - 1) * 100).toFixed(6));");

fs.writeFileSync('app.js', app);
console.log("Updated app.js rounding and condition stats.");
