import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add rotation listener
init_ui_search = "document.getElementById('paragon-board-select').addEventListener('change', (e) => {"
init_ui_replace = """    const rotateBtn = document.getElementById('paragon-rotate-btn');
    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            const pData = currentBuild.paragon[activeParagonSlot];
            if (pData && pData.boardId) {
                pData.rotation = ((pData.rotation || 0) + 1) % 4;
                renderParagonGrid();
                saveBuild();
            }
        });
    }

    document.getElementById('paragon-board-select').addEventListener('change', (e) => {"""

js = js.replace(init_ui_search, init_ui_replace)

# Modify renderParagonGrid
render_search = """    // Render 441 nodes
    for (let i = 0; i < 441; i++) {
        const cell = document.createElement('div');
        cell.className = 'paragon-node';
        cell.dataset.index = i;
        
        const nodeName = boardData.nodes[i];"""

render_replace = """    // Render 441 nodes
    const rotation = pData.rotation || 0;
    
    for (let vIdx = 0; vIdx < 441; vIdx++) {
        let dataIdx = vIdx;
        const vX = vIdx % 21;
        const vY = Math.floor(vIdx / 21);
        
        if (rotation === 1) {
            dataIdx = (20 - vX) * 21 + vY;
        } else if (rotation === 2) {
            dataIdx = (20 - vY) * 21 + (20 - vX);
        } else if (rotation === 3) {
            dataIdx = vX * 21 + (20 - vY);
        }
        
        const cell = document.createElement('div');
        cell.className = 'paragon-node';
        cell.dataset.index = dataIdx;
        
        const nodeName = boardData.nodes[dataIdx];"""

js = js.replace(render_search, render_replace)

# Modify click handler to use dataIdx instead of i
click_search = """            cell.addEventListener('click', () => {
                if (!pData.nodes) pData.nodes = [];
                const idx = pData.nodes.indexOf(i);
                if (idx > -1) {
                    pData.nodes.splice(idx, 1);
                    cell.classList.remove('node-active');
                } else {
                    pData.nodes.push(i);
                    cell.classList.add('node-active');
                }
                updateParagonSlotNames();"""

click_replace = """            cell.addEventListener('click', () => {
                if (!pData.nodes) pData.nodes = [];
                const idx = pData.nodes.indexOf(dataIdx);
                if (idx > -1) {
                    pData.nodes.splice(idx, 1);
                    cell.classList.remove('node-active');
                } else {
                    pData.nodes.push(dataIdx);
                    cell.classList.add('node-active');
                }
                updateParagonSlotNames();"""

js = js.replace(click_search, click_replace)

# Modify active check to use dataIdx
active_search = """            if (pData.nodes && pData.nodes.includes(i)) {
                cell.classList.add('node-active');
            }"""

active_replace = """            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            }"""

js = js.replace(active_search, active_replace)

with open('paragon_logic.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('paragon_logic.js updated for rotation')
