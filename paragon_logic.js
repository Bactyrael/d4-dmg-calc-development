// paragon_logic.js
// Handles all Paragon Board logic, UI, node selection, and stats calculation

var activeParagonSlot = 0;

window.initParagonUI = function() {
    if (!D4_PARAGON_DATA) return;
    
    // Bind slot clicks
    document.querySelectorAll('.paragon-board-slot').forEach(slot => {
        slot.addEventListener('click', (e) => {
            document.querySelectorAll('.paragon-board-slot').forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            activeParagonSlot = parseInt(slot.dataset.slot);
            renderParagonGrid();
        });
    });

    const rotateBtn = document.getElementById('paragon-rotate-btn');
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

    // Bind board selector dropdown
    const select = document.getElementById('paragon-board-select');
    if(select) {
        select.addEventListener('change', (e) => {
            const boardId = e.target.value;
            currentBuild.paragon[activeParagonSlot].boardId = boardId;
            currentBuild.paragon[activeParagonSlot].nodes = []; // reset nodes when board changes
            updateParagonSlotNames();
            renderParagonGrid();
            saveBuild();
        });
    }

    // Reset button
    const resetBtn = document.getElementById('reset-paragon-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentBuild.paragon = [
                { boardId: null, nodes: [], glyphId: null, glyphLevel: 1 },
                { boardId: null, nodes: [], glyphId: null, glyphLevel: 1 },
                { boardId: null, nodes: [], glyphId: null, glyphLevel: 1 },
                { boardId: null, nodes: [], glyphId: null, glyphLevel: 1 },
                { boardId: null, nodes: [], glyphId: null, glyphLevel: 1 }
            ];
            var activeParagonSlot = 0;
            document.querySelectorAll('.paragon-board-slot').forEach(s => s.classList.remove('active'));
            document.querySelector('.paragon-board-slot[data-slot="0"]').classList.add('active');
            updateParagonSlotNames();
            renderParagonGrid();
            saveBuild();
        });
    }

    updateParagonSlotNames();
    renderParagonGrid();
};

window.updateParagonSlotNames = function() {
    let totalSpent = 0;
    for (let i = 0; i < 5; i++) {
        const slotDiv = document.querySelector(`.paragon-board-slot[data-slot="${i}"]`);
        const nameDiv = document.getElementById(`paragon-slot-${i}-name`);
        const pData = currentBuild.paragon[i];
        
        totalSpent += pData.nodes ? pData.nodes.length : 0;

        if (pData.boardId && D4_PARAGON_DATA && D4_PARAGON_DATA.paragonBoards) {
            slotDiv.classList.remove('empty');
            const boardData = D4_PARAGON_DATA.paragonBoards[pData.boardId];
            nameDiv.textContent = boardData ? boardData.name : pData.boardId;
        } else {
            slotDiv.classList.add('empty');
            nameDiv.textContent = "+ Add Board";
        }
    }
    
    const pointsSpan = document.getElementById('paragon-points-spent');
    if(pointsSpan) pointsSpan.textContent = totalSpent;
};

window.renderParagonGrid = function() {
    const grid = document.getElementById('paragon-grid');
    const select = document.getElementById('paragon-board-select');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (!D4_PARAGON_DATA || !D4_PARAGON_DATA.paragonBoards) {
        grid.style.display = 'flex';
        grid.style.justifyContent = 'center';
        grid.style.alignItems = 'center';
        grid.innerHTML = '<div style="color: #ffaa00; font-size: 1.2rem; font-style: italic;">Paragon data not loaded. Please refresh the page!</div>';
        return;
    }
    
    const pData = currentBuild.paragon[activeParagonSlot];
    
    // Populate dropdown
    const boards = D4_PARAGON_DATA.paragonBoards;
    if(select) {
        select.innerHTML = '<option value="">-- Select Board --</option>';
        
        let matchingBoards = [];
        for (const [bId, bData] of Object.entries(boards)) {
            let classKey = currentBuild.class.toLowerCase();
            if (classKey === 'necromancer') classKey = 'necro';
            else if (classKey === 'sorcerer') classKey = 'sorc';
            else if (classKey === 'barbarian') classKey = 'barb';
            else if (classKey === 'spiritborn') classKey = 'spirit';

            if (bId.toLowerCase().includes(classKey) || bId.toLowerCase().includes('generic') || bId.toLowerCase().includes('start')) {
                matchingBoards.push({ id: bId, name: bData.name || bId });
            }
        }
        
        matchingBoards.sort((a, b) => a.name.localeCompare(b.name));
        
        for (const board of matchingBoards) {
            const opt = document.createElement('option');
            opt.value = board.id;
            opt.textContent = board.name;
            if (pData.boardId === board.id) opt.selected = true;
            select.appendChild(opt);
        }
    }

    if (!pData.boardId || !boards[pData.boardId]) {
        if(document.getElementById('board-points-spent')) {
            document.getElementById('board-points-spent').textContent = '0';
        }
        grid.style.display = 'flex';
        grid.style.justifyContent = 'center';
        grid.style.alignItems = 'center';
        grid.innerHTML = '<div style="color: #777; font-size: 1.2rem; font-style: italic;">Please select a Paragon Board from the dropdown above.</div>';
        return; 
    }
    
    // Reset grid styles for actual rendering
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(21, 1fr)';
    grid.style.gridTemplateRows = 'repeat(21, 1fr)';
    
    const boardData = boards[pData.boardId];
    if(document.getElementById('board-points-spent')) {
        document.getElementById('board-points-spent').textContent = pData.nodes ? pData.nodes.length : 0;
    }

    // Render 441 nodes
    const rotation = pData.rotation || 0;
    

    // Find reachable
    const reachableNodes = getReachableNodes(pData, boardData);
    
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
        
        const nodeName = boardData.nodes[dataIdx];
        if (!nodeName) {
            cell.classList.add('empty-space');
        } else {
            // Determine type
            if (nodeName.toLowerCase().includes('gate')) {
                cell.classList.add('type-gate');
            } else if (nodeName.toLowerCase().includes('socket')) {
                cell.classList.add('type-glyph');
            } else if (nodeName.toLowerCase().includes('legendary') || nodeName.toLowerCase().includes('start')) {
                cell.classList.add('type-legendary');
            } else if (nodeName.toLowerCase().includes('rare')) {
                cell.classList.add('type-rare');
            } else if (nodeName.toLowerCase().includes('magic')) {
                cell.classList.add('type-magic');
            } else {
                cell.classList.add('type-normal');
            }
            
            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            } else if (!reachableNodes.has(dataIdx)) {
                cell.classList.add('node-unreachable');
                cell.style.opacity = '0.3'; // dim unreachable nodes
                cell.style.cursor = 'not-allowed';
            }
            
            cell.addEventListener('mouseenter', () => showNodeDetails(nodeName));
            cell.addEventListener('mouseleave', () => {
                const details = document.getElementById('paragon-node-details');
                if(details) {
                    details.innerHTML = '<div style="color: #777; font-style: italic; text-align: center; margin-top: 100px;">Hover over a node to view its stats.</div>';
                }
            });
            
            cell.addEventListener('click', () => {
                if (!pData.nodes) pData.nodes = [];
                const idx = pData.nodes.indexOf(dataIdx);
                
                if (idx > -1) {
                    // Try to remove
                    if (!canRemoveNode(dataIdx, pData, boardData)) {
                        alert("Cannot remove this node because other active nodes depend on it.");
                        return;
                    }
                    pData.nodes.splice(idx, 1);
                } else {
                    // Try to add
                    if (!reachableNodes.has(dataIdx)) {
                        return; // do nothing
                    }
                    if (pData.nodes.length >= 225) {
                        alert("Max nodes reached for this board!");
                        return;
                    }
                    pData.nodes.push(dataIdx);
                }
                
                // Re-render everything to update reachability
                renderParagonGrid();
                updateParagonSlotNames();
                if(document.getElementById('board-points-spent')) {
                    document.getElementById('board-points-spent').textContent = pData.nodes.length;
                }
                saveBuild();
            });
        }
        
        grid.appendChild(cell);
    }
};


function getReachableNodes(pData, boardData) {
    if (!pData.nodes || pData.nodes.length === 0) {
        // Only gates and start nodes are reachable when empty
        let reachable = new Set();
        for(let i=0; i<441; i++) {
            if(boardData.nodes[i] && (boardData.nodes[i].toLowerCase().includes('gate') || boardData.nodes[i].toLowerCase().includes('start'))) {
                reachable.add(i);
            }
        }
        return reachable;
    }

    let reachable = new Set();
    let activeSet = new Set(pData.nodes);
    
    // Add all active nodes and their neighbors
    for (let idx of pData.nodes) {
        reachable.add(idx);
        
        let x = idx % 21;
        let y = Math.floor(idx / 21);
        
        if (x > 0) reachable.add(idx - 1);
        if (x < 20) reachable.add(idx + 1);
        if (y > 0) reachable.add(idx - 21);
        if (y < 20) reachable.add(idx + 21);
    }
    
    // Filter to only actual nodes
    let finalReachable = new Set();
    for (let r of reachable) {
        if (boardData.nodes[r]) finalReachable.add(r);
    }
    return finalReachable;
}

function canRemoveNode(nodeIdx, pData, boardData) {
    // If it's the last node, sure
    if (pData.nodes.length <= 1) return true;
    
    let activeSet = new Set(pData.nodes);
    activeSet.delete(nodeIdx); // temporarily remove
    
    // Find all start/gate nodes in the remaining active set
    let roots = [];
    for (let idx of activeSet) {
        if (boardData.nodes[idx].toLowerCase().includes('gate') || boardData.nodes[idx].toLowerCase().includes('start')) {
            roots.push(idx);
        }
    }
    
    if (roots.length === 0) return false; // No root to connect to!
    
    // BFS from roots
    let visited = new Set();
    let queue = [...roots];
    for (let r of queue) visited.add(r);
    
    while(queue.length > 0) {
        let curr = queue.shift();
        let x = curr % 21;
        let y = Math.floor(curr / 21);
        
        let neighbors = [];
        if (x > 0) neighbors.push(curr - 1);
        if (x < 20) neighbors.push(curr + 1);
        if (y > 0) neighbors.push(curr - 21);
        if (y < 20) neighbors.push(curr + 21);
        
        for (let n of neighbors) {
            if (activeSet.has(n) && !visited.has(n)) {
                visited.add(n);
                queue.push(n);
            }
        }
    }
    
    // If visited has all active nodes, it's safe to remove
    return visited.size === activeSet.size;
}

showNodeDetails = function(nodeId) {
    const detailsDiv = document.getElementById('paragon-node-details');
    if (!detailsDiv || !D4_PARAGON_DATA || !D4_PARAGON_DATA.paragonNodes) return;
    
    const nData = D4_PARAGON_DATA.paragonNodes[nodeId];
    if (!nData) {
        detailsDiv.innerHTML = `<h4 style="margin-top:0; color:#fff;">${nodeId}</h4><p style="color:#aaa; font-size:0.9rem;">Generic Node</p>`;
        return;
    }
    
    let html = `<h4 style="margin-top:0; color:#fff; margin-bottom: 5px;">${nData.name || nodeId}</h4>`;
    if (nData.description) {
        html += `<div style="color: #4CAF50; font-size: 0.95rem; margin-bottom: 10px;">${nData.description}</div>`;
    }
    
    detailsDiv.innerHTML = html;
};

// Calculate total stats from selected Paragon nodes across all boards
window.calculateParagonStats = function() {
    let stats = {};
    if (!currentBuild || !currentBuild.paragon || !D4_PARAGON_DATA) return stats;
    
    // Add logic here to accumulate stats based on selected nodes in currentBuild.paragon
    
    return stats;
};
