const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const oldCreateSlot = /const createSlot = \(name, maxRank, isBase, index, category\) => \{[\s\S]*?return slot;\s*\};/m;

const newCreateSlot = `const createSlot = (name, maxRank, isBase, index, category, baseSkillName) => {
          const slot = document.createElement('div');
          
          let slotClass = 'paperdoll-slot';
          if (isBase) slotClass += ' pd-base';
          else if (index < 3) slotClass += ' pd-dia pd-mod-' + index;
          else slotClass += ' pd-cir pd-mod-' + index;
          
          slot.className = slotClass;
          slot.title = name;
          
          if (category === 'Basic') {
              let imgName = name.toLowerCase().replace(/\\s+/g, '-');
              let imgSrc = 'assets/skills/' + imgName + '.png';
              
              const img = document.createElement('img');
              img.src = imgSrc;
              img.onerror = () => { 
                  // If the direct name fails, try appending the base skill name (e.g. crowd-control-decompose.png)
                  if (!isBase && baseSkillName && img.src.includes(imgSrc)) {
                      let baseName = baseSkillName.toLowerCase().replace(/\\s+/g, '-');
                      img.src = 'assets/skills/' + imgName + '-' + baseName + '.png';
                  } else {
                      img.style.display = 'none'; 
                  }
              };
              slot.appendChild(img);
          }
          
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
      };`;

appJs = appJs.replace(oldCreateSlot, newCreateSlot);

// Also need to update the calls to createSlot to pass skill.name
appJs = appJs.replace(/createSlot\(skill\.name, skill\.maxRank, true, -1, category\)/g, "createSlot(skill.name, skill.maxRank, true, -1, category, skill.name)");
appJs = appJs.replace(/createSlot\(mod\.name, mod\.maxRank, false, idx, category\)/g, "createSlot(mod.name, mod.maxRank, false, idx, category, skill.name)");

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Patched app.js to handle fallback image names");
