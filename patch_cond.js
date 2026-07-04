const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
let app = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Remove from HTML
html = html.replace(/\s*<label[^>]*>\s*<input type="checkbox" id="cond-overpower" class="d4-checkbox calc-condition">\s*Attack Overpowers\s*<\/label>\s*/, '\n                      ');
fs.writeFileSync('index.html', html);

// 2. Remove from getActiveConditions
app = app.replace(/\s*overpower: document\.getElementById\('cond-overpower'\)\?\.checked \|\| false,/, '');

// 3. Update addStat condition
const target = `    if (conds.overpower) {
        addStat('Overpower Damage');
    }`;
const repl = `    let opStacks = 0;
    if (typeof getActiveBuffs === 'function') {
        opStacks = getActiveBuffs().overpower || 0;
    }
    if (opStacks > 0) {
        addStat('Overpower Damage');
    }`;
app = app.replace(target, repl);

fs.writeFileSync('app.js', app);
console.log('Patched condition overpower');
