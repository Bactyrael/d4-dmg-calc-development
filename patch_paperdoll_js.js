const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const oldRender = appJs.match(/function renderSkills\(\) \{[\s\S]*?container\.appendChild\(catDiv\);\s*\}\s*\}/)[0];

const newRender = `function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return; 
  
  // Create a grid layout for the category containers
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
  container.style.gap = '20px';
  container.style.alignItems = 'start';
  
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    const catDiv = document.createElement('div'); 
    catDiv.className = 'skill-category'; 
    catDiv.style.background = 'rgba(0,0,0,0.5)';
    catDiv.style.padding = '15px';
    catDiv.style.borderRadius = '8px';
    catDiv.style.border = '1px solid #333';
    
    const catTitle = document.createElement('h3'); 
    catTitle.className = 'skill-category-title'; 
    catTitle.textContent = category + ' Skills'; 
    catTitle.style.textAlign = 'center';
    catTitle.style.color = '#da2';
    catDiv.appendChild(catTitle); 
    
    const skillsList = document.createElement('div'); 
    skillsList.className = 'skill-list'; 
    skillsList.style.display = 'flex';
    skillsList.style.flexDirection = 'column';
    skillsList.style.gap = '20px';
    
    skills.forEach(skill => { 
      // Paperdoll wrapper
      const pdWrapper = document.createElement('div');
      pdWrapper.className = 'skill-paperdoll-wrapper';
      
      const pdTitle = document.createElement('div');
      pdTitle.className = 'skill-paperdoll-title';
      pdTitle.textContent = skill.name;
      pdWrapper.appendChild(pdTitle);
      
      const pd = document.createElement('div');
      pd.className = 'skill-paperdoll';
      
      // Helper to create a slot
      const createSlot = (name, maxRank, isBase, index) => {
          const slot = document.createElement('div');
          slot.className = 'paperdoll-slot' + (isBase ? ' paperdoll-base' : ' paperdoll-mod paperdoll-mod-' + index);
          
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
          
          // Click to add point, right click to remove point
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
      
      // Add Base Skill
      pd.appendChild(createSlot(skill.name, skill.maxRank, true, -1));
      
      // Add Modifiers
      if (skill.modifiers && skill.modifiers.length > 0) {
          skill.modifiers.forEach((mod, idx) => {
              pd.appendChild(createSlot(mod.name, mod.maxRank, false, idx));
          });
      }
      
      pdWrapper.appendChild(pd);
      skillsList.appendChild(pdWrapper); 
    }); 
    catDiv.appendChild(skillsList); 
    container.appendChild(catDiv); 
  } 
}`;

appJs = appJs.replace(oldRender, newRender);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Patched renderSkills for paperdoll");
