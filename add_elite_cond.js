const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const eliteHtml = `                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-elite" class="d4-checkbox calc-condition"> Enemy is Elite
                     </label>
                   </div>`;

const targetGridEnd = `                   </div>
                </div>
              </div>`;

if (html.includes(targetGridEnd)) {
    // Actually let's just insert it before the closing </div> of the conditions-grid
    html = html.replace(/<label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">\s*<input type="checkbox" id="cond-overpower" class="d4-checkbox calc-condition"> Attack Overpowers\s*<\/label>\s*<\/div>/, `<label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-overpower" class="d4-checkbox calc-condition"> Attack Overpowers
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-elite" class="d4-checkbox calc-condition" checked> Enemy is Elite
                     </label>
                   </div>`);
    fs.writeFileSync('index.html', html);
    console.log('Updated index.html');
} else {
    console.log('Could not find conditions grid end in index.html');
}

// 2. Update app.js
let app = fs.readFileSync('app.js', 'utf8');

const getCondsTarget = `        cc: document.getElementById('cond-cc')?.checked || false,
        overpower: document.getElementById('cond-overpower')?.checked || false`;

const getCondsReplacement = `        cc: document.getElementById('cond-cc')?.checked || false,
        overpower: document.getElementById('cond-overpower')?.checked || false,
        elite: document.getElementById('cond-elite')?.checked || false`;

if (app.includes(getCondsTarget)) {
    app = app.replace(getCondsTarget, getCondsReplacement);
    console.log('Updated getActiveConditions');
} else {
    console.log('Could not find getActiveConditions');
}

const addBucketTarget = `    if (conds.cc) {
        addStat('Damage to Crowd Controlled Enemies');
        addStat('Damage to Slowed Enemies');
        addStat('Damage to Stunned Enemies');
    }`;

const addBucketReplacement = `    if (conds.cc) {
        addStat('Damage to Crowd Controlled Enemies');
        addStat('Damage to Slowed Enemies');
        addStat('Damage to Stunned Enemies');
    }
    if (conds.elite) {
        addStat('Damage to Elites');
    }`;

if (app.includes(addBucketTarget)) {
    app = app.replace(addBucketTarget, addBucketReplacement);
    console.log('Updated calculateSkillAdditiveBucket');
} else {
    console.log('Could not find addBucketTarget');
}

fs.writeFileSync('app.js', app);
console.log('Updated app.js');
