const fs = require('fs');
let code = fs.readFileSync('paragon_logic.js', 'utf8');

const targetStr = `        const rotation = pData.rotation || 0;
        
        for (let vIdx = 0; vIdx < 441; vIdx++) {`;

const replacement = `        const rotation = pData.rotation || 0;
        
        let socketDataIdx = -1;
        let glyphRadius = 0;
        if (pData.glyph && pData.glyph.id && pData.nodes) {
            for (let i = 0; i < 441; i++) {
                if (bData.nodes[i] && bData.nodes[i].toLowerCase().includes('socket') && pData.nodes.includes(i)) {
                    socketDataIdx = i;
                    let lvl = pData.glyph.level || 1;
                    if (lvl >= 1 && lvl <= 14) glyphRadius = 2;
                    else if (lvl >= 15 && lvl <= 45) glyphRadius = 3;
                    else glyphRadius = 4;
                    break;
                }
            }
        }
        let socketX = socketDataIdx !== -1 ? socketDataIdx % 21 : -1;
        let socketY = socketDataIdx !== -1 ? Math.floor(socketDataIdx / 21) : -1;
        
        for (let vIdx = 0; vIdx < 441; vIdx++) {`;

code = code.replace(targetStr, replacement);

const cellStyleStr = `                let isActive = pData.nodes && pData.nodes.includes(dataIdx);
                
                if (isActive) {`;
const cellStyleRep = `                let isActive = pData.nodes && pData.nodes.includes(dataIdx);
                
                if (socketDataIdx !== -1 && nodeName) {
                    let nx = dataIdx % 21;
                    let ny = Math.floor(dataIdx / 21);
                    let dist = Math.max(Math.abs(nx - socketX), Math.abs(ny - socketY));
                    if (dist <= glyphRadius && dist > 0) {
                        cell.style.backgroundColor = 'rgba(201, 165, 92, 0.2)'; // highlight nodes in radius
                    }
                    if (dataIdx === socketDataIdx) {
                        cell.style.backgroundImage = 'radial-gradient(circle, #8b0000 0%, #000 100%)';
                        cell.style.border = '2px solid #c9a55c';
                    }
                }
                
                if (isActive) {`;

code = code.replace(cellStyleStr, cellStyleRep);

fs.writeFileSync('paragon_logic.js', code);
console.log('Patch 2 complete.');
