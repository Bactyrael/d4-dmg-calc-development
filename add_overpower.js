const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const regex = /if \(conds\.elite\) \{\s*addStat\('Damage to Elites'\);\s*addStat\('Elite Damage'\);\s*\}/m;

const replacement = `if (conds.elite) {
        addStat('Damage to Elites');
        addStat('Elite Damage');
    }
    if (conds.overpower) {
        addStat('Overpower Damage');
    }`;

if (regex.test(app)) {
    app = app.replace(regex, replacement);
    fs.writeFileSync('app.js', app);
    console.log("Added overpower logic.");
} else {
    console.log("Failed to find replacement target.");
}
