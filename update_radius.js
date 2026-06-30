const fs = require('fs');

// --- APP.JS UPDATE ---
let appCode = fs.readFileSync('app.js', 'utf8');

// 1. Delete old getAdditionalBonusValues & getLegendaryBonusValues
const getAdditionalStart = appCode.indexOf('function getAdditionalBonusValues() {');
const getEquipmentStart = appCode.indexOf('function getEquipmentValues() {');

if (getAdditionalStart !== -1 && getEquipmentStart !== -1) {
    const before = appCode.substring(0, getAdditionalStart);
    const after = appCode.substring(getEquipmentStart);
    appCode = before + `
  function getGlyphStatsInRadius(slotIndex, glyphData) {
      const stats = { Strength: 0, Dexterity: 0, Intelligence: 0, Willpower: 0 };
      if (!currentBuild || !currentBuild.paragon || !currentBuild.paragon[slotIndex]) return stats;
      const pData = currentBuild.paragon[slotIndex];
      if (!pData.boardId || !pData.nodes) return stats;
      
      const bData = window.D4_PARAGON_DATA?.paragonBoards?.[pData.boardId.replace(/\\\\/g, '')];
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
                          if (attr.id === 9 || attr.id === 18) stats.Strength += attr.value;
                          else if (attr.id === 10 || attr.id === 19) stats.Intelligence += attr.value;
                          else if (attr.id === 11 || attr.id === 20) stats.Willpower += attr.value;
                          else if (attr.id === 12 || attr.id === 21) stats.Dexterity += attr.value;
                      });
                  } else {
                      // Fallback for datamine misses
                      if (nodeName.toLowerCase().includes('_str')) stats.Strength += 5;
                      if (nodeName.toLowerCase().includes('_int')) stats.Intelligence += 5;
                      if (nodeName.toLowerCase().includes('_will')) stats.Willpower += 5;
                      if (nodeName.toLowerCase().includes('_dex')) stats.Dexterity += 5;
                  }
              }
          }
      });
      
      return stats;
  }

  function getAdditionalBonusValues() {
      const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
      const classData = CLASS_PARAGON_DATA[selectedClass];
      const vals = [];
      if (currentBuild && currentBuild.paragon) {
          for (let i = 0; i < 5; i++) {
              let pData = currentBuild.paragon[i];
              if (pData && pData.glyph && pData.glyph.id) {
                  let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                  if (gData && classData && classData.addBonuses) {
                      let gName = gData.name;
                      let glyphInfo = classData.addBonuses.find(g => g.label.startsWith(gName));
                      
                      let meetsReq = false;
                      let hasThresholdData = false;
                      if (gData.affixes) {
                          for (let affixKey of gData.affixes) {
                              let affixInfo = window.D4_PARAGON_DATA.paragonGlyphAffixes?.[affixKey];
                              if (affixInfo && affixInfo.thresholds && affixInfo.thresholds.length > 0) {
                                  let tData = window.D4_PARAGON_DATA.paragonThresholds?.[affixInfo.thresholds[0]];
                                  if (tData && tData.attributes && tData.attributes.length > 0) {
                                      hasThresholdData = true;
                                      let reqAttrId = tData.attributes[0].id;
                                      let reqVal = tData.attributes[0].value;
                                      
                                      let currentStats = getGlyphStatsInRadius(i, pData.glyph);
                                      let curVal = 0;
                                      if (reqAttrId === 9 || reqAttrId === 18) curVal = currentStats.Strength;
                                      else if (reqAttrId === 10 || reqAttrId === 19) curVal = currentStats.Intelligence;
                                      else if (reqAttrId === 11 || reqAttrId === 20) curVal = currentStats.Willpower;
                                      else if (reqAttrId === 12 || reqAttrId === 21) curVal = currentStats.Dexterity;
                                      
                                      if (curVal >= reqVal) meetsReq = true;
                                  }
                              }
                          }
                      }
                      
                      if (glyphInfo && meetsReq) {
                          vals.push(glyphInfo.value === 'custom' ? 0 : glyphInfo.value);
                      } else {
                          vals.push(0);
                      }
                  } else {
                      vals.push(0);
                  }
              } else {
                  vals.push(0);
              }
          }
      } else {
          vals.push(0,0,0,0,0);
      }
      return vals;
  }

  function getLegendaryBonusValues() {
      const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
      const classData = CLASS_PARAGON_DATA[selectedClass];
      const vals = [];
      if (currentBuild && currentBuild.paragon) {
          for (let i = 0; i < 5; i++) {
              let pData = currentBuild.paragon[i];
              if (pData && pData.glyph && pData.glyph.id && pData.glyph.level >= 46) {
                  let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                  if (gData && classData && classData.legBonuses) {
                      let gName = gData.name;
                      let glyphInfo = classData.legBonuses.find(g => g.label === gName);
                      if (glyphInfo) {
                          let min = glyphInfo.min; let max = glyphInfo.max;
                          let rawBonus = min + ((max - min) * ((Math.min(100, pData.glyph.level) - 1) / 149));
                          
                          if (gName === 'Essence') {
                              rawBonus = rawBonus * 0.8;
                          }
                          vals.push(rawBonus);
                      } else {
                          vals.push(0);
                      }
                  } else {
                      vals.push(0);
                  }
              } else {
                  vals.push(0);
              }
          }
      } else {
          vals.push(0,0,0,0,0);
      }
      return vals;
  }

` + after;
}

fs.writeFileSync('app.js', appCode);

// --- PARAGON_LOGIC.JS UPDATE ---
let pCode = fs.readFileSync('paragon_logic.js', 'utf8');

const renderTooltipStart = pCode.indexOf('window.renderGlyphTooltip = function(glyphId, level, slotIndex = -1) {');
if (renderTooltipStart !== -1) {
    // wait, it is currently "window.renderGlyphTooltip = function(glyphId, level) {"
}

let newRenderTooltip = `window.renderGlyphTooltip = function(glyphId, level, slotIndex = -1) {
      if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) return "";
      let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
      if (!g) {
          let found = Object.values(window.D4_PARAGON_DATA.paragonGlyphs).find(glyph => glyph.id == glyphId);
          if (found) g = found;
          else return "";
      }
      
      let gRarity = level >= 46 ? 'Legendary' : 'Rare';
      let color = level >= 46 ? '#e67e22' : '#f1c40f';
      
      let html = \`<div style="font-family: Arial, sans-serif; width: 100%; box-sizing: border-box;">
          <div style="text-align: center; margin-bottom: 12px;">
              <div style="color: \${color}; font-size: 0.9rem; margin-bottom: 2px;">\${gRarity} Glyph</div>
              <h3 style="margin: 0; color: \${color}; font-size: 1.3rem; text-shadow: 1px 1px 2px #000;">\${g.name}</h3>
              <div style="color: #ddd; font-weight: bold; font-size: 0.9rem; margin-top: 4px; border-bottom: 1px solid #444; padding-bottom: 4px;">LEVEL \${level}</div>
          </div>\`;
          
      let radius = 3;
      if (level >= 25 && level <= 49) radius = 4;
      else if (level >= 50) radius = 5;
      
      html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-bottom: 4px;">Radius Size: <span style="color: #fff;">\${radius}</span></div>\`;
      if (radius === 5) {
          html += \`<div style="color: #e67e22; font-size: 0.85rem; margin-bottom: 10px;">&bull; Radius size is at max.</div>\`;
      }
      
      let formatDesc = (desc, val) => {
          if (!desc) return "";
          let d = desc.replace(/\\{c_[^}]+\\}/g, '<span style="color: #fff; font-weight: bold;">');
          d = d.replace(/\\{\\/c\\}/g, '</span>');
          d = d.replace(/\\{.*?\\}/g, val);
          return d;
      };
      
      let addBonus = "";
      let reqs = [];
      let thresholdAttrId = -1;
      let thresholdReqVal = 0;
      
      if (g.affixes) {
          g.affixes.forEach(affixKey => {
              let affixData = window.D4_PARAGON_DATA.paragonGlyphAffixes[affixKey];
              if (!affixData) return;
              
              let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
              
              const hotfixMultipliers = {
                  'Control': 2/3,
                  'Darkness': 2/3,
                  'Exhumation': 2/3,
                  'Mage': 2/3,
                  'Scourge': 0.7
              };
              
              if (hotfixMultipliers[g.name] && affixData.operation === 2) {
                  val = val * hotfixMultipliers[g.name];
              }
  
              if (affixData.operation === 1) val = val / 10;
              if (affixData.operation === 2) val = val / 1000;
              
              let valStr = val % 1 === 0 ? val.toString() : val.toFixed(1);
              
              if (affixData.operation !== 5) {
                  html += \`<div style="color: #ddd; font-size: 0.9rem; margin-bottom: 8px;">\${formatDesc(affixData.desc, valStr)}</div>\`;
              }
              
              if (affixData.thresholds && affixData.thresholds.length > 0) {
                  let tData = window.D4_PARAGON_DATA.paragonThresholds[affixData.thresholds[0]];
                  if (tData && tData.attributes) {
                      tData.attributes.forEach(a => {
                          let attrName = "Stat";
                          if (a.id === 12 || a.id === 21) attrName = "Dexterity";
                          if (a.id === 9 || a.id === 18) attrName = "Strength";
                          if (a.id === 10 || a.id === 19) attrName = "Intelligence";
                          if (a.id === 11 || a.id === 20) attrName = "Willpower";
                          reqs.push(\`Requires \${a.value} \${attrName}\`);
                          thresholdAttrId = a.id;
                          thresholdReqVal = a.value;
                      });
                  }
                  if (affixData.power) {
                      let pData = window.D4_PARAGON_DATA.paragonPowers?.[affixData.power];
                      if (!pData) {
                          // Try searching strings if power is missing
                          if (affixData.desc) addBonus = formatDesc(affixData.desc, valStr);
                      }
                  } else if (affixData.desc) {
                      addBonus = formatDesc(affixData.desc, valStr);
                  }
              }
          });
      }
      
      if (addBonus) {
          html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 12px; margin-bottom: 4px;">Additional Bonus:</div>\`;
          html += \`<div style="color: #ddd; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #a38a58;">&bull;</span> \${addBonus}</div>\`;
      }
      
      if (reqs && reqs.length > 0) {
          html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Requirements:</div>\`;
          html += \`<div style="color: #999; font-size: 0.8rem; margin-bottom: 4px;">(purchased in radius range)</div>\`;
          reqs.forEach(r => {
              let statusText = "";
              let colorText = "#aaa";
              if (slotIndex !== -1 && window.getGlyphStatsInRadius) {
                  let currentStats = window.getGlyphStatsInRadius(slotIndex, {id: glyphId, level: level});
                  let curVal = 0;
                  if (thresholdAttrId === 9 || thresholdAttrId === 18) curVal = currentStats.Strength;
                  else if (thresholdAttrId === 10 || thresholdAttrId === 19) curVal = currentStats.Intelligence;
                  else if (thresholdAttrId === 11 || thresholdAttrId === 20) curVal = currentStats.Willpower;
                  else if (thresholdAttrId === 12 || thresholdAttrId === 21) curVal = currentStats.Dexterity;
                  
                  let isMet = curVal >= thresholdReqVal;
                  statusText = \` <span style="color: \${isMet ? '#4cd137' : '#e74c3c'}; font-weight:bold;">(Current: \${curVal} / \${thresholdReqVal})</span>\`;
                  if (isMet) colorText = "#4cd137";
              }
              html += \`<div style="color: \${colorText}; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #666;">&bull;</span> \${r}\${statusText}</div>\`;
          });
      }
      
      html += \`</div>\`;
      return html;
  };`;

// Replace renderGlyphTooltip in paragon_logic.js
pCode = pCode.replace(/window\.renderGlyphTooltip = function\(glyphId, level\) \{[\s\S]*?return html;\n  \};/, newRenderTooltip);
// Make sure we pass slotIndex when calling renderGlyphTooltip
pCode = pCode.replace(/window\.renderGlyphTooltip\(pData\.glyph\.id, pData\.glyph\.level \|\| 1\);/, 'window.renderGlyphTooltip(pData.glyph.id, pData.glyph.level || 1, slotIndex);');
// For the modal search grid
pCode = pCode.replace(/detailsDiv\.innerHTML = window\.renderGlyphTooltip\(g\.stringKey, lvl\);/, 'detailsDiv.innerHTML = window.renderGlyphTooltip(g.stringKey, lvl, window.activeGlyphSocket.slot);');


fs.writeFileSync('paragon_logic.js', pCode);

