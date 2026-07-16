const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const targetLogic = `              let hasCore = false;
              if (window.currentBuild && window.currentBuild.activeSkills && typeof skillsDatabase !== 'undefined') {
                  for (let skillName of window.currentBuild.activeSkills) {
                      if (!skillName) continue;
                      let found = null;
                      for (let cat in skillsDatabase) {
                          found = skillsDatabase[cat].find(s => s.name === skillName);
                          if (found) break;
                      }
                      if (found) {
                          let modifiedSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(found) : found;
                          if (modifiedSkill.tags && modifiedSkill.tags.some(t => t.toLowerCase() === 'skill_core' || t.toLowerCase() === 'skill_primary_core')) {
                              let isHit = modifiedSkill.isHit !== undefined ? modifiedSkill.isHit : !['Decompose', 'Blighted Corpse Explosion'].includes(modifiedSkill.baseName || modifiedSkill.name);
                              if (isHit) {
                                  hasCore = true;
                                  break;
                              }
                          }
                      }
                  }
              }`;

const replacementLogic = `              let hasCore = false;
              if (typeof skillsDatabase !== 'undefined') {
                  let skillsToCheck = new Set();
                  if (window.currentBuild && window.currentBuild.activeSkills) {
                      window.currentBuild.activeSkills.forEach(s => { if (s) skillsToCheck.add(s); });
                  }
                  if (window.selectedSkills) {
                      Object.keys(window.selectedSkills).forEach(s => {
                          if (window.selectedSkills[s] > 0) skillsToCheck.add(s);
                      });
                  }
                  
                  for (let skillName of skillsToCheck) {
                      let found = null;
                      for (let cat in skillsDatabase) {
                          found = skillsDatabase[cat].find(s => s.name === skillName);
                          if (found) break;
                      }
                      if (found) {
                          let modifiedSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(found) : found;
                          if (modifiedSkill.tags && modifiedSkill.tags.some(t => t.toLowerCase() === 'skill_core' || t.toLowerCase() === 'skill_primary_core')) {
                              let isHit = modifiedSkill.isHit !== undefined ? modifiedSkill.isHit : !['Decompose', 'Blighted Corpse Explosion'].includes(modifiedSkill.baseName || modifiedSkill.name);
                              if (isHit) {
                                  hasCore = true;
                                  break;
                              }
                          }
                      }
                  }
              }`;

if (content.includes(targetLogic)) {
    content = content.replace(targetLogic, replacementLogic);
    fs.writeFileSync('app.js', content);
    console.log('Successfully patched Accelerating Aspect logic.');
} else {
    console.log('Target logic not found!');
}
