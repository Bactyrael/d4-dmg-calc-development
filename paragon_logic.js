
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

// Global Palet isPanning = false;
let startPanX = 0, startPanY = 0;

// Expose these for external stat compilers (like app.js)
window.getActiveLegendaryPowers = function() {
    let powers = [];
    if (!window.D4_PARAGON_DATA) return powers;

    let activeReachableNodes = getGlobalReachableActiveNodes();
    if (!activeReachableNodes || !activeReachableNodes.visited) return powers;

    let glyphsActive = [];
  
  for (let s = 0; s < 5; s++) {
      let pData = currentBuild.paragon[s];
      if (pData && pData.boardId && pData.glyph && pData.glyph.id && pData.nodes) {
          let bData = window.D4_PARAGON_DATA.paragonBoards[pData.boardId];
          let socketDataIdx = -1;
          for (let i = 0; i < 441; i++) {
              if (bData && bData.nodes[i] && bData.nodes[i].toLowerCase().includes('socket') && pData.nodes.includes(i)) {
                  socketDataIdx = i;
                  break;
              }
          }
          if (socketDataIdx !== -1) {
              let lvl = pData.glyph.level || 1;
              let radius = 3;
              if (lvl >= 25 && lvl <= 49) radius = 4;
              else if (lvl >= 50) radius = 5;
              
              let socketX = socketDataIdx % 21;
              let socketY = Math.floor(socketDataIdx / 21);
              
              glyphsActive.push({ slotId: s, id: pData.glyph.id, level: lvl, radius: radius, x: socketX, y: socketY });
          }
      }
  }

  activeReachableNodes.visited.forEach(nodeStr => {
        let parts = nodeStr.split('-');
        let slotId = parseInt(parts[0]);
        let dataIdx = parseInt(parts[1]);
        
        let boardState = currentBuild.paragon[slotId];
        if (!boardState || !boardState.boardId) return;
        
        let bData = window.D4_PARAGON_DATA.paragonBoards[boardState.boardId];
        if (!bData || !bData.nodes[dataIdx]) return;
        
        let nodeName = bData.nodes[dataIdx];
        let nodeInfo = window.D4_PARAGON_DATA.paragonNodes[nodeName];
        if (nodeInfo && nodeInfo.power) {
            powers.push(nodeInfo.power);
        }
    });

    return powers;
};

window.cleanAttributeDescription = function(desc, rawValue) {
    if (!desc) return { name: "Unknown Stat", value: rawValue, isPercent: false };
    
    // Extract base name by stripping format blocks
    let statName = desc.replace(/\[.*?\]/g, '').replace(/^[+-\s]+/, '').trim();
    
    let isPercent = false;
    let scaledValue = rawValue;
    
    // e.g. [{value}*100|%|]
    let match = desc.match(/\[\{(.*?)\}\*?(\d*)\|?(.*?)\|\]/);
    if (match) {
        let mult = parseFloat(match[2]);
        if (!isNaN(mult)) scaledValue = rawValue * mult;
        if (match[3] && match[3].includes('%')) isPercent = true;
    }
    
    if (desc.includes('*100')) {
        scaledValue = rawValue * 100;
    }
    if (desc.includes('|%|') || desc.includes('%')) {
        isPercent = true;
    }
    
    return { name: statName, value: scaledValue, isPercent };
};

window.getCompiledParagonStats = function() {
  let stats = {};
  
  if (!window.D4_PARAGON_FORMULAS || !window.D4_PARAGON_DATA) return stats;

  let activeReachableNodes = getGlobalReachableActiveNodes();

  activeReachableNodes.visited.forEach(nodeStr => {
    let parts = nodeStr.split('-');
    let slotId = parseInt(parts[0]);
    let dataIdx = parseInt(parts[1]);
    
    let boardState = currentBuild.paragon[slotId];
    if (!boardState || !boardState.boardId) return;
    
    let bData = window.D4_PARAGON_DATA.paragonBoards[boardState.boardId];
    if (!bData || !bData.nodes[dataIdx]) return;
    
    let nodeName = bData.nodes[dataIdx];
    let nodeInfo = window.D4_PARAGON_DATA.paragonNodes[nodeName];
    if (!nodeInfo || !nodeInfo.attributes) return;
    
    nodeInfo.attributes.forEach(attr => {
      let formArray = window.D4_PARAGON_FORMULAS.attributeFormulas[attr.formula];
      if (!formArray || formArray.length === 0) return;
      
      let rawFormula = formArray[0].formula;
      let rawValue = parseFloat(rawFormula);
      if (isNaN(rawValue)) return; // fallback for complex formulas
      
      let attrMeta = window.D4_PARAGON_FORMULAS.attributes[attr.id];
      if (!attrMeta) return;
      
      let internalName = attrMeta.name;
      let descString = window.D4_PARAGON_FORMULAS.attributeDescriptions[internalName];
      if (!descString) return;
      
      let parsed = window.cleanAttributeDescription(descString, rawValue);
      
      if (!stats[parsed.name]) {
        stats[parsed.name] = { value: 0, isPercent: parsed.isPercent };
      }
      stats[parsed.name].value += parsed.value;
    });
  });
  
  return stats;
};

// Graph Logic
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
    const before = getGlobalReachableActiveNodes();
    const after = getGlobalReachableActiveNodes(targetStr);
    // If removing it doesn't reduce the number of reachable active nodes (other than itself), it's fine to remove!
    return after.visited.size >= before.visited.size - 1;
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
    let pData = currentBuild.paragon[slotIndex];
    if (!pData || pData.boardId === null) return { x: 0, y: 0 };
    return { x: (pData.gridX || 0) * 480, y: (pData.gridY || 0) * 480 };
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
            
              let parentData = currentBuild.paragon[pendingAttach.slot];
              let pGridX = parentData.gridX || 0;
              let pGridY = parentData.gridY || 0;
              let side = pendingAttach.gateSide;
              
              pData.gridX = pGridX;
              pData.gridY = pGridY;
              if (side === "North") pData.gridY -= 1;
              if (side === "South") pData.gridY += 1;
              if (side === "East") pData.gridX += 1;
              if (side === "West") pData.gridX -= 1;
              
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
          let str = s + "-" + gIdx;
          return crossEdges[str] && crossEdges[str].length > 0;
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
        
        // Add Board Label (Number + Name) in top left
        const boardLabel = document.createElement('div');
        boardLabel.style.position = 'absolute';
        boardLabel.style.top = '10px';
        boardLabel.style.left = '10px';
        boardLabel.style.display = 'flex';
        boardLabel.style.alignItems = 'center';
        boardLabel.style.gap = '10px';
        boardLabel.style.zIndex = '5';
        boardLabel.style.pointerEvents = 'none'; // click through to the board
        
        let numSquare = document.createElement('div');
        numSquare.style.width = '24px';
        numSquare.style.height = '24px';
        numSquare.style.border = (activeParagonSlot === s) ? '1px solid #c9a55c' : '1px solid #ff2222';
        if (s === 0) numSquare.style.borderColor = '#c9a55c'; // Start board always gold? Or match red
        numSquare.style.display = 'flex';
        numSquare.style.alignItems = 'center';
        numSquare.style.justifyContent = 'center';
        numSquare.style.color = '#fff';
        numSquare.style.fontWeight = 'bold';
        numSquare.style.fontSize = '1.1rem';
        numSquare.style.textShadow = '0 0 5px #000';
        numSquare.textContent = (s + 1).toString();
        if (s === 0) numSquare.textContent = '1';
        
        let nameText = document.createElement('div');
        nameText.style.color = '#c9a55c';
        nameText.style.fontWeight = 'bold';
        nameText.style.fontSize = '1.1rem';
        nameText.style.textShadow = '0 0 5px #000';
        nameText.textContent = bData.name || "Start";
        
        boardLabel.appendChild(numSquare);
        boardLabel.appendChild(nameText);
        boardWrapper.appendChild(boardLabel);
        
        // Add click listener to select this board in the controls
        boardWrapper.addEventListener('click', (e) => {
            if (e.target === boardWrapper) {
                activeParagonSlot = s;
                renderParagonGrid();
                
                const controls = document.getElementById('paragon-board-controls');
                if (controls) {
                    controls.style.display = 'block';
                    document.getElementById('paragon-active-board-name').textContent = `Slot ${s}: ${bData.name}`;
                    
                    let rotBtn = document.getElementById('paragon-rotate-btn');
                    let remBtn = document.getElementById('paragon-remove-btn');
                    if (rotBtn) rotBtn.style.display = (s === 0) ? 'none' : 'inline-block';
                    if (remBtn) remBtn.style.display = (s === 0) ? 'none' : 'inline-block';
                    
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
                let isActive = pData.nodes && pData.nodes.includes(dataIdx);
                
                if (isActive) {
                    cell.classList.add('node-active');
                    if (!globalReachable.has(myStr)) {
                        cell.style.backgroundColor = '#ff4444'; // Red for disconnected path
                        cell.style.boxShadow = '0 0 10px #ff4444';
                        cell.style.borderColor = '#ff4444';
                    }
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
                    if (window.showNodeDetails) window.showNodeDetails(nodeName, s);
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
                    
                    if (nodeName.toLowerCase().includes('socket') && idx !== -1) {
                        showToast("Opening Glyph Menu...");
                        try {
                            if (window.openGlyphModal) {
                                window.openGlyphModal(s, dataIdx);
                            } else {
                                showToast("openGlyphModal is not defined!");
                            }
                        } catch (err) {
                            showToast("Error opening glyph menu: " + err.message);
                        }
                        return;
                    }
                    
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

window.renderGlyphTooltip = function(glyphId, level) {
    if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) return "";
    let g = window.D4_PARAGON_DATA.paragonGlyphs[glyphId];
    if (!g) {
        let found = Object.values(window.D4_PARAGON_DATA.paragonGlyphs).find(glyph => glyph.id == glyphId);
        if (found) g = found;
        else return "";
    }
    
    let gRarity = level >= 46 ? 'Legendary' : 'Rare';
    let color = level >= 46 ? '#e67e22' : '#f1c40f';
    
    let html = `<div style="font-family: Arial, sans-serif; min-width: 250px;">
        <div style="text-align: center; margin-bottom: 12px;">
            <div style="color: #c9a55c; font-size: 0.9rem; margin-bottom: 2px;">${gRarity} Glyph</div>
            <h3 style="margin: 0; color: ${color}; font-size: 1.3rem; text-shadow: 1px 1px 2px #000;">${g.name}</h3>
            <div style="color: #ddd; font-weight: bold; font-size: 0.9rem; margin-top: 4px; border-bottom: 1px solid #444; padding-bottom: 4px;">LEVEL ${level}</div>
        </div>`;
        
    let radius = 3;
    if (level >= 25 && level <= 49) radius = 4;
    else if (level >= 50) radius = 5;
    
    html += `<div style="color: #c9a55c; font-size: 0.95rem; margin-bottom: 4px;">Radius Size: <span style="color: #fff;">${radius}</span></div>`;
    if (radius === 5) {
        html += `<div style="color: #e67e22; font-size: 0.85rem; margin-bottom: 10px;">&bull; Radius size is at max.</div>`;
    }
    
    let formatDesc = (desc, val) => {
        if (!desc) return "";
        let d = desc.replace(/\{c_[^}]+\}/g, '<span style="color: #fff; font-weight: bold;">');
        d = d.replace(/\{\/c\}/g, '</span>');
        
        // Handle bold and underline tags
        d = d.replace(/\{u\}/g, '<u style="border-bottom: 1px dotted #ccc; text-decoration: none;">');
        d = d.replace(/\{\/u\}/g, '</u>');
        d = d.replace(/\{b\}/g, '<b>');
        d = d.replace(/\{\/b\}/g, '</b>');
        
        // Strip unresolvable stat formulas like ([0.03*PlayerHealthMax()||])
        d = d.replace(/\(\[[^\]]+\]\)/g, '');
        
        d = d.replace(/\[\{[^\]]+\]/g, (match) => {
            let isX = match.includes('%x');
            let isPct = match.includes('%');
            let str = val % 1 !== 0 ? val.toFixed(1) : val;
            if (isX) return str + "%[x]";
            if (isPct) return str + "%";
            return str;
        });
        // Clean up escaped brackets like \[x\]
        d = d.replace(/\\\[x\\\]/g, '[x]');
        d = d.replace(/\\\[\+\\\]/g, '[+]');
        return d;
    };
    
    let baseBonuses = [];
    let addBonus = null;
    let reqs = null;
    let legBonus = null;
    
    if (g.affixes && g.affixes.length > 0) {
        g.affixes.forEach(affixKey => {
            let affixData = window.D4_PARAGON_DATA.paragonGlyphAffixes[affixKey];
            if (!affixData) return;
            
            let val = (affixData.base || 0) + ((affixData.perLevel || 0) * (level - 1));
            // Hack for D4 parsing rules:
            if (affixData.operation === 1) val = val / 10;
            else if (affixData.operation === 4) val = val * 100;
            else if (affixData.operation === 5) val = val; // Usually no value needed, text is hardcoded
            else if (affixData.displayFactor) val = val / affixData.displayFactor;
            
            if (affixData.thresholds && affixData.power) {
                let pData = window.D4_PARAGON_DATA.skills ? window.D4_PARAGON_DATA.skills[affixData.power] : null;
                if (pData && pData.desc) {
                    addBonus = formatDesc(pData.desc, val);
                }
                
                let tData = window.D4_PARAGON_DATA.paragonThresholds ? window.D4_PARAGON_DATA.paragonThresholds[affixData.thresholds[0]] : null;
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
        let lColor = level >= 46 ? '#e67e22' : '#777';
        html += `<div style="color: ${lColor}; font-size: 0.9rem; margin-left: 8px; margin-bottom: 4px;"><span style="color: ${lColor};">&starf;</span> ${legBonus}</div>`;
    }

    html += `</div>`;
    return html;
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
        if (bId.toLowerCase().includes(classKey) || bId.toLowerCase().includes('generic')) {
            const bName = (bd.name || bId).toLowerCase();
            const bIdLower = bId.toLowerCase();
            
            // Exclude starter boards (which often have "Start" in the name or end in "_0" / "_00")
            if (bName.includes('start') || bIdLower.includes('start') || bIdLower.endsWith('_00') || bIdLower.endsWith('_0')) {
                continue;
            }
            
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





window.activeGlyphSocket = { slot: -1, nodeIdx: -1 };

window.openGlyphModal = function(slotIdx, nodeIdx) {
    try {
        if (!window.D4_PARAGON_DATA || !window.D4_PARAGON_DATA.paragonGlyphs) {
            showToast("Glyph data not loaded yet.");
            return;
        }
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
    if (grid) grid.innerHTML = '';
    
    let allGlyphs = Object.entries(window.D4_PARAGON_DATA.paragonGlyphs).map(([k, v]) => ({ ...v, stringKey: k }));
    
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
        card.innerHTML = `<h4 style="margin: 0 0 5px 0; color: ${color};">${g.name}</h4>`;
        
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
            currentBuild.paragon[slotIdx].glyph.id = g.stringKey;
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
    } catch(err) {
        console.error(err);
        showToast("Error opening modal: " + err.message);
    }
};

function updateGlyphRadiusDisplay(level) {
    let radius = 3;
    if (level >= 25 && level <= 49) radius = 4;
    else if (level >= 50) radius = 5;
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

