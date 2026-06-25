const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');
const skillsLogic = `
window.selectedSkills = {};

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  container.innerHTML = '';
  
  if (typeof skillsDatabase === 'undefined') return;
  
  for (const [category, skills] of Object.entries(skillsDatabase)) {
    const catDiv = document.createElement('div');
    catDiv.className = 'skill-category';
    
    const catTitle = document.createElement('h3');
    catTitle.className = 'skill-category-title';
    catTitle.textContent = category + ' Skills';
    catDiv.appendChild(catTitle);
    
    const skillsList = document.createElement('div');
    skillsList.className = 'skill-list';
    
    skills.forEach(skill => {
      const skillGroup = document.createElement('div');
      skillGroup.className = 'skill-group';
      
      // Base Skill
      const baseRow = createSkillRow(skill.name, skill.maxRank, 0);
      skillGroup.appendChild(baseRow);
      
      // Enhancement
      if (skill.enhancement) {
        const enhRow = createSkillRow(skill.enhancement.name, skill.enhancement.maxRank, 1, skill.name);
        skillGroup.appendChild(enhRow);
        
        // Branches
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
      
      skillsList.appendChild(skillGroup);
    });
    
    catDiv.appendChild(skillsList);
    container.appendChild(catDiv);
  }
}

function createSkillRow(name, maxRank, indentLevel, parentName = null, exclusiveSiblings = []) {
  const row = document.createElement('div');
  row.className = 'skill-row indent-' + indentLevel;
  
  const nameSpan = document.createElement('span');
  nameSpan.className = 'skill-name';
  nameSpan.textContent = name;
  if (indentLevel > 0) {
    nameSpan.innerHTML = '<span style="color:#666;">└</span> ' + name;
  }
  
  const controls = document.createElement('div');
  controls.className = 'skill-controls';
  
  const minusBtn = document.createElement('button');
  minusBtn.textContent = '-';
  minusBtn.className = 'skill-btn';
  
  const rankDisplay = document.createElement('span');
  rankDisplay.className = 'skill-rank';
  const currentRank = window.selectedSkills[name] || 0;
  rankDisplay.textContent = currentRank + ' / ' + maxRank;
  
  const plusBtn = document.createElement('button');
  plusBtn.textContent = '+';
  plusBtn.className = 'skill-btn';
  
  const updateDisplay = () => {
    rankDisplay.textContent = (window.selectedSkills[name] || 0) + ' / ' + maxRank;
    if (window.selectedSkills[name] > 0) {
      row.classList.add('active');
    } else {
      row.classList.remove('active');
    }
  };
  
  minusBtn.onclick = () => {
    if (window.selectedSkills[name] > 0) {
      window.selectedSkills[name]--;
      // If we unspec the parent, we should unspec children (simplified for now: just update display)
      if (window.selectedSkills[name] === 0) {
        delete window.selectedSkills[name];
      }
      updateDisplay();
      recalculate();
    }
  };
  
  plusBtn.onclick = () => {
    const current = window.selectedSkills[name] || 0;
    
    // Check Parent logic
    if (parentName && (!window.selectedSkills[parentName] || window.selectedSkills[parentName] === 0)) {
       // Cannot allocate if parent is 0
       return;
    }
    
    if (current < maxRank) {
      // Enforce mutual exclusivity
      if (exclusiveSiblings.length > 0) {
        let hasSibling = false;
        exclusiveSiblings.forEach(sib => {
          if (sib !== name && window.selectedSkills[sib] > 0) {
            hasSibling = true;
          }
        });
        if (hasSibling) return; // Blocked by sibling
      }
      
      window.selectedSkills[name] = current + 1;
      updateDisplay();
      recalculate();
    }
  };
  
  updateDisplay();
  
  controls.appendChild(minusBtn);
  controls.appendChild(rankDisplay);
  controls.appendChild(plusBtn);
  
  row.appendChild(nameSpan);
  row.appendChild(controls);
  
  return row;
}
`;

if (!appJs.includes('function renderSkills()')) {
  const initAppMatch = appJs.indexOf("document.addEventListener('DOMContentLoaded', () => {");
  if (initAppMatch !== -1) {
    const updatedApp = appJs.slice(0, initAppMatch) + skillsLogic + "\n" + appJs.slice(initAppMatch);
    fs.writeFileSync('app.js', updatedApp);
    
    // Also inject renderSkills() call in DOMContentLoaded
    const finalApp = fs.readFileSync('app.js', 'utf8');
    const loadStateMatch = finalApp.indexOf("updateClassDisplay();");
    if (loadStateMatch !== -1) {
        const finalAppUpdated = finalApp.slice(0, loadStateMatch) + "updateClassDisplay();\n  renderSkills();\n" + finalApp.slice(loadStateMatch + 21);
        fs.writeFileSync('app.js', finalAppUpdated);
    }
  }
}

const styleCss = fs.readFileSync('style.css', 'utf8');
if (!styleCss.includes('.skill-category')) {
  const skillsCss = `
/* Skills UI */
.skill-category {
  margin-bottom: 24px;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 16px;
}
.skill-category-title {
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 8px;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(0,0,0,0.3);
  padding: 8px;
  border-radius: 4px;
}
.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}
.skill-row:hover {
  background: rgba(255,255,255,0.05);
}
.skill-row.active .skill-name {
  color: #e5c899;
}
.skill-name {
  color: #ccc;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.indent-1 { padding-left: 24px; }
.indent-2 { padding-left: 48px; }
.skill-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.skill-btn {
  background: #333;
  border: 1px solid #555;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.skill-btn:hover {
  background: #555;
}
.skill-rank {
  color: #fff;
  font-family: monospace;
  width: 45px;
  text-align: center;
}
`;
  fs.appendFileSync('style.css', skillsCss);
}
