const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const injection = `
      if (dom.mainSkillSelect) {
        dom.mainSkillSelect.addEventListener('change', () => {
          if (dom.mainSkillSelect.value && typeof skillsDatabase !== 'undefined') {
            for (const cat in skillsDatabase) {
              const found = skillsDatabase[cat].find(s => s.name === dom.mainSkillSelect.value);
              if (found && found.baseDamageScalar) {
                dom.skillDamage.value = (found.baseDamageScalar * 100).toFixed(2);
              }
            }
          }
          calculate();
        });
      }
      `;

// Find end of init() event listeners block
const target = "    // Global click listener to close context menu";
if (app.includes(target)) {
    app = app.replace(target, injection + target);
    fs.writeFileSync('app.js', app);
    console.log('Fixed mainSkillSelect event listener');
} else {
    console.log('Could not find injection point');
}
