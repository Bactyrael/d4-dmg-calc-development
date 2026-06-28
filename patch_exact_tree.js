const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// The new render function replaces the old skill paperdoll grid with the exact 7-col 5-row layout and SVG lines.
const newRender = `function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return; 
  
  // Create a flex column layout for the category containers
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
    skillsList.style.gap = '60px';
    
    skills.forEach(skill => { 
      const pdContainer = document.createElement('div');
      pdContainer.style.display = 'flex';
      pdContainer.style.flexDirection = 'column';
      pdContainer.style.alignItems = 'center';
      
      const pdTitle = document.createElement('div');
      pdTitle.style.color = '#ccc';
      pdTitle.style.marginBottom = '15px';
      pdTitle.style.fontWeight = 'bold';
      pdTitle.style.fontSize = '16px';
      pdTitle.textContent = skill.name;
      pdContainer.appendChild(pdTitle);
      
      const pd = document.createElement('div');
      pd.className = 'skill-paperdoll-grid';
      
      // Inject SVG for lines
      // 7 cols, 5 rows. cell=44, gap=15. width=398, height=280.
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'paperdoll-svg-lines');
      svg.setAttribute('viewBox', '0 0 398 280');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 
        // Base (199, 258) UP to Split (199, 199)
        'M 199 258 L 199 199 ' + 
        // Split LEFT to (81, 199) UP to Jct L (81, 140)
        'M 199 199 L 81 199 L 81 140 ' + 
        // Jct L splits: UP to Mod1 (81, 22), LEFT to Mod0 (22, 140) -- wait, let's just draw simple paths
        'M 81 140 L 81 22 ' + 
        'M 81 140 L 22 140 L 22 81 ' + 
        
        // Split RIGHT to (317, 199) UP to Jct R (317, 140)
        'M 199 199 L 317 199 L 317 140 ' +
        // Jct R splits: UP to Mod5 (317, 22), RIGHT to Mod6 (376, 140) -> UP to (376, 81)
        'M 317 140 L 317 22 ' +
        'M 317 140 L 376 140 L 376 81 ' +
        
        // Split UP to Jct M (199, 140)
        'M 199 199 L 199 140 ' +
        // Jct M splits: LEFT to (140, 140) UP to Mod2 (140, 81)
        'M 199 140 L 140 140 L 140 81 ' +
        // UP to Mod3 (199, 22)
        'M 199 140 L 199 22 ' +
        // RIGHT to (258, 140) UP to Mod4 (258, 81)
        'M 199 140 L 258 140 L 258 81'
      );
      path.setAttribute('stroke', '#a00');
      path.setAttribute('stroke-width', '4');
      path.setAttribute('fill', 'none');
      svg.appendChild(path);
      
      // Routing diamonds
      const addDiamond = (x, y) => {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', x - 6);
          rect.setAttribute('y', y - 6);
          rect.setAttribute('width', 12);
          rect.setAttribute('height', 12);
          rect.setAttribute('fill', '#a00');
          rect.setAttribute('transform', \`rotate(45 \${x} \${y})\`);
          svg.appendChild(rect);
      };
      addDiamond(199, 199); // Main split
      addDiamond(81, 140);  // Jct L
      addDiamond(199, 140); // Jct M
      addDiamond(317, 140); // Jct R
      
      pd.appendChild(svg);
      
      const createSlot = (name, maxRank, isBase, index) => {
          const slot = document.createElement('div');
          slot.className = 'paperdoll-slot' + (isBase ? ' pd-base' : ' pd-mod pd-mod-' + index);
          
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
.skill-paperdoll-grid {
  display: grid;
  grid-template-columns: repeat(7, 44px);
  grid-template-rows: repeat(5, 44px);
  gap: 15px;
  position: relative;
  width: 398px;
  height: 280px;
}

.paperdoll-svg-lines {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 1;
}

.pd-base { grid-column: 4; grid-row: 5; border-radius: 4px; border-color: #833; z-index: 2;}

/* Modifiers layout */
/* Left branch */
.pd-mod-0 { grid-column: 1; grid-row: 2; z-index: 2;}
.pd-mod-1 { grid-column: 2; grid-row: 1; z-index: 2;}
/* Middle branch */
.pd-mod-2 { grid-column: 3; grid-row: 2; z-index: 2;}
.pd-mod-3 { grid-column: 4; grid-row: 1; z-index: 2;}
.pd-mod-4 { grid-column: 5; grid-row: 2; z-index: 2;}
/* Right branch */
.pd-mod-5 { grid-column: 6; grid-row: 1; z-index: 2;}
.pd-mod-6 { grid-column: 7; grid-row: 2; z-index: 2;}

.paperdoll-slot.pd-mod img {
  transform: none; /* Removed rotation */
  border-radius: 50%; /* Maxroll screenshot had circles for modifiers */
}
.paperdoll-slot.pd-mod {
  border-radius: 50%;
  transform: none;
}
.paperdoll-slot.pd-mod:hover {
  transform: scale(1.1);
}
.pd-mod .paperdoll-rank {
  transform: none;
  bottom: -6px;
  right: -6px;
}
`;

fs.appendFileSync('style.css', newCss, 'utf8');
console.log("Patched layout for exact D4 branching tree");
