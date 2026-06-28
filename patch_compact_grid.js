const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

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
      
      const pdTitle = document.createElement('div');
      pdTitle.style.color = '#fff';
      pdTitle.style.marginBottom = '8px';
      pdTitle.style.fontWeight = 'bold';
      pdTitle.style.fontSize = '16px';
      pdTitle.style.borderBottom = '1px solid #444';
      pdTitle.style.paddingBottom = '4px';
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
          
          let imgName = name.toLowerCase().replace(/\\s+/g, '-');
          let imgSrc = 'assets/skills/' + imgName + '.png';
          slot.innerHTML = \`<img src="\${imgSrc}" onerror="this.style.display='none'" title="\${name}" />\`;
          
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

appJs = appJs.replace(/function renderSkills\(\) \{[\s\S]*?container\.appendChild\(catDiv\);\s*\}\s*\}/, newRender.trim());
fs.writeFileSync('app.js', appJs, 'utf8');

const newCss = `
.skill-compact-grid {
  display: grid;
  grid-template-columns: 52px 40px 40px 40px;
  grid-template-rows: 40px 40px 40px;
  gap: 8px;
  position: relative;
  margin-top: 10px;
}

.pd-base { 
  grid-column: 1; 
  grid-row: 1; 
  width: 52px; 
  height: 52px; 
  border-radius: 4px; 
  border-color: #833; 
}

/* Top row diamonds */
.pd-dia { border-radius: 4px; transform: rotate(45deg); width: 34px; height: 34px; margin: 3px; }
.pd-dia img { transform: rotate(-45deg) scale(1.25); }
.pd-dia .paperdoll-rank { transform: rotate(-45deg); bottom: -8px; right: -8px; }

.pd-mod-0 { grid-column: 2; grid-row: 1; }
.pd-mod-1 { grid-column: 3; grid-row: 1; }
.pd-mod-2 { grid-column: 4; grid-row: 1; }

/* Second row circles */
.pd-cir { border-radius: 50%; width: 36px; height: 36px; margin: 2px; }
.pd-cir .paperdoll-rank { bottom: -6px; right: -6px; transform: none; }
.pd-cir img { transform: none; border-radius: 50%; }

.pd-mod-3 { grid-column: 2; grid-row: 2; }
.pd-mod-4 { grid-column: 3; grid-row: 2; }

/* Third row circles */
.pd-mod-5 { grid-column: 2; grid-row: 3; }
.pd-mod-6 { grid-column: 3; grid-row: 3; }
`;

fs.appendFileSync('style.css', newCss, 'utf8');
console.log("Patched layout for compact grid");
