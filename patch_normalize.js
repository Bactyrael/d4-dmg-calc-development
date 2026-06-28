const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Find where skills are looped over
// We can just add a normalization step at the very beginning of renderSkills
const normalizationCode = `
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    skills.forEach(skill => {
        if (!skill.modifiers && skill.enhancement) {
            skill.modifiers = [
                { name: skill.enhancement.name, maxRank: skill.enhancement.maxRank }
            ];
            if (skill.enhancement.branches) {
                skill.enhancement.branches.forEach(b => {
                    skill.modifiers.push({ name: b.name, maxRank: b.maxRank });
                });
            }
        }
    });
  }
`;

// Insert it right after the undefined check
const searchStr = "if (typeof skillsDatabase === 'undefined') return;";
appJs = appJs.replace(searchStr, searchStr + "\\n" + normalizationCode);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Patched app.js to normalize old skill structures");
