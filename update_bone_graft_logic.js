const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Update legacy NECROMANCER_NODES array if it exists
app = app.replace("{ label: 'Bone Graft: 40%',     value: 40  }", "{ label: 'Bone Graft: 60%',     value: 60  }");

// Update calculate() injection
const oldBoneGraft = `          // Bone Graft (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_017')) {
              createMultiplicativeRow('Bone Graft (Legendary Node)', '40.00', true);
          }`;

const newBoneGraft = `          // Bone Graft (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_017')) {
              let isBone = false;
              if (dom.mainSkillSelect && typeof skillsDatabase !== 'undefined') {
                  const mainSkillName = dom.mainSkillSelect.value;
                  for (const cat in skillsDatabase) {
                      const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                      if (found && found.tags) {
                          const lower = found.tags.map(t => t.toLowerCase());
                          if (lower.includes('search_bone') || lower.includes('skill_bone')) {
                              isBone = true;
                          }
                      }
                  }
              }
              if (isBone) {
                  createMultiplicativeRow('Bone Graft (Legendary Node)', '60.00', true);
              }
          }`;

if (app.includes("legPowers.includes('Paragon_Necro_Legendary_017')")) {
    // Only replace the specific multiplicative creation part to avoid touching the max essence part elsewhere
    app = app.replace("createMultiplicativeRow('Bone Graft (Legendary Node)', '40.00', true);", `let isBone = false;
              if (dom.mainSkillSelect && typeof skillsDatabase !== 'undefined') {
                  const mainSkillName = dom.mainSkillSelect.value;
                  for (const cat in skillsDatabase) {
                      const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                      if (found && found.tags) {
                          const lower = found.tags.map(t => t.toLowerCase());
                          if (lower.includes('search_bone') || lower.includes('skill_bone')) {
                              isBone = true;
                          }
                      }
                  }
              }
              if (isBone) {
                  createMultiplicativeRow('Bone Graft (Legendary Node)', '60.00', true);
              }`);
    fs.writeFileSync('app.js', app);
    console.log('Fixed Bone Graft logic');
} else {
    console.log('Could not find Bone Graft logic');
}
