const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

const targetStr = `  activeReachableNodes.visited.forEach(nodeStr => {`;
const replacement = `  let glyphsActive = [];
  
  for (let s = 0; s < 5; s++) {
      let pData = currentBuild.paragon[s];
      if (pData && pData.boardId && pData.glyph && pData.glyph.id && pData.nodes) {
          let bData = window.D4_PARAGON_DATA.paragonBoards[pData.boardId];
          let socketDataIdx = -1;
          for (let i = 0; i < 441; i++) {
              if (bData && bData.nodes[i] && bData.nodes[i].toLowerCase().includes('socket') && pData.nodes.includes(i)) {
                  socketDataIdx = i;
                  break;
              }
          }
          if (socketDataIdx !== -1) {
              let lvl = pData.glyph.level || 1;
              let radius = 2;
              if (lvl >= 15 && lvl <= 45) radius = 3;
              else if (lvl >= 46) radius = 4;
              
              let socketX = socketDataIdx % 21;
              let socketY = Math.floor(socketDataIdx / 21);
              
              glyphsActive.push({ slotId: s, id: pData.glyph.id, level: lvl, radius: radius, x: socketX, y: socketY });
          }
      }
  }

  activeReachableNodes.visited.forEach(nodeStr => {`;

code = code.replace(targetStr, replacement);

const targetReturnStr = `  return stats;
};`;
const replaceReturnStr = `  // Evaluate Glyph Affixes
  glyphsActive.forEach(g => {
      let glyphData = window.D4_PARAGON_DATA.paragonGlyphs[g.id];
      if (!glyphData || !glyphData.affixes) return;
      
      let pData = currentBuild.paragon[g.slotId];
      let bData = window.D4_PARAGON_DATA.paragonBoards[pData.boardId];
      
      // Tally nodes in range
      let nodesInRange = [];
      let totalInt = 0, totalDex = 0, totalStr = 0, totalWill = 0;
      
      if (pData.nodes && bData) {
          pData.nodes.forEach(dataIdx => {
              let nx = dataIdx % 21;
              let ny = Math.floor(dataIdx / 21);
              let dist = Math.max(Math.abs(nx - g.x), Math.abs(ny - g.y));
              
              if (dist <= g.radius && dist > 0) {
                  nodesInRange.push(dataIdx);
                  
                  // Check stats
                  let nodeName = bData.nodes[dataIdx];
                  let nodeInfo = window.D4_PARAGON_DATA.paragonNodes[nodeName];
                  if (nodeInfo && nodeInfo.attributes) {
                      nodeInfo.attributes.forEach(attrIdx => {
                          let attr = nodeInfo.attributes ? (nodeInfo.attributes[attrIdx] || attrIdx) : attrIdx;
                          let attrId = attr.id !== undefined ? attr.id : attr;
                          let attrMeta = window.D4_PARAGON_FORMULAS.attributes[attrId];
                          if (attrMeta && attrMeta.name) {
                              let n = attrMeta.name.toLowerCase();
                              let val = attr.value || 5; // simplified assumption for normal nodes
                              if (n.includes('intelligence')) totalInt += val;
                              else if (n.includes('dexterity')) totalDex += val;
                              else if (n.includes('strength')) totalStr += val;
                              else if (n.includes('willpower')) totalWill += val;
                          }
                      });
                  }
              }
          });
      }
      
      glyphData.affixes.forEach(affixKey => {
          let affixData = window.D4_PARAGON_DATA.paragonGlyphAffixes[affixKey];
          if (!affixData) return;
          
          let powerVal = (affixData.base || 0) + ((affixData.perLevel || 0) * (g.level - 1));
          
          if (affixData.formula && affixData.formula.includes('StatMain')) {
              let statTally = 0;
              let tags = affixData.tags || [];
              if (tags.includes('Search_Intelligence')) statTally = totalInt;
              else if (tags.includes('Search_Dexterity')) statTally = totalDex;
              else if (tags.includes('Search_Strength')) statTally = totalStr;
              else if (tags.includes('Search_Willpower')) statTally = totalWill;
              
              let mult = Math.floor(statTally / 5);
              let finalVal = powerVal * mult;
              
              if (finalVal > 0 && tags.length > 1) {
                  let statName = tags.find(t => t.startsWith('Search_') && !t.includes('Intelligence') && !t.includes('Dexterity') && !t.includes('Strength') && !t.includes('Willpower'));
                  if (statName) {
                      let niceName = statName.replace('Search_', '') + " (Glyph)";
                      stats[niceName] = (stats[niceName] || 0) + finalVal;
                  } else {
                      stats[affixKey] = (stats[affixKey] || 0) + finalVal;
                  }
              }
          }
      });
  });

  return stats;
};`;

code = code.replace(targetReturnStr, replaceReturnStr);

fs.writeFileSync('paragon_logic.js', code);
console.log('Patch 3 complete.');
