const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

// We are going to replace window.renderGlyphTooltip completely.
const regex = /window\.renderGlyphTooltip = function[\s\S]*?(?=window\.calculateParagonStats)/;

const newTooltip = `window.renderGlyphTooltip = function(glyphId, level) {
    if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) return "";
    let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
    if (!g) {
        let found = Object.values(window.D4_PARAGON_DATA.paragonGlyphs).find(glyph => glyph.id == glyphId);
        if (found) g = found;
        else return "";
    }
    
    let color = g.rarity === 1 ? '#3498db' : (g.rarity === 2 ? '#f1c40f' : '#e67e22');
    
    let html = \`<div style="font-family: Arial, sans-serif; min-width: 250px;">
        <div style="text-align: center; margin-bottom: 12px;">
            <div style="color: #c9a55c; font-size: 0.9rem; margin-bottom: 2px;">\${g.rarity === 1 ? 'Magic' : (g.rarity === 2 ? 'Rare' : 'Legendary')} Glyph</div>
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
        d = d.replace(/\\[[^\\]]+\\]/g, (match) => {
            let isX = match.includes('%x');
            let isPct = match.includes('%');
            let str = val % 1 !== 0 ? val.toFixed(1) : val;
            if (isX) return str + "%[x]";
            if (isPct) return str + "%";
            return str;
        });
        d = d.replace(/\\\\\\[x\\\\\\]/g, '[x]');
        return d;
    };
    
    let baseBonuses = [];
    let addBonus = null;
    let reqs = null;
    let legBonus = null;
    
    if (g.affixes && g.affixes.length > 0) {
        g.affixes.forEach(affixKey => {
            let affixData = window.D4_PARAGON_DATA.paragonGlyphAffixes[affixKey];
            if (!affixData) return;
            
            let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
            // Hack for D4 parsing rules:
            if (affixData.operation === 1) val = val / 10;
            else if (affixData.operation === 4) val = val * 100;
            else if (affixData.operation === 5) val = val; // Usually no value needed, text is hardcoded
            else if (affixData.displayFactor) val = val / affixData.displayFactor;
            
            if (affixData.thresholds && affixData.power) {
                let pData = window.D4_PARAGON_DATA.skills ? window.D4_PARAGON_DATA.skills[affixData.power] : null;
                if (pData && pData.desc) {
                    addBonus = formatDesc(pData.desc, val);
                }
                
                let tData = window.D4_PARAGON_DATA.paragonThresholds ? window.D4_PARAGON_DATA.paragonThresholds[affixData.thresholds[0]] : null;
                if (tData && tData.attributes) {
                    reqs = tData.attributes.map(a => {
                        let attrName = "Stat";
                        if (a.id === 12) attrName = "Dexterity";
                        if (a.id === 9) attrName = "Strength";
                        if (a.id === 11) attrName = "Willpower";
                        if (a.id === 10) attrName = "Intelligence";
                        return \`+\${a.value} \${attrName}\`;
                    });
                }
            } else if (affixData.requiredRank >= 2 || affixKey.includes('Legendary')) {
                legBonus = formatDesc(affixData.desc, val);
            } else {
                baseBonuses.push(formatDesc(affixData.desc, val));
            }
        });
    }
    
    if (baseBonuses.length > 0) {
        html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Bonus:</div>\`;
        baseBonuses.forEach(b => {
            html += \`<div style="color: #ddd; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #a38a58;">&bull;</span> \${b}</div>\`;
        });
    }
    
    if (addBonus) {
        html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Additional Bonus:</div>\`;
        html += \`<div style="color: #999; font-size: 0.8rem; margin-bottom: 4px;">(if requirements met)</div>\`;
        html += \`<div style="color: #ddd; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #a38a58;">&bull;</span> \${addBonus}</div>\`;
    }
    
    if (reqs && reqs.length > 0) {
        html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Requirements:</div>\`;
        html += \`<div style="color: #999; font-size: 0.8rem; margin-bottom: 4px;">(purchased in radius range)</div>\`;
        reqs.forEach(r => {
            html += \`<div style="color: #aaa; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #666;">&bull;</span> \${r}</div>\`;
        });
    }
    
    if (legBonus) {
        html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Legendary Bonus:</div>\`;
        if (level < 46) {
            html += \`<div style="color: #ff4444; font-size: 0.8rem; margin-bottom: 4px;">(Requires Level 46)</div>\`;
        }
        let lColor = level >= 46 ? '#e67e22' : '#777';
        html += \`<div style="color: \${lColor}; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: \${lColor};">&starf;</span> \${legBonus}</div>\`;
    }

    html += \`</div>\`;
    return html;
};
`;

code = code.replace(regex, newTooltip);
fs.writeFileSync('paragon_logic.js', code);
console.log('Fixed renderGlyphTooltip completely');
