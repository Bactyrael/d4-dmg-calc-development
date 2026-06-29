import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We need to insert a function for pathfinding.
pathfinding_func = """
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
"""

js = js.replace("showNodeDetails = function(nodeId) {", pathfinding_func + "\nshowNodeDetails = function(nodeId) {")


# Replace the render loop content
# I need to add reachable logic
render_search = """            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            }
            
            cell.addEventListener('mouseenter', () => showNodeDetails(nodeName));"""

render_replace = """            let isReachable = true;
            if (window.getReachableNodes) {
                // Not actually needed to put here, but let's just evaluate it for the whole board once
            }
            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            }
            
            cell.addEventListener('mouseenter', () => showNodeDetails(nodeName));"""
# I will compute reachable outside the loop.

js_mod = """
    // Find reachable
    const reachableNodes = getReachableNodes(pData, boardData);
    
    for (let vIdx = 0; vIdx < 441; vIdx++) {
"""

js = js.replace("    for (let vIdx = 0; vIdx < 441; vIdx++) {", js_mod)

render_search2 = """            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            }"""

render_replace2 = """            if (pData.nodes && pData.nodes.includes(dataIdx)) {
                cell.classList.add('node-active');
            } else if (!reachableNodes.has(dataIdx)) {
                cell.classList.add('node-unreachable');
                cell.style.opacity = '0.3'; // dim unreachable nodes
                cell.style.cursor = 'not-allowed';
            }"""

js = js.replace(render_search2, render_replace2)

click_search = """            cell.addEventListener('click', () => {
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

click_replace = """            cell.addEventListener('click', () => {
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
                updateParagonSlotNames();"""

js = js.replace(click_search, click_replace)

with open('paragon_logic.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('paragon_logic.js updated for pathfinding')
