const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');
const skillsLogic = `window.selectedSkills = {};
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
      const baseRow = createSkillRow(skill.name, skill.maxRank, 0); 
      skillGroup.appendChild(baseRow); 
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
  if (indentLevel > 0) nameSpan.innerHTML = '<span style="color:#666;">└</span> ' + name; 
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
    if (window.selectedSkills[name] > 0) row.classList.add('active'); 
    else row.classList.remove('active'); 
  }; 
  minusBtn.onclick = () => { 
    if (window.selectedSkills[name] > 0) { 
      window.selectedSkills[name]--; 
      if (window.selectedSkills[name] === 0) delete window.selectedSkills[name]; 
      updateDisplay(); 
      if (typeof recalculate === 'function') recalculate(); 
    } 
  }; 
  plusBtn.onclick = () => { 
    const current = window.selectedSkills[name] || 0; 
    if (parentName && (!window.selectedSkills[parentName] || window.selectedSkills[parentName] === 0)) return; 
    if (current < maxRank) { 
      if (exclusiveSiblings.length > 0) { 
        let hasSibling = false; 
        exclusiveSiblings.forEach(sib => { 
          if (sib !== name && window.selectedSkills[sib] > 0) hasSibling = true; 
        }); 
        if (hasSibling) return; 
      } 
      window.selectedSkills[name] = current + 1; 
      updateDisplay(); 
      if (typeof recalculate === 'function') recalculate(); 
    } 
  }; 
  updateDisplay(); 
  controls.appendChild(minusBtn); 
  controls.appendChild(rankDisplay); 
  controls.appendChild(plusBtn); 
  row.appendChild(nameSpan); 
  row.appendChild(controls); 
  return row; 
}`;

if (!appJs.includes('function renderSkills()')) { 
  appJs = appJs.replace('function start() {', skillsLogic + '\n  function start() {'); 
  appJs = appJs.replace(/renderEquipment\(.*?\);/, `renderEquipment(dom.classSelect ? dom.classSelect.value : 'Barbarian', {});\n    renderSkills();`); 
  fs.writeFileSync('app.js', appJs); 
  console.log('Successfully injected skills logic into app.js'); 
} else {
  console.log('renderSkills already exists in app.js');
}
