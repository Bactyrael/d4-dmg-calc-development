const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

const targetStr = `window.showNodeDetails = function(nodeId, slotIndex = 0) {`;
const replaceStr = `window.renderGlyphTooltip = function(glyphId, level) {
    if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) return "";
    let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
    if (!g) return "";
    
    let color = g.rarity === 1 ? '#3498db' : (g.rarity === 2 ? '#f1c40f' : '#e67e22');
    
    let html = \`<div style="font-family: Arial, sans-serif; min-width: 250px;">
        <div style="text-align: center; margin-bottom: 12px;">
            <h3 style="margin: 0; color: \${color}; font-size: 1.3rem; text-shadow: 1px 1px 2px #000;">\${g.name}</h3>
            <div style="color: #c9a55c; font-size: 0.9rem; margin-top: 4px;">Glyph Level \${level}</div>
        </div>
        <div style="height: 1px; background: #444; margin: 10px 0;"></div>
        <div style="font-size: 0.95rem; line-height: 1.4; color: #ddd;">\`;
        
    if (g.affixes && g.affixes.length > 0) {
        g.affixes.forEach(affixKey => {
            let affixData = window.D4_PARAGON_DATA.paragonGlyphAffixes[affixKey];
            if (affixData) {
                let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
                if (affixData.displayFactor) val = val / affixData.displayFactor;
                
                let desc = affixData.desc || "";
                
                // Parse {c_number}+[{GlyphAffixScalar}|1%|]{/c}
                // We'll just replace the whole placeholder with the formatted number
                desc = desc.replace(/\\{c_[^}]+\\}/g, '<span style="color: #fff; font-weight: bold;">');
                desc = desc.replace(/\\{\\/c\\}/g, '</span>');
                
                desc = desc.replace(/\\[[^\\]]+\\]/g, (match) => {
                    if (match.includes('%')) {
                        // format to 1 decimal if needed
                        return (val % 1 !== 0 ? val.toFixed(1) : val) + "%";
                    }
                    return val % 1 !== 0 ? val.toFixed(1) : val;
                });
                
                let isLegendary = !affixData.formula; // Usually legendary power lacks formula
                let bulletColor = isLegendary ? '#e67e22' : '#a38a58';
                
                if (isLegendary && level < 46) {
                   html += \`<div style="margin-bottom: 8px; color: #777;">
                     <span style="color: #666; font-size: 1.1rem; vertical-align: top;">&bull;</span> 
                     \${desc} <br><span style="font-size:0.8rem; color:#ff4444;">(Requires Level 46)</span>
                   </div>\`;
                } else {
                   html += \`<div style="margin-bottom: 8px;">
                     <span style="color: \${bulletColor}; font-size: 1.1rem; vertical-align: top;">&bull;</span> 
                     \${desc}
                   </div>\`;
                }
            }
        });
    }
    
    let radius = 3;
    if (level >= 25 && level <= 49) radius = 4;
    else if (level >= 50) radius = 5;
    
    html += \`</div>
        <div style="height: 1px; background: #444; margin: 10px 0;"></div>
        <div style="text-align: center; color: #a38a58; font-size: 0.9rem;">
            Radius Size: \${radius}
        </div>
    </div>\`;
    
    return html;
};

window.showNodeDetails = function(nodeId, slotIndex = 0) {`;

code = code.replace(targetStr, replaceStr);

const tooltipOverrideTarget = `      let html = \`<div style="font-family: Arial, sans-serif; min-width: 200px;">`;
const tooltipOverrideReplace = `      let pData = currentBuild.paragon[slotIndex];
      if (nData.socket && pData && pData.glyph && pData.glyph.id) {
          detailsDiv.innerHTML = window.renderGlyphTooltip(pData.glyph.id, pData.glyph.level || 1);
          return;
      }
      
      let html = \`<div style="font-family: Arial, sans-serif; min-width: 200px;">`;

code = code.replace(tooltipOverrideTarget, tooltipOverrideReplace);

const modalHoverTarget = `        card.addEventListener('click', () => {`;
const modalHoverReplace = `        card.addEventListener('mouseenter', () => {
            const detailsDiv = document.getElementById('paragon-node-details');
            if (detailsDiv) {
                let lvl = parseInt(document.getElementById('paragon-glyph-level-slider').value) || 1;
                detailsDiv.innerHTML = window.renderGlyphTooltip(g.id, lvl);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const detailsDiv = document.getElementById('paragon-node-details');
            if (detailsDiv) detailsDiv.innerHTML = '<div style="color: #666; font-style: italic; text-align: center; margin-top: 50px;">Hover over a node to see details</div>';
        });

        card.addEventListener('click', () => {`;

code = code.replace(modalHoverTarget, modalHoverReplace);

fs.writeFileSync('paragon_logic.js', code);
console.log('Tooltip logic successfully patched.');
