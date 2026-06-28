const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const oldRender = `
      if (skill.enhancement) { 
        const enhRow = createSkillRow(skill.enhancement.name, skill.enhancement.maxRank, 1, skill.name); 
        skillGroup.appendChild(enhRow); 
        if (skill.enhancement.branches && skill.enhancement.branches.length > 0) { 
          const branchContainer = document.createElement('div'); 
          branchContainer.className = 'skill-branches'; 
          skill.enhancement.branches.forEach(branch => { 
            const bRow = createSkillRow(branch.name, branch.maxRank, 2, skill.enhancement.name, skill.enhancement.branches.map(b => b.name)); 
            branchContainer.appendChild(bRow); 
          }); 
          skillGroup.appendChild(branchContainer); 
        } 
      } 
`;

const newRender = `
      if (skill.modifiers && skill.modifiers.length > 0) { 
        const branchContainer = document.createElement('div'); 
        branchContainer.className = 'skill-branches'; 
        skill.modifiers.forEach(mod => { 
          const mRow = createSkillRow(mod.name, mod.maxRank, 1, skill.name, []); 
          branchContainer.appendChild(mRow); 
        }); 
        skillGroup.appendChild(branchContainer); 
      } else if (skill.enhancement) { 
        // Fallback for skills that didn't get updated (like Soulrift)
        const enhRow = createSkillRow(skill.enhancement.name, skill.enhancement.maxRank, 1, skill.name); 
        skillGroup.appendChild(enhRow); 
        if (skill.enhancement.branches && skill.enhancement.branches.length > 0) { 
          const branchContainer = document.createElement('div'); 
          branchContainer.className = 'skill-branches'; 
          skill.enhancement.branches.forEach(branch => { 
            const bRow = createSkillRow(branch.name, branch.maxRank, 2, skill.enhancement.name, skill.enhancement.branches.map(b => b.name)); 
            branchContainer.appendChild(bRow); 
          }); 
          skillGroup.appendChild(branchContainer); 
        } 
      }
`;

// wait, if I use replace with exact whitespace it might fail. I'll just use regex or replace chunks
appJs = appJs.replace(/if\s*\(skill\.enhancement\)\s*\{\s*const\s*enhRow[\s\S]*?skillGroup\.appendChild\(branchContainer\);\s*\}\s*\}/g, newRender.trim());

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Updated app.js render logic for modifiers");
