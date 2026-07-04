const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

let newAddStat = `    let bucket = 0;
    let components = [];
    let addedKeys = new Set();
    
    // Helper to safely add stat
    const addStat = (statName) => {
        let actualKey = statName;
        if (!stats[statName]) {
            actualKey = Object.keys(stats).find(k => k.toLowerCase() === statName.toLowerCase());
        }
        if (actualKey && stats[actualKey] && stats[actualKey].final && !addedKeys.has(actualKey.toLowerCase())) {
            let val = stats[actualKey].final / 100;
            bucket += val;
            components.push({ name: actualKey, value: val });
            addedKeys.add(actualKey.toLowerCase());
        }
    };`;

content = content.replace(
    /let bucket = 0;\s*let components = \[\];\s*\/\/ Helper to safely add stat\s*const addStat = \(statName\) => \{\s*let actualKey = statName;\s*if \(\!stats\[statName\]\) \{\s*actualKey = Object\.keys\(stats\)\.find\(k => k\.toLowerCase\(\) === statName\.toLowerCase\(\)\);\s*\}\s*if \(actualKey && stats\[actualKey\] && stats\[actualKey\]\.final\) \{\s*let val = stats\[actualKey\]\.final \/ 100;\s*bucket \+= val;\s*components\.push\(\{ name: actualKey, value: val \}\);\s*\}\s*\};/,
    newAddStat
);

fs.writeFileSync('app.js', content);
console.log('Successfully patched app.js to prevent duplicate stat injections');
