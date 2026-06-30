const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const renderFunc = `
function renderCalcSkills() {
    const container = document.getElementById('calc-pane-skills');
    if (!container) return;
    
    container.innerHTML = \`
      <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
         <span class="icon" style="color: #c9a55c;">⚔️</span> Skills Engine
      </h2>
    \`;

    if (typeof skillsDatabase === 'undefined' || !window.selectedSkills) {
        container.innerHTML += \`<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>\`;
        return;
    }

    let foundSkills = 0;
    
    for (const cat in skillsDatabase) {
        skillsDatabase[cat].forEach(baseSkill => {
            // Only render base skills that have points and a baseDamageScalar (which usually means they deal damage)
            if (window.selectedSkills[baseSkill.name] > 0 && baseSkill.baseDamageScalar) {
                foundSkills++;
                
                const modSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(baseSkill) : baseSkill;
                
                const card = document.createElement('div');
                card.className = 'd4-panel calc-skill-card';
                card.style.background = 'rgba(20,20,25,0.9)';
                card.style.border = '1px solid #334';
                card.style.borderRadius = '8px';
                card.style.padding = '20px';
                card.style.marginBottom = '15px';
                card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
                
                let iconUrl = '';
                if (window.NODE_IMAGES && window.NODE_IMAGES[modSkill.name.toLowerCase()]) {
                    // Try to guess path, typically it's assets/images/Necromancer/Skills/...
                    iconUrl = 'assets/images/Necromancer/Skills/' + window.NODE_IMAGES[modSkill.name.toLowerCase()];
                }
                
                let iconHtml = iconUrl 
                    ? \`<img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.style.display='none'">\` 
                    : \`<div style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;">?</div>\`;
                
                card.innerHTML = \`
                  <div style="display: flex; align-items: flex-start; gap: 15px;">
                    \${iconHtml}
                    <div style="flex: 1;">
                      <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; justify-content: space-between;">
                        \${modSkill.name}
                        <span style="font-size: 0.9rem; color: #888;">Rank \${window.selectedSkills[baseSkill.name]}</span>
                      </h3>
                      <div style="color: #aaa; font-size: 0.9rem; margin-top: 10px; font-family: monospace;">
                        <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">\u251C</span> Damage: <span style="color: #fff;">TBD - TBD</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">\u2514</span> Chance to Hit: <span style="color: #fff;">100%</span>
                        </div>
                        
                        <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">\u251C</span> Attack Rate: <span style="color: #fff;">TBD frames</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">\u251C</span> Attack: <span style="color: #fff;">0</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">\u2514</span> Time to kill: <span style="color: #fff;">TBD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                \`;
                
                container.appendChild(card);
            }
        });
    }
    
    if (foundSkills === 0) {
        container.innerHTML += \`<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>\`;
    }
}
`;

// Insert the function at the end of app.js
if (!app.includes("function renderCalcSkills()")) {
    app += "\n\n" + renderFunc;
}

// Hook it into calculate() if not already there
if (app.includes("function calculate() {") && !app.includes("renderCalcSkills();")) {
    app = app.replace("function calculate() {", "function calculate() {\n    if (typeof renderCalcSkills === 'function') renderCalcSkills();");
}

fs.writeFileSync('app.js', app);
console.log('Successfully injected renderCalcSkills');
