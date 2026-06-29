import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_block = """              let pData = currentBuild.paragon[emptySlot];
              pData.boardId = boardId;
              pData.rotation = 0;
              let selfGateIdx = getOppositeGateIndex(pendingAttach.gateSide, 0);
              pData.nodes = [selfGateIdx]; // Automatically activate selfGate
              pData.connection = {
                  parentSlot: pendingAttach.slot,
                  parentGate: pendingAttach.gateIdx,
                  selfGate: selfGateIdx
              };"""

new_block = """              let pData = currentBuild.paragon[emptySlot];
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
              };"""

if old_block in js:
    js = js.replace(old_block, new_block)
    with open('paragon_logic.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Attach logic patched.")
else:
    print("Could not find block.")
