const fs = require('fs');
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

function formatDesc(desc, val) {
    if (!desc) return "";
    let d = desc.replace(/\{c_[^}]+\}/g, '<span style="color: #fff; font-weight: bold;">');
    d = d.replace(/\{\/c\}/g, '</span>');
    d = d.replace(/\[[^\]]+\]/g, (match) => {
        let isX = match.includes('%x');
        let isPct = match.includes('%');
        let str = val % 1 !== 0 ? val.toFixed(1) : val;
        if (isX) return str + "%[x]";
        if (isPct) return str + "%";
        return str;
    });
    // Remove slash-escaped brackets
    d = d.replace(/\\\[x\\]/g, '[x]');
    return d;
}

function renderGlyphTooltipLocal(glyphId, level) {
    let g = data.paragonGlyphs[glyphId];
    if (!g) {
        g = Object.values(data.paragonGlyphs).find(glyph => glyph.id == glyphId);
        if (!g) return "";
    }
    
    let color = g.rarity === 1 ? '#3498db' : (g.rarity === 2 ? '#f1c40f' : '#e67e22');
    
    let html = `<div style="font-family: Arial, sans-serif; min-width: 250px;">
        <div style="text-align: center; margin-bottom: 12px;">
            <div style="color: #c9a55c; font-size: 0.9rem; margin-bottom: 2px;">Legendary Glyph</div>
            <h3 style="margin: 0; color: #fff; font-size: 1.3rem; text-shadow: 1px 1px 2px #000;">${g.name}</h3>
            <div style="color: #ddd; font-weight: bold; font-size: 0.9rem; margin-top: 4px; border-bottom: 1px solid #444; padding-bottom: 4px;">LEVEL ${level}</div>
        </div>`;
        
    let radius = 3;
    if (level >= 25 && level <= 49) radius = 4;
    else if (level >= 50) radius = 5;
    
    html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-bottom: 4px;">Radius Size: <span style="color: #fff;">${radius}</span></div>`;
    if (radius === 5) {
        html += `<div style="color: #e67e22; font-size: 0.85rem; margin-bottom: 10px;">&bull; Radius size is at max.</div>`;
    }
    
    let baseBonuses = [];
    let addBonus = null;
    let reqs = null;
    let legBonus = null;
    
    if (g.affixes && g.affixes.length > 0) {
        g.affixes.forEach(affixKey => {
            let affixData = data.paragonGlyphAffixes[affixKey];
            if (!affixData) return;
            
            let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
            if (affixData.displayFactor) val = val / affixData.displayFactor;
            
            if (affixData.thresholds && affixData.power) {
                // Additional bonus
                let pData = data.skills[affixData.power];
                if (pData && pData.desc) {
                    addBonus = formatDesc(pData.desc, val);
                }
                
                let tData = data.paragonThresholds[affixData.thresholds[0]];
                if (tData && tData.attributes) {
                    reqs = tData.attributes.map(a => {
                        let attrName = "Stat";
                        if (a.id === 12) attrName = "Dexterity";
                        if (a.id === 9) attrName = "Strength";
                        if (a.id === 11) attrName = "Willpower";
                        if (a.id === 10) attrName = "Intelligence";
                        return `+${a.value} ${attrName}`;
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
        html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Bonus:</div>`;
        baseBonuses.forEach(b => {
            html += `<div style="color: #ddd; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #a38a58;">&bull;</span> ${b}</div>`;
        });
    }
    
    if (addBonus) {
        html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Additional Bonus:</div>`;
        html += `<div style="color: #999; font-size: 0.8rem; margin-bottom: 4px;">(if requirements met)</div>`;
        html += `<div style="color: #ddd; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #a38a58;">&bull;</span> ${addBonus}</div>`;
    }
    
    if (reqs && reqs.length > 0) {
        html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Requirements:</div>`;
        html += `<div style="color: #999; font-size: 0.8rem; margin-bottom: 4px;">(purchased in radius range)</div>`;
        reqs.forEach(r => {
            html += `<div style="color: #aaa; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: #666;">&bull;</span> ${r}</div>`;
        });
    }
    
    if (legBonus) {
        html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Legendary Bonus:</div>`;
        if (level < 46) {
            html += `<div style="color: #ff4444; font-size: 0.8rem; margin-bottom: 4px;">(Requires Level 46)</div>`;
        }
        let color = level >= 46 ? '#e67e22' : '#777';
        html += `<div style="color: ${color}; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: ${color};">&starf;</span> ${legBonus}</div>`;
    }

    html += `</div>`;
    return html;
}

console.log(renderGlyphTooltipLocal('Rare_046_Dexterity_Side', 150));
