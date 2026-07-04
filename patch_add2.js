const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Use a targeted regex replacing
app = app.replace(/let bucket = 0;\s*\/\/\s*Helper to safely add stat\s*const addStat = \(statName\) => \{\s*if \(stats\[statName\] && stats\[statName\]\.final\) \{\s*[\s\S]*?bucket \+= stats\[statName\]\.final \/ 100;\s*\}\s*\};/, 
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

app = app.replace(/\/\/\s*We'll leave conditional player states simple for now\.\s*return bucket;\s*\}/, 
`// We'll leave conditional player states simple for now.

    return { total: bucket, components: components };
}`);

fs.writeFileSync('app.js', app);
console.log('Regex patch successful');
