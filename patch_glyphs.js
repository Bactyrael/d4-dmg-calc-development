const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

// 1. Append Glyph Modal Logic at the end
const glyphLogic = `
window.activeGlyphSocket = { slot: -1, nodeIdx: -1 };

window.openGlyphModal = function(slotIdx, nodeIdx) {
    if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) return;
    window.activeGlyphSocket = { slot: slotIdx, nodeIdx: nodeIdx };
    
    let currentGlyphData = currentBuild.paragon[slotIdx].glyph || { id: null, level: 1 };
    
    // Fallback if not init properly
    if (!currentBuild.paragon[slotIdx].glyph) currentBuild.paragon[slotIdx].glyph = currentGlyphData;

    let classStr = "";
    if (typeof currentBuild !== 'undefined' && currentBuild.class) classStr = currentBuild.class.toLowerCase();
    
    let clsIdx = -1;
    if (classStr === 'sorcerer') clsIdx = 0;
    else if (classStr === 'druid') clsIdx = 1;
    else if (classStr === 'barbarian') clsIdx = 2;
    else if (classStr === 'rogue') clsIdx = 3;
    else if (classStr === 'necromancer') clsIdx = 4;
    else if (classStr === 'spiritborn') clsIdx = 5;
    else if (classStr === 'paladin') clsIdx = 6;
    else if (classStr === 'warlock') clsIdx = 7;
    
    const grid = document.getElementById('paragon-glyph-grid');
    grid.innerHTML = '';
    
    let allGlyphs = Object.values(window.D4_PARAGON_DATA.paragonGlyphs);
    
    // Sort Necro glyphs first or just filter by class
    let availableGlyphs = allGlyphs.filter(g => {
        if (clsIdx === -1) return true;
        return g.classFilter && g.classFilter[clsIdx];
    });
    
    availableGlyphs.sort((a, b) => a.name.localeCompare(b.name));
    
    availableGlyphs.forEach(g => {
        let card = document.createElement('div');
        card.style.background = 'rgba(20, 20, 30, 0.9)';
        card.style.border = (currentGlyphData.id === g.id) ? '2px solid #c9a55c' : '1px solid #445';
        card.style.borderRadius = '4px';
        card.style.padding = '10px';
        card.style.cursor = 'pointer';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        
        let color = g.rarity === 1 ? '#3498db' : (g.rarity === 2 ? '#f1c40f' : '#e67e22');
        card.innerHTML = \`<h4 style="margin: 0 0 5px 0; color: \${color};">\${g.name}</h4>\`;
        
        card.addEventListener('click', () => {
            currentBuild.paragon[slotIdx].glyph.id = g.id;
            saveBuild();
            renderParagonGrid();
            window.openGlyphModal(slotIdx, nodeIdx); // refresh
        });
        grid.appendChild(card);
    });
    
    document.getElementById('paragon-glyph-level-slider').value = currentGlyphData.level;
    document.getElementById('paragon-glyph-level-input').value = currentGlyphData.level;
    
    updateGlyphRadiusDisplay(currentGlyphData.level);
    
    document.getElementById('paragon-glyph-modal').style.display = 'block';
};

function updateGlyphRadiusDisplay(level) {
    let radius = 2;
    if (level >= 15 && level <= 45) radius = 3;
    else if (level >= 46) radius = 4;
    document.getElementById('paragon-glyph-radius-display').textContent = 'Radius: ' + radius;
}

document.addEventListener('DOMContentLoaded', () => {
    let cancelBtn = document.getElementById('paragon-glyph-modal-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', () => document.getElementById('paragon-glyph-modal').style.display = 'none');
    
    let slider = document.getElementById('paragon-glyph-level-slider');
    let input = document.getElementById('paragon-glyph-level-input');
    
    if (slider && input) {
        slider.addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            input.value = val;
            updateGlyphRadiusDisplay(val);
            if (window.activeGlyphSocket.slot !== -1) {
                if (!currentBuild.paragon[window.activeGlyphSocket.slot].glyph) currentBuild.paragon[window.activeGlyphSocket.slot].glyph = { id: null, level: 1 };
                currentBuild.paragon[window.activeGlyphSocket.slot].glyph.level = val;
                saveBuild();
                renderParagonGrid();
            }
        });
        input.addEventListener('change', (e) => {
            let val = parseInt(e.target.value) || 1;
            if (val < 1) val = 1;
            if (val > 150) val = 150;
            slider.value = val;
            updateGlyphRadiusDisplay(val);
            if (window.activeGlyphSocket.slot !== -1) {
                if (!currentBuild.paragon[window.activeGlyphSocket.slot].glyph) currentBuild.paragon[window.activeGlyphSocket.slot].glyph = { id: null, level: 1 };
                currentBuild.paragon[window.activeGlyphSocket.slot].glyph.level = val;
                saveBuild();
                renderParagonGrid();
            }
        });
    }
    
    let removeBtn = document.getElementById('paragon-glyph-remove-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            if (window.activeGlyphSocket.slot !== -1) {
                currentBuild.paragon[window.activeGlyphSocket.slot].glyph = { id: null, level: 1 };
                saveBuild();
                renderParagonGrid();
                document.getElementById('paragon-glyph-modal').style.display = 'none';
            }
        });
    }
});
\n`;
code = code + glyphLogic;

// 2. Update node click listener
const clickPattern = `if (!pData.nodes) pData.nodes = [];
                    const idx = pData.nodes.indexOf(dataIdx);`;
const clickReplacement = `if (!pData.nodes) pData.nodes = [];
                    const idx = pData.nodes.indexOf(dataIdx);
                    
                    if (nData.socket && idx !== -1) {
                        window.openGlyphModal(s, dataIdx);
                        return;
                    }`;
code = code.replace(clickPattern, clickReplacement);

fs.writeFileSync('paragon_logic.js', code);
console.log('Patch complete.');
