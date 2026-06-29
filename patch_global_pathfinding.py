import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update calculateBoardPosition
old_calc = """function calculateBoardPosition(slotIndex) {
    if (slotIndex === 0) return { x: 0, y: 0 };
    let pData = currentBuild.paragon[slotIndex];
    if (!pData || !pData.connection || pData.connection.parentSlot === null) return { x: 0, y: 0 };
    
    let parentPos = calculateBoardPosition(pData.connection.parentSlot);
    let parentPData = currentBuild.paragon[pData.connection.parentSlot];
    let parentSide = getGateSide(pData.connection.parentGate, parentPData.rotation || 0);
    
    let offset = 480; // Board size visually + some padding
    if (parentSide === "North") return { x: parentPos.x, y: parentPos.y - offset };
    if (parentSide === "South") return { x: parentPos.x, y: parentPos.y + offset };
    if (parentSide === "East")  return { x: parentPos.x + offset, y: parentPos.y };
    if (parentSide === "West")  return { x: parentPos.x - offset, y: parentPos.y };
    
    return parentPos;
}"""

new_calc = """function calculateBoardPosition(slotIndex) {
    let pData = currentBuild.paragon[slotIndex];
    if (!pData || pData.boardId === null) return { x: 0, y: 0 };
    return { x: (pData.gridX || 0) * 480, y: (pData.gridY || 0) * 480 };
}"""
js = js.replace(old_calc, new_calc)


# 2. Update buildGlobalGraph
old_graph = """    let crossEdges = {}; 
    for (let s = 1; s < 5; s++) {
        let pData = currentBuild.paragon[s];
        if (pData && pData.boardId && pData.connection) {
            let conn = pData.connection;
            if (conn.parentSlot !== null && conn.parentGate !== null && conn.selfGate !== null && conn.parentSlot !== "") {
                let parentStr = conn.parentSlot + "-" + conn.parentGate;
                let childStr = s + "-" + conn.selfGate;
                
                if (!crossEdges[parentStr]) crossEdges[parentStr] = [];
                crossEdges[parentStr].push(childStr);
                
                if (!crossEdges[childStr]) crossEdges[childStr] = [];
                crossEdges[childStr].push(parentStr);
            }
        }
    }"""

new_graph = """    let crossEdges = {}; 
    
    // Implicit Grid-Based Linking
    // A board is at gridX, gridY. We check all pairs to see if they are adjacent and gates line up.
    for (let i = 0; i < 5; i++) {
        let p1 = currentBuild.paragon[i];
        if (!p1 || !p1.boardId) continue;
        let gX1 = p1.gridX || 0; let gY1 = p1.gridY || 0;
        
        for (let j = i + 1; j < 5; j++) {
            let p2 = currentBuild.paragon[j];
            if (!p2 || !p2.boardId) continue;
            let gX2 = p2.gridX || 0; let gY2 = p2.gridY || 0;
            
            // Check adjacency
            let dx = gX2 - gX1;
            let dy = gY2 - gY1;
            
            if (Math.abs(dx) + Math.abs(dy) === 1) { // Exactly 1 unit apart (orthogonally adjacent)
                // They are adjacent. Find the facing gate sides.
                // If dx = 1, board 2 is EAST of board 1. Board 1 needs an EAST gate, Board 2 needs a WEST gate.
                let requiredSide1, requiredSide2;
                if (dx === 1) { requiredSide1 = "East"; requiredSide2 = "West"; }
                else if (dx === -1) { requiredSide1 = "West"; requiredSide2 = "East"; }
                else if (dy === 1) { requiredSide1 = "South"; requiredSide2 = "North"; }
                else if (dy === -1) { requiredSide1 = "North"; requiredSide2 = "South"; }
                
                // Now find if p1 has a gate facing requiredSide1, and p2 has a gate facing requiredSide2.
                let b1Data = window.D4_PARAGON_DATA.paragonBoards[p1.boardId];
                let b2Data = window.D4_PARAGON_DATA.paragonBoards[p2.boardId];
                
                let g1Idx = -1, g2Idx = -1;
                for(let k=0; k<441; k++) {
                    if (b1Data.nodes[k] && b1Data.nodes[k].toLowerCase().includes('gate')) {
                        if (getGateSide(k, p1.rotation || 0) === requiredSide1) g1Idx = k;
                    }
                }
                for(let k=0; k<441; k++) {
                    if (b2Data.nodes[k] && b2Data.nodes[k].toLowerCase().includes('gate')) {
                        if (getGateSide(k, p2.rotation || 0) === requiredSide2) g2Idx = k;
                    }
                }
                
                if (g1Idx !== -1 && g2Idx !== -1) {
                    let str1 = i + "-" + g1Idx;
                    let str2 = j + "-" + g2Idx;
                    if (!crossEdges[str1]) crossEdges[str1] = [];
                    crossEdges[str1].push(str2);
                    if (!crossEdges[str2]) crossEdges[str2] = [];
                    crossEdges[str2].push(str1);
                }
            }
        }
    }"""
js = js.replace(old_graph, new_graph)


# 3. Update attachBoardFromModal
old_attach = """        let pData = currentBuild.paragon[targetSlot];
        pData.boardId = bId;
        pData.rotation = 0;
        pData.connection = {
            parentSlot: s,
            parentGate: dataIdx,
            selfGate: getOppositeGateIndex(dataIdx) // Default
        };"""

new_attach = """        let pData = currentBuild.paragon[targetSlot];
        pData.boardId = bId;
        pData.rotation = 0;
        
        let parentData = currentBuild.paragon[s];
        let pGridX = parentData.gridX || 0;
        let pGridY = parentData.gridY || 0;
        let side = getGateSide(dataIdx, parentData.rotation || 0);
        
        pData.gridX = pGridX;
        pData.gridY = pGridY;
        if (side === "North") pData.gridY -= 1;
        if (side === "South") pData.gridY += 1;
        if (side === "East") pData.gridX += 1;
        if (side === "West") pData.gridX -= 1;
        
        pData.connection = {
            parentSlot: s,
            parentGate: dataIdx,
            selfGate: getOppositeGateIndex(dataIdx) // Default
        };"""
js = js.replace(old_attach, new_attach)

# 4. Remove recursive rotate connection logic
old_rotate = """                pData.rotation = (pData.rotation + 90) % 360;
                
                // If it has a connection, remap its selfGate
                if (pData.connection && pData.connection.selfGate !== null) {
                    // Rotate the selfGate index
                    let rx = pData.connection.selfGate % 21;
                    let ry = Math.floor(pData.connection.selfGate / 21);
                    // 90 deg cw around (10,10): x' = 10 - (y - 10), y' = 10 + (x - 10)
                    let nx = 10 - (ry - 10);
                    let ny = 10 + (rx - 10);
                    pData.connection.selfGate = ny * 21 + nx;
                }
                
                // Also remap any child boards attached to this board
                for (let i = 1; i < 5; i++) {
                    let child = currentBuild.paragon[i];
                    if (child.boardId && child.connection && child.connection.parentSlot === activeParagonSlot) {
                        let cx = child.connection.parentGate % 21;
                        let cy = Math.floor(child.connection.parentGate / 21);
                        let nx = 10 - (cy - 10);
                        let ny = 10 + (cx - 10);
                        child.connection.parentGate = ny * 21 + nx;
                    }
                }
                
                saveBuild();
                renderParagonGrid();"""

new_rotate = """                pData.rotation = (pData.rotation + 90) % 360;
                saveBuild();
                renderParagonGrid();"""
js = js.replace(old_rotate, new_rotate)

with open('paragon_logic.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Graph pathfinding logic patched.")
