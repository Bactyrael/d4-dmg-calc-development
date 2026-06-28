const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const oldRender = appJs.match(/function renderSkills\(\) \{[\s\S]*?container\.appendChild\(catDiv\);\s*\}\s*\}/)[0];

const newRender = `function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return; 
  
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '40px';
  
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    const catDiv = document.createElement('div'); 
    catDiv.className = 'skill-category skill-paperdoll-wrapper'; 
    catDiv.style.width = '100%';
    catDiv.style.boxSizing = 'border-box';
    
    const catTitle = document.createElement('h3'); 
    catTitle.className = 'skill-paperdoll-title'; 
    catTitle.textContent = category + ' Skills'; 
    catDiv.appendChild(catTitle); 
    
    const skillsList = document.createElement('div'); 
    skillsList.className = 'skill-list'; 
    skillsList.style.display = 'flex';
    skillsList.style.flexDirection = 'row';
    skillsList.style.flexWrap = 'wrap';
    skillsList.style.justifyContent = 'center';
    skillsList.style.gap = '40px';
    
    skills.forEach(skill => { 
      const pdContainer = document.createElement('div');
      pdContainer.style.display = 'flex';
      pdContainer.style.flexDirection = 'column';
      pdContainer.style.alignItems = 'flex-start';
      
      const pdTitle = document.createElement('div');
      pdTitle.style.color = '#fff';
      pdTitle.style.marginBottom = '8px';
      pdTitle.style.fontWeight = 'bold';
      pdTitle.style.fontSize = '16px';
      pdTitle.style.borderBottom = '1px solid #444';
      pdTitle.style.paddingBottom = '4px';
      pdTitle.style.width = '100%';
      pdTitle.textContent = skill.name;
      pdContainer.appendChild(pdTitle);
      
      const pd = document.createElement('div');
      pd.className = 'skill-compact-grid';
      
      const createSlot = (name, maxRank, isBase, index) => {
          const slot = document.createElement('div');
          
          let slotClass = 'paperdoll-slot';
          if (isBase) slotClass += ' pd-base';
          else if (index < 3) slotClass += ' pd-dia pd-mod-' + index;
          else slotClass += ' pd-cir pd-mod-' + index;
          
          slot.className = slotClass;
          slot.title = name;
          
          // NO IMAGES, JUST CSS SHAPES
          
          const rankDisplay = document.createElement('div');
          rankDisplay.className = 'paperdoll-rank';
          rankDisplay.textContent = (window.selectedSkills[name] || 0) + '/' + maxRank;
          slot.appendChild(rankDisplay);
          
          const updateDisplay = () => {
              rankDisplay.textContent = (window.selectedSkills[name] || 0) + '/' + maxRank;
              if (window.selectedSkills[name] > 0) slot.classList.add('active');
              else slot.classList.remove('active');
          };
          updateDisplay();
          
          slot.onclick = (e) => {
              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  window.selectedSkills[name] = cur + 1;
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };
          
          slot.oncontextmenu = (e) => {
              e.preventDefault();
              if (window.selectedSkills[name] > 0) {
                  window.selectedSkills[name]--;
                  if (window.selectedSkills[name] === 0) delete window.selectedSkills[name];
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };
          
          return slot;
      };
      
      pd.appendChild(createSlot(skill.name, skill.maxRank, true, -1));
      
      if (skill.modifiers && skill.modifiers.length > 0) {
          skill.modifiers.forEach((mod, idx) => {
              pd.appendChild(createSlot(mod.name, mod.maxRank, false, idx));
          });
      }
      
      pdContainer.appendChild(pd);
      skillsList.appendChild(pdContainer); 
    }); 
    catDiv.appendChild(skillsList); 
    container.appendChild(catDiv); 
  } 
}`;

appJs = appJs.replace(oldRender, newRender);
fs.writeFileSync('app.js', appJs, 'utf8');

console.log("Patched app.js to remove images");
