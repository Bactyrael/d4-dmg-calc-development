const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target1 = `    let bucket = 0;
    
    // Helper to safely add stat
    const addStat = (statName) => {
        if (stats[statName] && stats[statName].final) {
            // Stats are typically stored as whole numbers (e.g., 50 for 50%), so divide by 100 for multiplier
            // Wait, compiledStats might already be handled. Let's assume stats are e.g., 50 = 50%.
            bucket += stats[statName].final / 100;
        }
    };`;

const repl1 = `    let bucket = 0;
    let components = [];
    
    // Helper to safely add stat
    const addStat = (statName) => {
        if (stats[statName] && stats[statName].final) {
            let val = stats[statName].final / 100;
            bucket += val;
            components.push({ name: statName, value: val });
        }
    };`;

app = app.replace(target1, repl1);

const target2 = `    // Fortify is a player state, assume 100% if they have fortify generation, but we'll just check if they have Max Life fortify
    // We'll leave conditional player states simple for now.

    return bucket;
}`;

const repl2 = `    // Fortify is a player state, assume 100% if they have fortify generation, but we'll just check if they have Max Life fortify
    // We'll leave conditional player states simple for now.

    return { total: bucket, components: components };
}`;

app = app.replace(target2, repl2);

fs.writeFileSync('app.js', app);
console.log('Fixed Additive Bucket Return');
