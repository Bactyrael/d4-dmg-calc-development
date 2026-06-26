const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

const targetFunction = `  function renderCharacterSheet(stats) {
      const container = document.getElementById('character-sheet-content');
      if (!container) return;
      
      if (Object.keys(stats).length === 0) {
          container.innerHTML = '<div style="color: #777; font-style: italic;">No equipment detected.</div>';
          return;
      }
      
      const categories = {
          'Core Stats': ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'All Stats'],
          'Offensive': ['Damage', 'Critical', 'Vulnerable', 'Attack Speed', 'Overpower'],
          'Defensive': ['Life', 'Armor', 'Resistance', 'Reduction', 'Dodge', 'Block'],
          'Utility': ['Movement', 'Cooldown', 'Resource', 'Essence', 'Healing', 'Lucky Hit']
      };
      
      const grouped = {
          'Core Stats': [],
          'Offensive': [],
          'Defensive': [],
          'Utility': [],
          'Other': []
      };
      
      Object.keys(stats).forEach(statName => {
          let matched = false;
          for (const [cat, keywords] of Object.entries(categories)) {
              if (keywords.some(kw => statName.toLowerCase().includes(kw.toLowerCase()))) {
                  grouped[cat].push({ name: statName, val: stats[statName] });
                  matched = true;
                  break;
              }
          }
          if (!matched) grouped['Other'].push({ name: statName, val: stats[statName] });
      });
      
      let html = '';
      for (const [cat, items] of Object.entries(grouped)) {
          if (items.length === 0) continue;
          
          items.sort((a, b) => b.val - a.val); // sort by value descending
          
          html += \`
          <div style="background: rgba(0,0,0,0.4); border: 1px solid #333; border-radius: 4px; padding: 12px;">
              <h4 style="margin: 0 0 8px 0; color: #d18a45; border-bottom: 1px solid #444; padding-bottom: 4px;">\${cat}</h4>
              <div style="display: flex; flex-direction: column; gap: 4px;">
          \`;
          
          items.forEach(item => {
              let valStr = item.val.toFixed(1).replace(/\\.0$/, '');
              let nameStr = item.name;
              
              if (nameStr.startsWith('%')) {
                  nameStr = nameStr.substring(1).trim();
                  valStr += '%';
              } else if (nameStr.includes('%')) {
                  // already has % inside
              } else if (valStr !== '0') {
                  valStr = '+' + valStr;
              }
              
              html += \`
                  <div style="display: flex; justify-content: space-between;">
                      <span style="color: #ccc;">\${nameStr}</span>
                      <span style="color: #fff; font-weight: bold;">\${valStr}</span>
                  </div>
              \`;
          });
          
          html += \`
              </div>
          </div>
          \`;
      }
      
      container.innerHTML = html;
  }`;

const newFunction = `  function getStatEffects(statName, finalVal) {
      const selectedClass = document.getElementById('class-select')?.textContent || 'Barbarian';
      let effects = [];
      const v = Math.floor(finalVal);
      
      // Basic scaling rules
      // Armor
      if (statName === 'Armor') {
          effects.push(\`Reduces Physical damage taken. Cap is 9230.\`);
      }
      if (statName === 'Maximum Life') {
          effects.push(\`Increases the amount of damage you can take before dying.\`);
      }
      if (statName === 'Resistance to All Elements') {
          effects.push(\`Reduces non-Physical damage taken by +\${v}%.\`);
      }
      
      // Core Stats
      if (statName === 'Strength') {
          if (selectedClass === 'Barbarian') effects.push(\`Increases Skill Damage by +\${(v * 0.1).toFixed(1)}%\`);
          else if (selectedClass === 'Rogue') effects.push(\`Increases Resource Generation by +\${(v * 0.1).toFixed(1)}%\`);
          else effects.push(\`Increases Armor by +\${v}\`);
      }
      if (statName === 'Intelligence') {
          if (selectedClass === 'Sorcerer' || selectedClass === 'Necromancer') effects.push(\`Increases Skill Damage by +\${(v * 0.1).toFixed(1)}%\`);
          else if (selectedClass === 'Rogue') effects.push(\`Increases Critical Strike Chance by +\${(v * 0.02).toFixed(2)}%\`);
          else effects.push(\`Increases Resistance to All Elements by +\${(v * 0.05).toFixed(2)}%\`);
      }
      if (statName === 'Willpower') {
          if (selectedClass === 'Druid') effects.push(\`Increases Skill Damage by +\${(v * 0.1).toFixed(1)}%\`);
          else if (selectedClass === 'Barbarian' || selectedClass === 'Sorcerer' || selectedClass === 'Necromancer') effects.push(\`Increases Resource Generation by +\${(v * 0.1).toFixed(1)}%\`);
          else effects.push(\`Increases Healing Received by +\${(v * 0.1).toFixed(1)}%\`);
      }
      if (statName === 'Dexterity') {
          if (selectedClass === 'Rogue') effects.push(\`Increases Skill Damage by +\${(v * 0.1).toFixed(1)}%\`);
          else if (selectedClass === 'Barbarian' || selectedClass === 'Druid') effects.push(\`Increases Critical Strike Chance by +\${(v * 0.02).toFixed(2)}%\`);
          else effects.push(\`Increases Dodge Chance by +\${(v * 0.025).toFixed(2)}%\`);
      }

      return effects;
  }

  function renderCharacterSheet(stats) {
      const container = document.getElementById('character-sheet-content');
      if (!container) return;
      
      if (Object.keys(stats).length === 0) {
          container.innerHTML = '<div style="color: #777; font-style: italic;">No equipment detected.</div>';
          return;
      }
      
      const categories = {
          'Core Stats': ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'All Stats'],
          'Offensive': ['Damage', 'Critical', 'Vulnerable', 'Attack Speed', 'Overpower'],
          'Defensive': ['Life', 'Armor', 'Resistance', 'Reduction', 'Dodge', 'Block'],
          'Utility': ['Movement', 'Cooldown', 'Resource', 'Essence', 'Healing', 'Lucky Hit']
      };
      
      const grouped = {
          'Core Stats': [],
          'Offensive': [],
          'Defensive': [],
          'Utility': [],
          'Other': []
      };
      
      Object.keys(stats).forEach(statName => {
          let matched = false;
          for (const [cat, keywords] of Object.entries(categories)) {
              if (keywords.some(kw => statName.toLowerCase().includes(kw.toLowerCase()))) {
                  grouped[cat].push({ name: statName, val: stats[statName] });
                  matched = true;
                  break;
              }
          }
          if (!matched) grouped['Other'].push({ name: statName, val: stats[statName] });
      });
      
      let html = '';
      for (const [cat, items] of Object.entries(grouped)) {
          if (items.length === 0) continue;
          
          items.sort((a, b) => b.val.final - a.val.final); // sort by value descending
          
          html += \`
          <div style="background: rgba(0,0,0,0.4); border: 1px solid #333; border-radius: 4px; padding: 12px;">
              <h4 style="margin: 0 0 8px 0; color: #d18a45; border-bottom: 1px solid #444; padding-bottom: 4px;">\${cat}</h4>
              <div style="display: flex; flex-direction: column; gap: 4px;">
          \`;
          
          items.forEach(item => {
              let valObj = item.val;
              let finalVal = valObj.final || 0;
              let totalVal = valObj.total || 0;
              let valStr = finalVal.toFixed(1).replace(/\\.0$/, '');
              let nameStr = item.name;
              
              if (nameStr.startsWith('%')) {
                  nameStr = nameStr.substring(1).trim();
                  valStr += '%';
              } else if (nameStr.includes('%')) {
                  // already has % inside
              } else if (valStr !== '0' && !['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'Armor', 'Maximum Life'].includes(nameStr)) {
                  valStr = '+' + valStr;
              }
              
              // Tooltip Generation
              let tooltipHTML = '';
              const effects = getStatEffects(nameStr, finalVal);
              
              let itemContrib = 0;
              valObj.flatSources.forEach(s => {
                  if (s.name !== 'Base' && s.name !== 'Level' && s.name !== 'Paragon' && s.name !== 'Base & Level') {
                      itemContrib += s.val;
                  }
              });

              tooltipHTML += \`
                  <div class="stat-tooltip">
                      <div class="stat-tooltip-header">
                          <span style="color: #d18a45;">\${nameStr}:</span> 
                          <span style="color: #ffca4a;">\${finalVal.toFixed(0)}</span>
                          \${itemContrib > 0 ? \`<span style="color: #888;"> (Item Contribution: \${itemContrib.toFixed(0)})</span>\` : ''}
                      </div>
                      \${effects.map(e => \`<div class="stat-tooltip-effect">⬥ \${e}</div>\`).join('')}
                      \${effects.length > 0 ? '<hr class="stat-tooltip-divider">' : ''}
              \`;

              // Sum breakdown
              if (valObj.flatSources.length > 0) {
                  tooltipHTML += \`
                      <div class="stat-tooltip-section-title">⬥ Sum: <span style="color: #4cd137;">\${totalVal.toFixed(0)}</span></div>
                  \`;
                  valObj.flatSources.forEach(src => {
                      let color = '#ccc';
                      if (src.name === 'Base' || src.name === 'Level') color = '#888';
                      else if (src.name === 'Paragon') color = '#fbc531';
                      else color = '#3498db'; // blue for equipment

                      tooltipHTML += \`
                          <div class="stat-tooltip-source">
                              <span style="color: \${color};">\⬥ \${src.name}:</span> \${src.val.toFixed(0)}
                          </div>
                      \`;
                  });
              }

              // Increased breakdown
              if (valObj.pctSources && valObj.pctSources.length > 0) {
                  let totalPct = valObj.pctSources.reduce((sum, s) => sum + s.val, 0);
                  tooltipHTML += \`
                      <div class="stat-tooltip-section-title" style="margin-top: 6px;">⬥ Increased: <span style="color: #4cd137;">+\${totalPct.toFixed(1)}%</span></div>
                  \`;
                  valObj.pctSources.forEach(src => {
                      tooltipHTML += \`
                          <div class="stat-tooltip-source">
                              <span style="color: #3498db;">\⬥ \${src.name}:</span> <span style="color: #4cd137;">\${src.val.toFixed(1)}%</span>
                          </div>
                      \`;
                  });
              }

              tooltipHTML += '</div>';

              html += \`
                  <div class="stat-row-hoverable" style="display: flex; justify-content: space-between; position: relative; cursor: help;">
                      <span style="color: #ccc;">\${nameStr}</span>
                      <span style="color: #fff; font-weight: bold;">\${valStr}</span>
                      \${tooltipHTML}
                  </div>
              \`;
          });
          
          html += \`
              </div>
          </div>
          \`;
      }
      
      container.innerHTML = html;
  }`;

if (code.includes('items.sort((a, b) => b.val - a.val);')) {
    code = code.replace(targetFunction, newFunction);
    fs.writeFileSync('app.js', code);
    console.log('Replaced renderCharacterSheet successfully.');
} else {
    console.log('Target function not found. Something is wrong.');
}
