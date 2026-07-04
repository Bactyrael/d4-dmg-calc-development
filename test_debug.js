
const fs = require('fs');
global.window = {};
eval(fs.readFileSync('assets/paragon.js', 'utf8'));
window.getGlyphStatsInRadius = function getGlyphStatsInRadius(slotIndex, glyphData) {
      const stats = { Strength: 0, Dexterity: 0, Intelligence: 0, Willpower: 0 };
      if (!currentBuild || !currentBuild.paragon || !currentBuild.paragon[slotIndex]) return stats;
      const pData = currentBuild.paragon[slotIndex];
      if (!pData.boardId || !pData.nodes) return stats;
      
      const bData = window.D4_PARAGON_DATA?.paragonBoards?.[pData.boardId.replace(/\\/g, '')];
      if (!bData || !bData.nodes) return stats;
      
      const socketDataIdx = bData.nodes.findIndex(n => n && n.toLowerCase().includes('socket'));
      if (socketDataIdx === -1) return stats;
      
      const sX = socketDataIdx % 21;
      const sY = Math.floor(socketDataIdx / 21);
      
      const lvl = glyphData.level || 1;
      let radius = 3;
      if (lvl >= 25 && lvl <= 49) radius = 4;
      else if (lvl >= 50) radius = 5;
      
      pData.nodes.forEach(nIdx => {
          const nX = nIdx % 21;
          const nY = Math.floor(nIdx / 21);
          const dist = Math.abs(nX - sX) + Math.abs(nY - sY);
          
          if (dist <= radius) {
              const nodeName = bData.nodes[nIdx];
              if (nodeName) {
                  const nData = window.D4_PARAGON_DATA.paragonNodes[nodeName];
                  if (nData && nData.attributes) {
                      nData.attributes.forEach(attr => {
                          if (attr.value !== undefined) {
                              if (attr.id === 9 || attr.id === 18) stats.Strength += attr.value;
                              else if (attr.id === 10 || attr.id === 19) stats.Intelligence += attr.value;
                              else if (attr.id === 11 || attr.id === 20) stats.Willpower += attr.value;
                              else if (attr.id === 12 || attr.id === 21) stats.Dexterity += attr.value;
                          } else if (attr.formula && attr.formula.includes('CoreStat') && nData.tags) {
                              let sMap = { 'search_strength': 'Strength', 'search_intelligence': 'Intelligence', 'search_willpower': 'Willpower', 'search_dexterity': 'Dexterity' };
                              let tagLower = nData.tags.map(t => t.toLowerCase());
                              let s = Object.keys(sMap).find(t => tagLower.includes(t));
                              if (s) {
                                  let val = 10;
                                  if (attr.formula.includes('Magic')) val = 7;
                                  else if (attr.formula.includes('Normal')) val = 5;
                                  stats[sMap[s]] += val; console.log(nodeName, val);
                              }
                          }
                      });
                  } else {
                      if (nodeName.toLowerCase().includes('_str')) stats.Strength += 5;
                      if (nodeName.toLowerCase().includes('_int')) stats.Intelligence += 5;
                      if (nodeName.toLowerCase().includes('_will')) stats.Willpower += 5;
                      if (nodeName.toLowerCase().includes('_dex')) stats.Dexterity += 5; console.log(nodeName, 5);
                  }
              }
          }
      });
      return stats;
  }

  
const currentBuild = {paragon: {0: {boardId: 'Paragon_Necro_00', nodes: []}}};
global.currentBuild = currentBuild;
const bData = window.D4_PARAGON_DATA.paragonBoards['Paragon_Necro_00'];
for(let i=0; i<441; i++) { if(bData.nodes[i]) currentBuild.paragon[0].nodes.push(i); }
console.log(window.getGlyphStatsInRadius(0, {level: 15}));
