const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

// 1. In renderGlyphTooltip
const tooltipFind = `    let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
    if (!g) return "";`;
const tooltipReplace = `    let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
    if (!g) {
        let found = Object.values(window.D4_PARAGON_DATA.paragonGlyphs).find(glyph => glyph.id == glyphId);
        if (found) g = found;
        else return "";
    }`;
code = code.replace(tooltipFind, tooltipReplace);

// 2. In getCompiledParagonStats
const statsFind = `      let glyphData = window.D4_PARAGON_DATA.paragonGlyphs[g.id];
      if (!glyphData || !glyphData.affixes) return;`;
const statsReplace = `      let glyphData = window.D4_PARAGON_DATA.paragonGlyphs[g.id];
      if (!glyphData) {
          glyphData = Object.values(window.D4_PARAGON_DATA.paragonGlyphs).find(glyph => glyph.id == g.id);
      }
      if (!glyphData || !glyphData.affixes) return;`;
code = code.replace(statsFind, statsReplace);

// 3. In openGlyphModal iteration
const iterFind = `    const grid = document.getElementById('paragon-glyph-grid');
    grid.innerHTML = '';
    
    let allGlyphs = Object.values(window.D4_PARAGON_DATA.paragonGlyphs);`;
const iterReplace = `    const grid = document.getElementById('paragon-glyph-grid');
    grid.innerHTML = '';
    
    let allGlyphs = Object.entries(window.D4_PARAGON_DATA.paragonGlyphs).map(([k, v]) => ({ ...v, stringKey: k }));`;
code = code.replace(iterFind, iterReplace);

// 4. In openGlyphModal card hover/click
const hoverFind = `        card.addEventListener('mouseenter', () => {
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

        card.addEventListener('click', () => {
            currentBuild.paragon[slotIdx].glyph.id = g.id;`;
const hoverReplace = `        card.addEventListener('mouseenter', () => {
            const detailsDiv = document.getElementById('paragon-node-details');
            if (detailsDiv) {
                let lvl = parseInt(document.getElementById('paragon-glyph-level-slider').value) || 1;
                detailsDiv.innerHTML = window.renderGlyphTooltip(g.stringKey, lvl);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const detailsDiv = document.getElementById('paragon-node-details');
            if (detailsDiv) detailsDiv.innerHTML = '<div style="color: #666; font-style: italic; text-align: center; margin-top: 50px;">Hover over a node to see details</div>';
        });

        card.addEventListener('click', () => {
            currentBuild.paragon[slotIdx].glyph.id = g.stringKey;`;
code = code.replace(hoverFind, hoverReplace);

fs.writeFileSync('paragon_logic.js', code);
console.log('Fixed glyph ids!');
