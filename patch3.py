import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r"let isGateConnected = \(s, gIdx\) => \{[\s\S]*?return false;\s*\};"
replacement = r"""let isGateConnected = (s, gIdx) => {
          let str = s + "-" + gIdx;
          return crossEdges[str] && crossEdges[str].length > 0;
      };"""

if re.search(pattern, js):
    js = re.sub(pattern, replacement, js)
    with open('paragon_logic.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Patched isGateConnected.")
else:
    print("Pattern not found.")
