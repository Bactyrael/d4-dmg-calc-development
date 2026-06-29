import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r"(let\s+pData\s*=\s*currentBuild\.paragon\[emptySlot\];\s*pData\.boardId\s*=\s*boardId;\s*pData\.rotation\s*=\s*0;\s*)(let\s+selfGateIdx\s*=\s*getOppositeGateIndex\(pendingAttach\.gateSide,\s*0\);)"
replacement = r"""\1
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
              
              \2"""

if re.search(pattern, js):
    js = re.sub(pattern, replacement, js)
    with open('paragon_logic.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Patched.")
else:
    print("Pattern not found.")
