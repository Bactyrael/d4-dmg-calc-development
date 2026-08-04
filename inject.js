const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let idx = lines.findIndex(l => l.includes('if (foundSkills === 0) {'));

if (idx > -1) {
    let injection = `    let playerThornsVal = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Thorns']) ? window.D4_COMPILED_STATS['Thorns'].final : 0;
    if (playerThornsVal > 0) {
        foundSkills++;
        const card = document.createElement('div');
        card.className = 'd4-panel calc-skill-card';
        card.style.background = 'rgba(20,20,25,0.9)';
        card.style.border = '1px solid #334';
        card.style.borderRadius = '8px';
        card.style.padding = '20px';
        card.style.marginBottom = '15px';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';

        let thornsSkillObj = {
            name: 'Player Thorns',
            tags: ['Thorns', 'Physical', 'Damage'],
            damageType: 'Physical',
            isHit: true
        };
        let bThorns = getSkillDamageBreakdown(thornsSkillObj, 1, true);
        
        let thornsDamage = Math.floor(playerThornsVal * bThorns.mainStatMult * bThorns.additiveMult * bThorns.multiMult);
        let addStrThorns = Number(((bThorns.additiveMult - 1) * 100).toFixed(6));
        
        card.innerHTML = \`
          <div style="display: flex; align-items: flex-start; gap: 15px;">
            <div style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888; font-size: 24px;">🌵</div>
            <div style="flex: 1;">
              <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; align-items: center;">
                <span style="flex: 1;">Player Thorns</span>
                <span style="color: #c9a55c; font-size: 1.3rem;">\${thornsDamage.toLocaleString()}</span>
              </h3>
              
              <div style="margin-top: 10px; font-size: 0.9em;">
                <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                  <span style="color: #555;">└</span> Base Thorns: <span style="color: #fff;">\${playerThornsVal.toLocaleString()}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                  <span style="color: #555;">└</span> \${bThorns.mainStatName} Multiplier: <span style="color: #fff;">x\${Number(bThorns.mainStatMult.toFixed(6))}</span>
                </div>
                
                <div style="margin-bottom: 3px;">
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (\${addStrThorns}%)</span>
                  </div>
                  \${(bThorns.additiveComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> \${comp.name}: +\${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>\`).join('')}
                </div>
                
                <div style="margin-bottom: 3px;">
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x\${Number(bThorns.multiMult.toFixed(6))}</span>
                  </div>
                  \${(bThorns.multiplicativeComponents || []).map(comp => \`<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> \${comp.name.replace('Skill: ', '')}: x\${Number(comp.value.toFixed(6))}</div>\`).join('')}
                </div>
              </div>
            </div>
          </div>
        \`;
        container.appendChild(card);
    }`;

    lines.splice(idx, 0, injection);
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully injected Player Thorns code.');
} else {
    console.log('Could not find insertion point.');
}
