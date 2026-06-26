const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. autoStats
code = code.replace(
`    const autoStats = {
        strength: baseStats.str + levelBonus,
        intelligence: baseStats.int + levelBonus,
        willpower: baseStats.will + levelBonus,
        dexterity: baseStats.dex + levelBonus,
        maximumLife: dom.maxLife ? parseFloat(dom.maxLife.value) || 0 : 0
    };`,
`    const autoStats = {
        strength: baseStats.str + levelBonus,
        intelligence: baseStats.int + levelBonus,
        willpower: baseStats.will + levelBonus,
        dexterity: baseStats.dex + levelBonus,
        baseStr: baseStats.str, levelStr: levelBonus,
        baseInt: baseStats.int, levelInt: levelBonus,
        baseWill: baseStats.will, levelWill: levelBonus,
        baseDex: baseStats.dex, levelDex: levelBonus,
        maximumLife: dom.maxLife ? parseFloat(dom.maxLife.value) || 0 : 0
    };`);

// 2. addStat function
code = code.replace(
`  function addStat(stats, rawName, value) {
      if (!rawName) return;
      let cleanName = rawName.replace(/\\[.*?\\]\\s*/, '').replace(/^[\\+\\-]\\s*/, '').trim();
      stats[cleanName] = (stats[cleanName] || 0) + value;
  }`,
`  function addStat(stats, rawName, value, sourceName = 'Equipment') {
      if (!rawName) return;
      let cleanName = rawName.replace(/\\[.*?\\]\\s*/, '').replace(/^[\\+\\-]\\s*/, '').trim();
      
      if (!stats[cleanName]) {
          stats[cleanName] = { 
              total: 0, 
              final: 0,
              flatSources: [], 
              pctSources: [] 
          };
      }
      
      let targetList = stats[cleanName].flatSources;
      let existingSource = targetList.find(s => s.name === sourceName);
      if (existingSource) {
          existingSource.val += value;
      } else {
          targetList.push({ name: sourceName, val: value });
      }
      
      stats[cleanName].total += value;
      stats[cleanName].final = stats[cleanName].total;
  }`);

// 3. compileCharacterStats init
code = code.replace(
`  function compileCharacterStats(equipped, autoStats) {
      const stats = {};
      
      stats['Strength'] = autoStats.strength;
      stats['Intelligence'] = autoStats.intelligence;
      stats['Willpower'] = autoStats.willpower;
      stats['Dexterity'] = autoStats.dexterity;
      stats['Maximum Life'] = autoStats.maximumLife;
      
      if (!equipped) return stats;`,
`  function compileCharacterStats(equipped, autoStats) {
      const stats = {};
      
      addStat(stats, 'Strength', autoStats.baseStr, 'Base');
      addStat(stats, 'Strength', autoStats.levelStr, 'Level');
      addStat(stats, 'Intelligence', autoStats.baseInt, 'Base');
      addStat(stats, 'Intelligence', autoStats.levelInt, 'Level');
      addStat(stats, 'Willpower', autoStats.baseWill, 'Base');
      addStat(stats, 'Willpower', autoStats.levelWill, 'Level');
      addStat(stats, 'Dexterity', autoStats.baseDex, 'Base');
      addStat(stats, 'Dexterity', autoStats.levelDex, 'Level');
      addStat(stats, 'Maximum Life', autoStats.maximumLife, 'Base');
      
      if (!equipped) return stats;`);

// 4. Equipment loop replacements
code = code.replace(`addStat(stats, 'Base Armor', baseItem.armor * baseQMult);`, `addStat(stats, 'Base Armor', baseItem.armor * baseQMult, slotName);`);
code = code.replace(`addStat(stats, 'Base Weapon Damage', avgDmg * baseQMult);`, `addStat(stats, 'Base Weapon Damage', avgDmg * baseQMult, slotName);`);
code = code.replace(`addStat(stats, 'Resistance to All Elements', baseItem.resistance * baseQMult);`, `addStat(stats, 'Resistance to All Elements', baseItem.resistance * baseQMult, slotName);`);

code = code.replace(`addStat(stats, affixName, v * qMult);`, `addStat(stats, affixName, v * qMult, slotName);`);
code = code.replace(`addStat(stats, temperName, v * qMult);`, `addStat(stats, temperName, v * qMult, slotName);`);
code = code.replace(`addStat(stats, tName, v * qMult);`, `addStat(stats, tName, v * qMult, slotName);`);
code = code.replace(`addStat(stats, name, v);`, `addStat(stats, name, v, slotName + ' (Gem)');`);

// 5. Post compilation logic
code = code.replace(
`      // Combine Base Armor into Armor
      if (stats['Base Armor']) {
          stats['Armor'] = (stats['Armor'] || 0) + stats['Base Armor'];
          delete stats['Base Armor'];
      }
      
      // Post-Compilation Step: Additive Percent Modifiers
      const additiveScalers = [
          { flat: 'Strength', pct: ['% Strength'] },
          { flat: 'Intelligence', pct: ['% Intelligence'] },
          { flat: 'Willpower', pct: ['% Willpower'] },
          { flat: 'Dexterity', pct: ['% Dexterity'] },
          { flat: 'Maximum Life', pct: ['% Maximum Life'] },
          { flat: 'Armor', pct: ['% Armor', '% Total Armor'] }
      ];

      additiveScalers.forEach(scaler => {
          if (stats[scaler.flat] !== undefined) {
              let totalPct = 0;
              scaler.pct.forEach(pctKey => {
                  if (stats[pctKey]) {
                      totalPct += stats[pctKey];
                      delete stats[pctKey]; // Remove so it doesn't double-display
                  }
              });
              if (totalPct !== 0) {
                  stats[scaler.flat] = stats[scaler.flat] * (1 + (totalPct / 100));
              }
          }
      });
      
      return stats;`,
`      // Distribute All Stats
      if (stats['All Stats']) {
          const allStatsObj = stats['All Stats'];
          const coreStats = ['Strength', 'Intelligence', 'Willpower', 'Dexterity'];
          coreStats.forEach(core => {
              if (!stats[core]) stats[core] = { total: 0, final: 0, flatSources: [], pctSources: [] };
              allStatsObj.flatSources.forEach(src => {
                  let existingSource = stats[core].flatSources.find(s => s.name === src.name);
                  if (existingSource) existingSource.val += src.val;
                  else stats[core].flatSources.push({ name: src.name, val: src.val });
                  stats[core].total += src.val;
                  stats[core].final += src.val;
              });
          });
          delete stats['All Stats'];
      }

      // Combine Base Armor into Armor
      if (stats['Base Armor']) {
          if (!stats['Armor']) stats['Armor'] = { total: 0, final: 0, flatSources: [], pctSources: [] };
          stats['Base Armor'].flatSources.forEach(src => {
              let existingSource = stats['Armor'].flatSources.find(s => s.name === src.name);
              if (existingSource) existingSource.val += src.val;
              else stats['Armor'].flatSources.push({ name: src.name, val: src.val });
              stats['Armor'].total += src.val;
              stats['Armor'].final += src.val;
          });
          delete stats['Base Armor'];
      }
      
      // Post-Compilation Step: Additive Percent Modifiers
      const additiveScalers = [
          { flat: 'Strength', pct: ['% Strength'] },
          { flat: 'Intelligence', pct: ['% Intelligence'] },
          { flat: 'Willpower', pct: ['% Willpower'] },
          { flat: 'Dexterity', pct: ['% Dexterity'] },
          { flat: 'Maximum Life', pct: ['% Maximum Life'] },
          { flat: 'Armor', pct: ['% Armor', '% Total Armor'] }
      ];

      additiveScalers.forEach(scaler => {
          if (stats[scaler.flat] !== undefined) {
              let totalPct = 0;
              scaler.pct.forEach(pctKey => {
                  if (stats[pctKey]) {
                      totalPct += stats[pctKey].total;
                      stats[pctKey].flatSources.forEach(src => {
                          stats[scaler.flat].pctSources.push({ name: src.name, val: src.val });
                      });
                      delete stats[pctKey]; // Remove so it doesn't double-display
                  }
              });
              if (totalPct !== 0) {
                  stats[scaler.flat].final = stats[scaler.flat].total * (1 + (totalPct / 100));
              }
          }
      });
      
      return stats;`);

// 6. Fix calculate() mapping of compiled stats to DOM
code = code.replace(
`    if (dom.strength) {
        dom.strength.value = Math.floor(compiledStats['Strength'] || 0);`,
`    if (dom.strength) {
        dom.strength.value = Math.floor(compiledStats['Strength']?.final || 0);`);
code = code.replace(
`    if (dom.intelligence) {
        dom.intelligence.value = Math.floor(compiledStats['Intelligence'] || 0);`,
`    if (dom.intelligence) {
        dom.intelligence.value = Math.floor(compiledStats['Intelligence']?.final || 0);`);
code = code.replace(
`    if (dom.willpower) {
        dom.willpower.value = Math.floor(compiledStats['Willpower'] || 0);`,
`    if (dom.willpower) {
        dom.willpower.value = Math.floor(compiledStats['Willpower']?.final || 0);`);
code = code.replace(
`    if (dom.dexterity) {
        dom.dexterity.value = Math.floor(compiledStats['Dexterity'] || 0);`,
`    if (dom.dexterity) {
        dom.dexterity.value = Math.floor(compiledStats['Dexterity']?.final || 0);`);

fs.writeFileSync('app.js', code);
console.log('Patched app.js successfully');
