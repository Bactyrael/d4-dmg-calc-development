const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const oldLogic = `        const lower = statName.toLowerCase();
        if (
          (lower.includes('damage') || lower.includes('critical') || lower.includes('vulnerable') || lower.includes('overpower')) &&
          !lower.includes('reduction') &&
          !lower.includes('chance') &&
          !lower.includes('base damage') &&
          !lower.includes('weapon damage') &&
          statName !== 'Skill Damage'
        ) {
          createAdditiveRow(statName, val.toFixed(2), true);
        }`;

app = app.replace(oldLogic, '');

fs.writeFileSync('app.js', app);
console.log('Removed old logic');
