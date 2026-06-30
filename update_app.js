const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Replace getAdditionalBonusEls (remove it entirely)
code = code.replace(/function getAdditionalBonusEls\(\) \{[\s\S]*?\}\n/, '');

// Replace getAdditionalBonusValues
code = code.replace(/function getAdditionalBonusValues\(\) \{[\s\S]*?return vals;\n  \}/, `function getAdditionalBonusValues() {
    const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
    const classData = CLASS_PARAGON_DATA[selectedClass];
    const vals = [];
    if (window.currentBuild && window.currentBuild.paragon) {
        for (let i = 0; i < 5; i++) {
            let pData = window.currentBuild.paragon[i];
            if (pData && pData.glyph && pData.glyph.id) {
                let gData = window.D4_PARAGON_DATA.paragonGlyphs[pData.glyph.id];
                if (gData && classData && classData.addBonuses) {
                    let gName = gData.name;
                    let glyphInfo = classData.addBonuses.find(g => g.label.startsWith(gName));
                    if (glyphInfo) {
                        vals.push(glyphInfo.value);
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
  }`);

// Replace getLegendaryBonusValues
code = code.replace(/function getLegendaryBonusValues\(\) \{[\s\S]*?return vals;\n  \}/, `function getLegendaryBonusValues() {
    const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
    const classData = CLASS_PARAGON_DATA[selectedClass];
    const vals = [];
    if (window.currentBuild && window.currentBuild.paragon) {
        for (let i = 0; i < 5; i++) {
            let pData = window.currentBuild.paragon[i];
            if (pData && pData.glyph && pData.glyph.id && pData.glyph.level >= 46) {
                let gData = window.D4_PARAGON_DATA.paragonGlyphs[pData.glyph.id];
                if (gData && classData && classData.legBonuses) {
                    let gName = gData.name;
                    let glyphInfo = classData.legBonuses.find(g => g.label === gName);
                    if (glyphInfo) {
                        let min = glyphInfo.min; let max = glyphInfo.max;
                        vals.push(min + (max - min) * (Math.min(100, pData.glyph.level) / 100));
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
  }`);

// Replace getNodeEls
code = code.replace(/function getNodeEls\(\) \{[\s\S]*?return \[[\s\S]*?\];\n  \}/, `function getNodeEls() {
    // Legacy function, replaced by dynamic board nodes
    return [null, null, null, null];
  }`);

// Clean up calculateDamage
code = code.replace(/const nodeEls = getNodeEls\(\);/, 'const nodeEls = []; // Replaced by dynamic nodes');
code = code.replace(/const nodeElsSave = getNodeEls\(\);[\s\S]*?return \{ name: 'Castle', value: customInp \? parseFloat\(customInp\.value\) \|\| 0 : 0 \};\n        \}\n        return el \? parseFloat\(el\.value\) \|\| 0 : 0;\n      \}\);/, '');

code = code.replace(/renderAdditionalBonusInputs[\s\S]*?calculate\(\);\n  \}/, '');
code = code.replace(/renderLegendaryBonusInputs[\s\S]*?calculate\(\);\n  \}/, '');
code = code.replace(/function updateAdditionalBonusDropdowns[\s\S]*?\}\n  \}/, '');

code = code.replace(/renderAdditionalBonusInputs\(.*?\);/g, '');
code = code.replace(/renderLegendaryBonusInputs\(.*?\);/g, '');
code = code.replace(/renderNodeInputs\(.*?\);/g, '');

code = code.replace(/const currentNodes = getNodeEls\(\)\.map.*?;\n/, '');

// Find where staticMults is calculated for nodes, and rewrite it to read from currentBuild.paragon nodes
code = code.replace(/if \(\!hasInteractiveBoard\) \{[\s\S]*?\}\n/, `
      // Add Legendary Node multipliers dynamically from the interactive board
      if (hasInteractiveBoard && window.D4_PARAGON_DATA && CLASS_PARAGON_DATA[b.class || 'Barbarian']) {
          const cData = CLASS_PARAGON_DATA[b.class || 'Barbarian'];
          for (let i = 0; i < 5; i++) {
              let pData = currentBuild.paragon[i];
              if (pData && pData.nodes) {
                  pData.nodes.forEach(nIdx => {
                      let nodeName = window.D4_PARAGON_DATA.paragonBoards[pData.boardId]?.nodes[nIdx];
                      if (nodeName) {
                          let nData = window.D4_PARAGON_DATA.paragonNodes[nodeName];
                          if (nData && nData.rarity === 4) { // Legendary
                              let legNodeInfo = cData.nodes.find(n => n.label.startsWith(nData.name));
                              if (legNodeInfo && legNodeInfo.value !== 'custom') {
                                  staticMults.push(legNodeInfo.value);
                              }
                          }
                      }
                  });
              }
          }
      }
`);

fs.writeFileSync('app.js', code);
