import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update isGateConnected
old_gate = """      // Connected checks
      let isGateConnected = (s, gIdx) => {
          for(let i=1; i<5; i++) {
              let conn = currentBuild.paragon[i].connection;
              if (conn && conn.parentSlot === s && conn.parentGate === gIdx && currentBuild.paragon[i].boardId) return true;
          }
          if (s !== 0 && currentBuild.paragon[s].connection && currentBuild.paragon[s].connection.selfGate === gIdx) return true;
          return false;
      };"""

new_gate = """      // Connected checks (using Implicit Grid pathfinding)
      let isGateConnected = (s, gIdx) => {
          let str = s + "-" + gIdx;
          return crossEdges[str] && crossEdges[str].length > 0;
      };"""
js = js.replace(old_gate, new_gate)

# 2. Update node rendering to make unreachable active nodes red
old_render = """                  if (pData.nodes && pData.nodes.includes(dataIdx)) {
                      cell.classList.add('node-active');
                  } else if (!globalReachable.has(myStr)) {
                      cell.classList.add('node-unreachable');
                      cell.style.opacity = '0.3';
                      cell.style.cursor = 'not-allowed';
                  }"""

new_render = """                  if (pData.nodes && pData.nodes.includes(dataIdx)) {
                      cell.classList.add('node-active');
                      if (!visited.has(myStr) && !myStr.toLowerCase().includes('start')) { // If it's active but unreachable!
                          cell.style.boxShadow = '0 0 10px #ff2222, inset 0 0 8px #ff2222';
                          cell.style.border = '1px solid #ff2222';
                      }
                  } else if (!globalReachable.has(myStr)) {
                      cell.classList.add('node-unreachable');
                      cell.style.opacity = '0.3';
                      cell.style.cursor = 'not-allowed';
                  }"""
js = js.replace(old_render, new_render)

# 3. Prevent clicking/removing nodes if it breaks things, but wait!
# If a node is active but unreachable (red), can the user remove it?
# Yes! `canRemoveNodeGlobal` checks if removing it breaks the graph.
# But if it's ALREADY unreachable, removing it doesn't break the reachable graph.
# Actually, if it's unreachable, `canRemoveNodeGlobal` might return false because `visited.size !== activeNodes.size`.
# Wait, `getGlobalReachableActiveNodes(targetStr)` checks if all active nodes are reachable.
# If they are already NOT all reachable, then `visited.size` will NEVER equal `activeNodes.size`, so it returns false!
# We need to change `canRemoveNodeGlobal`!
old_canRemove = """function canRemoveNodeGlobal(nodeIdx, slotId) {
    let targetStr = slotId + "-" + nodeIdx;
    const { visited, activeNodes } = getGlobalReachableActiveNodes(targetStr);
    return visited.size === activeNodes.size;
}"""

new_canRemove = """function canRemoveNodeGlobal(nodeIdx, slotId) {
    let targetStr = slotId + "-" + nodeIdx;
    const before = getGlobalReachableActiveNodes();
    const after = getGlobalReachableActiveNodes(targetStr);
    // If removing it doesn't reduce the number of reachable active nodes (other than itself), it's fine to remove!
    return after.visited.size >= before.visited.size - 1;
}"""
js = js.replace(old_canRemove, new_canRemove)


with open('paragon_logic.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Render logic and gate connection logic patched.")
