const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace the renderSkills function entirely again
const newRender = `function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return; 
  
  // Create a grid layout for the category containers (clusters)
  container.style.display = 'grid';
  container.style.gridTemplateColumns = '1fr'; // One large window per cluster taking full width
  container.style.gap = '30px';
  container.style.alignItems = 'start';
  
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    // This is the ONE LARGE PAPERDOLL WINDOW per cluster
    const catDiv = document.createElement('div'); 
    catDiv.className = 'skill-category skill-paperdoll-wrapper'; 
    catDiv.style.width = '100%';
    catDiv.style.boxSizing = 'border-box';
    
    const catTitle = document.createElement('h3'); 
    catTitle.className = 'skill-paperdoll-title'; 
    catTitle.textContent = category + ' Skills'; 
    catDiv.appendChild(catTitle); 
    
    // The list of all paperdolls in this cluster
    const skillsList = document.createElement('div'); 
    skillsList.className = 'skill-list'; 
    skillsList.style.display = 'flex';
    skillsList.style.flexDirection = 'row';
    skillsList.style.flexWrap = 'wrap';
    skillsList.style.justifyContent = 'center';
    skillsList.style.gap = '40px';
    
    skills.forEach(skill => { 
      // The individual skill paperdoll container (no wrapper background anymore)
      const pdContainer = document.createElement('div');
      pdContainer.style.display = 'flex';
      pdContainer.style.flexDirection = 'column';
      pdContainer.style.alignItems = 'center';
      
      const pdTitle = document.createElement('div');
      pdTitle.style.color = '#ccc';
      pdTitle.style.marginBottom = '10px';
      pdTitle.style.fontWeight = 'bold';
      pdTitle.style.fontSize = '14px';
      pdTitle.textContent = skill.name;
      pdContainer.appendChild(pdTitle);
      
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
      
      pdContainer.appendChild(pd);
      skillsList.appendChild(pdContainer); 
    }); 
    catDiv.appendChild(skillsList); 
    container.appendChild(catDiv); 
  } 
}`;

appJs = appJs.replace(/function renderSkills\(\) \{[\s\S]*?container\.appendChild\(catDiv\);\s*\}\s*\}/, newRender.trim());

fs.writeFileSync('app.js', appJs, 'utf8');
