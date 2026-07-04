const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Fix 1: In compileCharacterStats, change the injection to just 15
app = app.replace(/if \(activeBuffs\.overpower > 0\) \{\s*addStat\(stats, 'Damage Per Overpower Stack', activeBuffs\.overpower \* 15, 'Overpower Stacks'\);\s*\}/, 
`addStat(stats, 'Damage Per Overpower Stack', 15, 'Inherent Overpower Bonus');`);

// Fix 2: In calculateSkillAdditiveBucket, change how it handles Damage Per Overpower Stack
app = app.replace(/addStat\('Damage Per Overpower Stack'\);/g, 
`    if (stats['Damage Per Overpower Stack'] && stats['Damage Per Overpower Stack'].final) {
        let opStacks = 0;
        if (typeof getActiveBuffs === 'function') {
            let activeBuffs = getActiveBuffs();
            opStacks = activeBuffs.overpower || 0;
        }
        if (opStacks > 0) {
            let val = (stats['Damage Per Overpower Stack'].final * opStacks) / 100;
            bucket += val;
            components.push({ name: 'Damage Per Overpower Stack (x' + opStacks + ')', value: val });
        }
    }`);

fs.writeFileSync('app.js', app);
console.log('Fixed OP Stacks multiplier in Additive Bucket');
