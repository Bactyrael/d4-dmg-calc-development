const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target = `Lucky Hit Chance: <span style="color: #fff;">100%</span>`;
const replacement = `Lucky Hit Chance: <span style="color: #fff;">\${modSkill.luckyHitChance || 0}%</span>`;

if (app.includes(target)) {
    app = app.replace(target, replacement);
    fs.writeFileSync('app.js', app);
    console.log('Fixed lucky hit chance value');
} else {
    console.log('Could not find string');
}
