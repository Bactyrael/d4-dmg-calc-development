
window.getTotalParagonPointsSpent = function() {
    let totalSpent = 0;
    let connectedBoards = 0;
    for(let i=0; i<5; i++) {
        if (currentBuild.paragon[i] && currentBuild.paragon[i].nodes) {
            totalSpent += currentBuild.paragon[i].nodes.length;
            if (i > 0 && currentBuild.paragon[i].boardId) connectedBoards++;
        }
    }
    totalSpent -= connectedBoards;
    if (currentBuild.paragon[0] && currentBuild.paragon[0].nodes.length > 0) {
        totalSpent -= 1;
    }
    return Math.max(0, totalSpent);
};

window.showToast = function(msg) {
    let container = document.getElementById('toast-container');
    if (!container) return;
    
    let toast = document.createElement('div');
    toast.className = 'd4-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    
    // trigger reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// paragon_logic.js
// Handles all Paragon Board logic, UI, node selection, and stats calculation

var activeParagonSlot = 0; // The board currently being configured in the floating panel
var mapPan = { x: 0, y: 0 };
var mapScale = 1;
var isDragging = false;
var lastMouse = { x: 0, y: 0 };
var pendingAttach = null; // { slot: 0, gateIdx: 10, gateSide: 'North' }

// Global Pathfinding functions (Retained from before)
function buildGlobalGraph(ignoredNodeStr = null) {
    let activeNodes = new Set();
    for (let s = 0; s < 5; s++) {
        let pData = currentBuild.paragon[s];
        if (pData && pData.boardId && pData.nodes) {
            for (let idx of pData.nodes) {
                let nodeStr = s + "-" + idx;
                if (nodeStr !== ignoredNodeStr) {
                    activeNodes.add(nodeStr);
                }
            }
        }
    }

    let crossEdges = {}; 
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
    }
    return { activeNodes, crossEdges };
}

function getGlobalReachableActiveNodes(ignoredNodeStr = null) {
    const { activeNodes, crossEdges } = buildGlobalGraph(ignoredNodeStr);
    
    let startNodes = [];
    let b0 = currentBuild.paragon[0];
    if (b0 && b0.boardId && b0.nodes && window.D4_PARAGON_DATA && window.D4_PARAGON_DATA.paragonBoards[b0.boardId]) {
        let b0Data = window.D4_PARAGON_DATA.paragonBoards[b0.boardId];
        if (activeNodes.size > 0) {
            for (let idx of b0.nodes) {
                let nodeName = b0Data.nodes[idx];
                if (nodeName && nodeName.toLowerCase().includes('start')) {
                    let ns = "0-" + idx;
                    if (ns !== ignoredNodeStr) startNodes.push(ns);
                }
            }
            if (startNodes.length === 0) {
                for (let idx of b0.nodes) {
                    let ns = "0-" + idx;
                    if (ns !== ignoredNodeStr) startNodes.push(ns);
                    break;
                }
            }
        }
    }
    
    let visited = new Set();
    let queue = [...startNodes];
    for (let r of queue) visited.add(r);
    
    while(queue.length > 0) {
        let curr = queue.shift();
        let parts = curr.split("-");
        let s = parseInt(parts[0]);
        let idx = parseInt(parts[1]);
        
        let neighbors = [];
        let x = idx % 21;
        let y = Math.floor(idx / 21);
        if (x > 0) neighbors.push(s + "-" + (idx - 1));
        if (x < 20) neighbors.push(s + "-" + (idx + 1));
        if (y > 0) neighbors.push(s + "-" + (idx - 21));
        if (y < 20) neighbors.push(s + "-" + (idx + 21));
        
        if (crossEdges[curr]) {
            for (let cross of crossEdges[curr]) {
                neighbors.push(cross);
            }
        }
        
        for (let n of neighbors) {
            if (activeNodes.has(n) && !visited.has(n)) {
                visited.add(n);
                queue.push(n);
            }
        }
    }
    
    return { visited, activeNodes, crossEdges };
}

function getReachableNodesMap(visited, crossEdges, activeNodes) {
    let globalReachable = new Set();
    
    // If nothing active at all, only slot 0 start/gates are reachable
    if (activeNodes.size === 0) {
        let b0Data = window.D4_PARAGON_DATA?.paragonBoards?.[currentBuild.paragon[0].boardId];
        if (b0Data) {
            for(let i=0; i<441; i++) {
                if(b0Data.nodes[i] && (b0Data.nodes[i].toLowerCase().includes('gate') || b0Data.nodes[i].toLowerCase().includes('start'))) {
                    globalReachable.add("0-" + i);
                }
            }
        }
        return globalReachable;
    }

    for (let s = 0; s < 5; s++) {
        let pData = currentBuild.paragon[s];
        if (!pData || !pData.boardId) continue;
        let bData = window.D4_PARAGON_DATA.paragonBoards[pData.boardId];
        if (!bData) continue;

        for (let i = 0; i < 441; i++) {
            if (!bData.nodes[i]) continue;
            let myStr = s + "-" + i;
            if (visited.has(myStr)) {
                globalReachable.add(myStr);
                continue;
            }
            
            let x = i % 21;
            let y = Math.floor(i / 21);
            let adj = [];
            if (x > 0) adj.push(s + "-" + (i - 1));
            if (x < 20) adj.push(s + "-" + (i + 1));
            if (y > 0) adj.push(s + "-" + (i - 21));
            if (y < 20) adj.push(s + "-" + (i + 21));
            
            let isReachable = false;
            for (let a of adj) {
                if (visited.has(a)) {
                    isReachable = true; break;
                }
            }
            if (!isReachable && crossEdges[myStr]) {
                for (let cross of crossEdges[myStr]) {
                    if (visited.has(cross)) {
                        isReachable = true; break;
                    }
                }
            }
            if (isReachable) globalReachable.add(myStr);
        }
    }
    return globalReachable;
}

function canRemoveNodeGlobal(nodeIdx, slotId) {
    let targetStr = slotId + "-" + nodeIdx;
    const { visited, activeNodes } = getGlobalReachableActiveNodes(targetStr);
    return visited.size === activeNodes.size;
}

function getGateSide(gateIdx, rotation) {
    // Normal coordinates: N=0, S=20, W=0, E=20
    let x = gateIdx % 21; let y = Math.floor(gateIdx / 21);
    let sides = ["North", "East", "South", "West"];
    let base = 0; // North
    if (y === 20) base = 2; // South
    else if (x === 0) base = 3; // West
    else if (x === 20) base = 1; // East
    
    return sides[(base + rotation) % 4];
}

function getOppositeGateIndex(sideStr, rotation) {
    let sides = ["North", "East", "South", "West"];
    let targetSide = sides[(sides.indexOf(sideStr) + 2) % 4]; // opposite
    let base = sides.indexOf(targetSide); // 0=N, 1=E, 2=S, 3=W
    
    let originalBase = (base - rotation + 4) % 4;
    
    if (originalBase === 0) return 10; // North (10, 0)
    if (originalBase === 1) return 230; // East (20, 10)
    if (originalBase === 2) return 430; // South (10, 20)
    if (originalBase === 3) return 210; // West (0, 10)
    return 10;
}

function calculateBoardPosition(slotIndex) {
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
}

window.initParagonUI = function() {
    if (!D4_PARAGON_DATA) return;
    
    const viewport = document.getElementById('paragon-viewport');
    const surface = document.getElementById('paragon-surface');
    
    if (viewport && surface) {
        // Initial center
        let vRect = viewport.getBoundingClientRect();
        mapPan.x = vRect.width / 2 - 240; // board is roughly 480x480
        mapPan.y = vRect.height / 2 - 240;
        updateSurfaceTransform();

        viewport.addEventListener('mousedown', (e) => {
            if (e.target.closest('.d4-btn') || e.target.closest('.d4-input') || e.target.closest('#paragon-attach-modal')) return;
            isDragging = true;
            lastMouse = { x: e.clientX, y: e.clientY };
            viewport.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            let dx = e.clientX - lastMouse.x;
            let dy = e.clientY - lastMouse.y;
            mapPan.x += dx;
            mapPan.y += dy;
            lastMouse = { x: e.clientX, y: e.clientY };
            updateSurfaceTransform();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if(viewport) viewport.style.cursor = 'grab';
        });

        viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomAmount = 0.1;
            const delta = e.deltaY > 0 ? -1 : 1;
            
            let oldScale = mapScale;
            mapScale += delta * zoomAmount;
            if (mapScale < 0.2) mapScale = 0.2;
            if (mapScale > 2) mapScale = 2;
            
            // Zoom towards mouse
            let vRect = viewport.getBoundingClientRect();
            let mouseX = e.clientX - vRect.left;
            let mouseY = e.clientY - vRect.top;
            
            mapPan.x = mouseX - (mouseX - mapPan.x) * (mapScale / oldScale);
            mapPan.y = mouseY - (mouseY - mapPan.y) * (mapScale / oldScale);
            
            updateSurfaceTransform();
        });
    }

    // Modal Events
    const cancelBtn = document.getElementById('paragon-modal-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('paragon-attach-modal').style.display = 'none';
            pendingAttach = null;
        });
    }
    
    const radiusInput = document.getElementById('paragon-modal-radius');
    if (radiusInput) {
        radiusInput.addEventListener('input', () => {
            if (pendingAttach && document.getElementById('paragon-attach-modal').style.display === 'block') {
                populateBoardModalGrid();
            }
        });
    }
    
    window.attachBoardFromModal = function(boardId) {
        if (boardId && pendingAttach) {
            let emptySlot = -1;
            for(let i=1; i<5; i++) {
                if (!currentBuild.paragon[i] || !currentBuild.paragon[i].boardId) {
                    emptySlot = i; break;
                }
            }
            if (emptySlot === -1) {
                showToast("Max 5 boards reached!");
                return;
            }
            let pData = currentBuild.paragon[emptySlot];
            pData.boardId = boardId;
            pData.rotation = 0;
            let selfGateIdx = getOppositeGateIndex(pendingAttach.gateSide, 0);
            pData.nodes = [selfGateIdx]; // Automatically activate selfGate
            pData.connection = {
                parentSlot: pendingAttach.slot,
                parentGate: pendingAttach.gateIdx,
                selfGate: selfGateIdx
            };
            // Also ensure parentGate is active
            let parentPData = currentBuild.paragon[pendingAttach.slot];
            if (!parentPData.nodes) parentPData.nodes = [];
            if (!parentPData.nodes.includes(pendingAttach.gateIdx)) {
                parentPData.nodes.push(pendingAttach.gateIdx);
            }
            
            document.getElementById('paragon-attach-modal').style.display = 'none';
            pendingAttach = null;
            saveBuild();
            renderParagonGrid();
        }
    };

    // Controls Events
    const select = document.getElementById('paragon-board-select');
    if(select) {
        select.addEventListener('change', (e) => {
            const boardId = e.target.value;
            if (activeParagonSlot === 0) {
                currentBuild.paragon[activeParagonSlot].boardId = boardId;
                currentBuild.paragon[activeParagonSlot].nodes = [];
                saveBuild();
                renderParagonGrid();
            }
        });
    }
    const rotateBtn = document.getElementById('paragon-rotate-btn');
    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            const pData = currentBuild.paragon[activeParagonSlot];
            if (pData && pData.boardId) {
                pData.rotation = ((pData.rotation || 0) + 1) % 4;
                saveBuild();
                renderParagonGrid();
            }
        });
    }
    const removeBtn = document.getElementById('paragon-remove-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            if (activeParagonSlot === 0) {
                showToast("Cannot remove the Start Board.");
                return;
            }
            // Check if any board depends on this one
            for(let i=1; i<5; i++) {
                if (currentBuild.paragon[i].connection && currentBuild.paragon[i].connection.parentSlot === activeParagonSlot && currentBuild.paragon[i].boardId) {
                    showToast("Cannot remove this board because another board is attached to it.");
                    return;
                }
            }
            currentBuild.paragon[activeParagonSlot].boardId = null;
            currentBuild.paragon[activeParagonSlot].nodes = [];
            currentBuild.paragon[activeParagonSlot].connection = { parentSlot: null, parentGate: null, selfGate: null };
            document.getElementById('paragon-board-controls').style.display = 'none';
            saveBuild();
            renderParagonGrid();
        });
    }

    const resetBtn = document.getElementById('reset-paragon-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Reset entirely?")) {
                let startBoardId = currentBuild.paragon[0] ? currentBuild.paragon[0].boardId : null;
                currentBuild.paragon = [
                    { boardId: startBoardId, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: null },
                    { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
                    { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
                    { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
                    { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } }
                ];
                let controls = document.getElementById('paragon-board-controls');
                if (controls) controls.style.display = 'none';
                saveBuild();
                renderParagonGrid();
            }
        });
    }

    renderParagonGrid();
};

function updateSurfaceTransform() {
    const surface = document.getElementById('paragon-surface');
    if (surface) {
        surface.style.transform = `translate(${mapPan.x}px, ${mapPan.y}px) scale(${mapScale})`;
    }
}

window.renderParagonGrid = function() {
    const surface = document.getElementById('paragon-surface');
    if (!surface) return;
    const boardsData = window.D4_PARAGON_DATA.paragonBoards;
    // Enforce Slot 0 Start Board if null
    if (!currentBuild.paragon[0].boardId) {
        let classKey = currentBuild.class.toLowerCase();
        if (classKey === 'necromancer') classKey = 'necro';
        else if (classKey === 'sorcerer') classKey = 'sorc';
        else if (classKey === 'barbarian') classKey = 'barb';
        else if (classKey === 'spiritborn') classKey = 'spirit';
        
        for (const [bId, bData] of Object.entries(boardsData)) {
            let n = (bData.name || "").toLowerCase();
            if (bId.toLowerCase().includes(classKey) && (bId.toLowerCase().includes('start') || bId.toLowerCase().endsWith('_00') || bId.toLowerCase().endsWith('_0') || n.includes('start'))) {
                currentBuild.paragon[0].boardId = bId;
                break;
            }
        }
    }
    
    // Auto-activate start node
    if (currentBuild.paragon[0].boardId) {
        let b0Data = boardsData[currentBuild.paragon[0].boardId];
        if (b0Data) {
            let startIdx = b0Data.nodes.findIndex(n => n && n.toLowerCase().includes('start'));
            if (startIdx !== -1) {
                if (!currentBuild.paragon[0].nodes) currentBuild.paragon[0].nodes = [];
                if (!currentBuild.paragon[0].nodes.includes(startIdx)) {
                    currentBuild.paragon[0].nodes.push(startIdx);
                }
            }
        }
    }
    surface.innerHTML = '';
    
    if (!D4_PARAGON_DATA || !D4_PARAGON_DATA.paragonBoards) {
        return;
    }
    
    // Total spent
    let totalSpent = getTotalParagonPointsSpent();
    if (document.getElementById('paragon-points-spent')) {
        document.getElementById('paragon-points-spent').textContent = totalSpent;
    }

    // Global Pathfinding
    const { visited, crossEdges, activeNodes } = getGlobalReachableActiveNodes();
    const globalReachable = getReachableNodesMap(visited, crossEdges, activeNodes);
    
    // boardsData already declared above
    

    
    // Connected checks
    let isGateConnected = (s, gIdx) => {
        for(let i=1; i<5; i++) {
            let conn = currentBuild.paragon[i].connection;
            if (conn && conn.parentSlot === s && conn.parentGate === gIdx && currentBuild.paragon[i].boardId) return true;
        }
        if (s !== 0 && currentBuild.paragon[s].connection && currentBuild.paragon[s].connection.selfGate === gIdx) return true;
        return false;
    };
    
    for (let s = 0; s < 5; s++) {
        const pData = currentBuild.paragon[s];
        if (!pData || !pData.boardId) continue;
        
        const bData = boardsData[pData.boardId];
        if (!bData) continue;
        
        let pos = calculateBoardPosition(s);
        const boardWrapper = document.createElement('div');
        boardWrapper.style.position = 'absolute';
        boardWrapper.style.left = pos.x + 'px';
        boardWrapper.style.top = pos.y + 'px';
        boardWrapper.style.width = '480px';
        boardWrapper.style.height = '480px';
        boardWrapper.style.display = 'grid';
        boardWrapper.style.gridTemplateColumns = 'repeat(21, 1fr)';
        boardWrapper.style.gridTemplateRows = 'repeat(21, 1fr)';
        boardWrapper.style.gap = '2px';
        boardWrapper.style.padding = '10px';
        boardWrapper.style.background = 'rgba(10,10,10,0.85)';
        boardWrapper.style.border = (activeParagonSlot === s) ? '2px solid #c9a55c' : '2px solid #444';
        boardWrapper.style.borderRadius = '8px';
        boardWrapper.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        
        // Add click listener to select this board in the controls
        boardWrapper.addEventListener('click', (e) => {
            if (e.target === boardWrapper) {
                activeParagonSlot = s;
                renderParagonGrid();
                
                const controls = document.getElementById('paragon-board-controls');
                if (controls) {
                    controls.style.display = 'block';
                    document.getElementById('paragon-active-board-name').textContent = `Slot ${s}: ${bData.name}`;
                    
                    const select = document.getElementById('paragon-board-select');
                    select.disabled = (s !== 0); // Only allow changing board 0, others are fixed once attached? Actually let's just disable it to prevent bugs with connections.
                    select.innerHTML = `<option>${bData.name}</option>`;
                }
            }
        });

        const rotation = pData.rotation || 0;
        
        for (let vIdx = 0; vIdx < 441; vIdx++) {
            let dataIdx = vIdx;
            const vX = vIdx % 21;
            const vY = Math.floor(vIdx / 21);
            
            if (rotation === 1) dataIdx = (20 - vX) * 21 + vY;
            else if (rotation === 2) dataIdx = (20 - vY) * 21 + (20 - vX);
            else if (rotation === 3) dataIdx = vX * 21 + (20 - vY);
            
            const cell = document.createElement('div');
            cell.className = 'paragon-node';
            cell.dataset.index = dataIdx;
            
            const nodeName = bData.nodes[dataIdx];
            if (!nodeName) {
                cell.classList.add('empty-space');
            } else {
                let isGate = nodeName.toLowerCase().includes('gate');
                if (isGate) cell.classList.add('type-gate');
                else if (nodeName.toLowerCase().includes('socket')) cell.classList.add('type-glyph');
                else if (nodeName.toLowerCase().includes('legendary') || nodeName.toLowerCase().includes('start')) cell.classList.add('type-legendary');
                else if (nodeName.toLowerCase().includes('rare')) cell.classList.add('type-rare');
                else if (nodeName.toLowerCase().includes('magic')) cell.classList.add('type-magic');
                else cell.classList.add('type-normal');
                
                let myStr = s + "-" + dataIdx;
                if (pData.nodes && pData.nodes.includes(dataIdx)) {
                    cell.classList.add('node-active');
                } else if (!globalReachable.has(myStr)) {
                    cell.classList.add('node-unreachable');
                    cell.style.opacity = '0.3';
                    cell.style.cursor = 'not-allowed';
                }
                
                // Add Gate Visuals if connected
                if (isGate && isGateConnected(s, dataIdx)) {
                    cell.style.boxShadow = '0 0 15px #00e5ff, inset 0 0 10px #00e5ff';
                    cell.style.border = '2px solid #00e5ff';
                }

                cell.addEventListener('mouseenter', () => {
                    if (window.showNodeDetails) window.showNodeDetails(nodeName);
                });
                
                cell.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent board selection
                    
                    if (isGate && !isGateConnected(s, dataIdx)) {
                        // Attempt to attach board
                        let emptySlot = -1;
                        for(let i=1; i<5; i++) {
                            if (!currentBuild.paragon[i] || !currentBuild.paragon[i].boardId) {
                                emptySlot = i; break;
                            }
                        }
                        if (emptySlot === -1) {
                            showToast("You have reached the maximum of 5 boards.");
                        } else {
                            pendingAttach = { slot: s, gateIdx: dataIdx, gateSide: getGateSide(dataIdx, rotation) };
                            populateBoardModalGrid();
                            document.getElementById('paragon-attach-modal').style.display = 'block';
                        }
                        return; // Done
                    }
                    
                    if (!pData.nodes) pData.nodes = [];
                    const idx = pData.nodes.indexOf(dataIdx);
                    
                    if (idx === -1) {
                        if (!globalReachable.has(myStr)) return;
                        if (getTotalParagonPointsSpent() >= 342) {
                            showToast("You have reached the maximum of 342 Paragon Points!");
                            return;
                        }
                        pData.nodes.push(dataIdx);
                        saveBuild();
                        renderParagonGrid();
                    }
                });
                
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault(); // Prevent default right-click menu
                    e.stopPropagation();
                    
                    let isParentGate = false;
                    let attachedChildSlot = -1;
                    for(let i=1; i<5; i++) {
                        let conn = currentBuild.paragon[i].connection;
                        if (conn && conn.parentSlot === s && conn.parentGate === dataIdx && currentBuild.paragon[i].boardId) {
                            isParentGate = true;
                            attachedChildSlot = i;
                            break;
                        }
                    }
                    
                    let isSelfGate = (s !== 0 && currentBuild.paragon[s].connection && currentBuild.paragon[s].connection.selfGate === dataIdx);
                    
                    if (isParentGate || isSelfGate) {
                        let targetSlot = isParentGate ? attachedChildSlot : s;
                        let childData = currentBuild.paragon[targetSlot];
                        if (childData && childData.nodes.length > 1) {
                            showToast("Cannot refund this gate because the attached board has active nodes.");
                            return;
                        }
                        if (confirm("Refund this gate and remove the attached board?")) {
                            let pSlotToClear = -1;
                            let pGateToClear = -1;
                            
                            if (isParentGate) {
                                pSlotToClear = s;
                                pGateToClear = dataIdx;
                            } else {
                                pSlotToClear = currentBuild.paragon[s].connection.parentSlot;
                                pGateToClear = currentBuild.paragon[s].connection.parentGate;
                            }
                            
                            currentBuild.paragon[targetSlot] = { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } };
                            
                            if (pSlotToClear !== -1) {
                                let parentData = currentBuild.paragon[pSlotToClear];
                                if (parentData && parentData.nodes) {
                                    let pIdx = parentData.nodes.indexOf(pGateToClear);
                                    if (pIdx > -1) parentData.nodes.splice(pIdx, 1);
                                }
                            }
                            
                            // Clear floating controls if that board was removed
                            if (activeParagonSlot === targetSlot) {
                                document.getElementById('paragon-board-controls').style.display = 'none';
                                activeParagonSlot = 0;
                            }
                            
                            saveBuild();
                            renderParagonGrid();
                        }
                        return;
                    }
                    
                    if (!pData.nodes) pData.nodes = [];
                    const idx = pData.nodes.indexOf(dataIdx);
                    
                    if (idx > -1) {
                        if (s === 0 && nodeName && nodeName.toLowerCase().includes('start')) {
                            showToast("Cannot remove the starting node.");
                            return;
                        }
                        if (!canRemoveNodeGlobal(dataIdx, s)) {
                            showToast("Cannot remove this node because other active nodes depend on it.");
                            return;
                        }
                        pData.nodes.splice(idx, 1);
                        saveBuild();
                        renderParagonGrid();
                    }
                });
            }
            boardWrapper.appendChild(cell);
        }
        surface.appendChild(boardWrapper);
    }
};

window.showNodeDetails = function(nodeId) {
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

window.calculateParagonStats = function() {
    let stats = {};
    return stats;
};


window.populateBoardModalGrid = function() {
    const grid = document.getElementById('paragon-modal-board-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let radius = parseInt(document.getElementById('paragon-modal-radius').value) || 3;
    let boardsData = window.D4_PARAGON_DATA.paragonBoards;
    let pNodes = window.D4_PARAGON_DATA.paragonNodes;
    
    let matchingBoards = [];
    let classKey = currentBuild.class.toLowerCase();
    if (classKey === 'necromancer') classKey = 'necro';
    else if (classKey === 'sorcerer') classKey = 'sorc';
    else if (classKey === 'barbarian') classKey = 'barb';
    else if (classKey === 'spiritborn') classKey = 'spirit';

    for (const [bId, bd] of Object.entries(boardsData)) {
        if ((bId.toLowerCase().includes(classKey) || bId.toLowerCase().includes('generic')) && !bId.toLowerCase().includes('start')) {
            let used = false;
            for(let i=1; i<5; i++) {
                if(currentBuild.paragon[i] && currentBuild.paragon[i].boardId === bId) used = true;
            }
            if (!used) {
                // Calculate Stats in radius
                let stats = {Str: 0, Int: 0, Will: 0, Dex: 0};
                let socketIdx = bd.nodes.findIndex(n => n && n.toLowerCase().includes('socket'));
                if (socketIdx !== -1) {
                    let sX = socketIdx % 21; let sY = Math.floor(socketIdx / 21);
                    for(let i=0; i<441; i++) {
                        let n = bd.nodes[i];
                        if(!n) continue;
                        let x = i%21; let y = Math.floor(i/21);
                        let dist = Math.abs(x - sX) + Math.abs(y - sY);
                        if (dist <= radius) {
                            let nData = pNodes[n];
                            if (!nData) {
                                if (n.includes('_Str')) stats.Str += 5;
                                if (n.includes('_Int')) stats.Int += 5;
                                if (n.includes('_Will')) stats.Will += 5;
                                if (n.includes('_Dex')) stats.Dex += 5;
                            } else {
                                if (nData.tags) {
                                    let sMap = { 'Search_Strength': 'Str', 'Search_Intelligence': 'Int', 'Search_Willpower': 'Will', 'Search_Dexterity': 'Dex' };
                                    for(let attr of (nData.attributes || [])) {
                                        if (attr.formula && attr.formula.includes('CoreStat')) {
                                            let s = Object.keys(sMap).find(t => nData.tags.includes(t));
                                            if (s) {
                                                let val = 10;
                                                if (attr.formula.includes('Magic')) val = 7;
                                                stats[sMap[s]] += val;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                matchingBoards.push({ id: bId, name: bd.name || bId, stats });
            }
        }
    }
    
    matchingBoards.sort((a, b) => a.name.localeCompare(b.name));
    
    for (const b of matchingBoards) {
        const card = document.createElement('div');
        card.style.background = 'rgba(20, 20, 30, 0.9)';
        card.style.border = '1px solid #445';
        card.style.borderRadius = '4px';
        card.style.padding = '10px';
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.2s';
        
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: #c9a55c; border: 2px solid #521; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #000;">
                    ${b.name.substring(0,2)}
                </div>
                <div style="color: #f0c040; font-weight: bold; font-size: 0.95rem;">${b.name}</div>
            </div>
            <div style="font-size: 0.85rem; color: #aaa;">
                Str: <span style="color: #e8e6e3;">${b.stats.Str}</span> 
                Int: <span style="color: #f0c040;">${b.stats.Int}</span> 
                Will: <span style="color: #e8e6e3;">${b.stats.Will}</span> 
                Dex: <span style="color: #e8e6e3;">${b.stats.Dex}</span>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => { card.style.borderColor = '#c9a55c'; card.style.background = 'rgba(30,30,45,1)'; });
        card.addEventListener('mouseleave', () => { card.style.borderColor = '#445'; card.style.background = 'rgba(20,20,30,0.9)'; });
        card.addEventListener('click', () => {
            attachBoardFromModal(b.id);
        });
        
        grid.appendChild(card);
    }
};
