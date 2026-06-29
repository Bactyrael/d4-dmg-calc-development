const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

// Fix populateBoardModalGrid
const boardFind = `        card.addEventListener('mouseenter', () => { card.style.borderColor = '#c9a55c'; card.style.background = 'rgba(30,30,45,1)'; });
        card.addEventListener('mouseleave', () => { card.style.borderColor = '#445'; card.style.background = 'rgba(20,20,30,0.9)'; });
        card.addEventListener('mouseenter', () => {
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

const boardReplace = `        card.addEventListener('mouseenter', () => { card.style.borderColor = '#c9a55c'; card.style.background = 'rgba(30,30,45,1)'; });
        card.addEventListener('mouseleave', () => { card.style.borderColor = '#445'; card.style.background = 'rgba(20,20,30,0.9)'; });
        card.addEventListener('click', () => {
            attachBoardFromModal(b.id);`;
            
if (code.includes(boardFind)) {
    code = code.replace(boardFind, boardReplace);
}

// Fix openGlyphModal
const glyphFind = `        card.addEventListener('click', () => {
            currentBuild.paragon[slotIdx].glyph.id = g.id;
            saveBuild();
            renderParagonGrid();
            window.openGlyphModal(slotIdx, nodeIdx); // refresh
        });`;
        
const glyphReplace = `        card.addEventListener('mouseenter', () => {
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
            currentBuild.paragon[slotIdx].glyph.id = g.stringKey;
            saveBuild();
            renderParagonGrid();
            window.openGlyphModal(slotIdx, nodeIdx); // refresh
        });`;

if (code.includes(glyphFind)) {
    code = code.replace(glyphFind, glyphReplace);
}

fs.writeFileSync('paragon_logic.js', code);
console.log('Fixed listeners!');
