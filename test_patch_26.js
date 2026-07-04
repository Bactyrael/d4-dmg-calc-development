const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

// Replace renderCalcSkills label
let target1 = `let baseLabel = (['Bone Storm', 'Blood Mist', 'Devouring Mist', 'Blood Transfusion', 'Blood Rush'].includes(modSkill.name)) ? 'Per Tick Damage' : 'Damage';`;
let replace1 = `let baseLabel = (['Bone Storm', 'Blood Mist', 'Devouring Mist', 'Blood Transfusion', 'Blood Rush'].includes(modSkill.name)) ? 'Per Tick Damage' : (!b.isHit ? 'DoT Damage' : 'Damage');`;

// Replace showSkillTooltip label
let target2 = `<span>Final Damage:</span> <span>\${b.minStr} - \${b.maxStr}</span>`;
let replace2 = `<span>\${!b.isHit ? 'DoT Damage' : 'Final Damage'}:</span> <span>\${b.minStr} - \${b.maxStr}</span>`;

appContent = appContent.replace(target1, replace1);
appContent = appContent.replace(target2, replace2);

fs.writeFileSync('app.js', appContent);
console.log('Renamed UI labels successfully');
