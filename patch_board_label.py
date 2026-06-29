import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_block = """          boardWrapper.style.border = (activeParagonSlot === s) ? '2px solid #c9a55c' : '2px solid #444';
          boardWrapper.style.borderRadius = '8px';
          boardWrapper.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
          
          // Add click listener to select this board in the controls"""

new_block = """          boardWrapper.style.border = (activeParagonSlot === s) ? '2px solid #c9a55c' : '2px solid #444';
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
          numSquare.style.border = '1px solid #c9a55c';
          numSquare.style.display = 'flex';
          numSquare.style.alignItems = 'center';
          numSquare.style.justifyContent = 'center';
          numSquare.style.color = '#fff';
          numSquare.style.fontWeight = 'bold';
          numSquare.style.fontSize = '1.1rem';
          numSquare.textContent = (s + 1).toString();
          if (s === 0) numSquare.style.borderColor = '#445'; // Start board might not be highlighted orange, but let's just make it red/gold based on active? No, just match screen.
          
          let nameText = document.createElement('div');
          nameText.style.color = '#c9a55c';
          nameText.style.fontWeight = 'bold';
          nameText.style.fontSize = '1.1rem';
          nameText.textContent = bData.name || "Start";
          if (s === 0 && !bData.name) nameText.textContent = "Start";
          
          boardLabel.appendChild(numSquare);
          boardLabel.appendChild(nameText);
          boardWrapper.appendChild(boardLabel);
          
          // Add click listener to select this board in the controls"""

if old_block in js:
    js = js.replace(old_block, new_block)
    with open('paragon_logic.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Patched board labels.")
else:
    print("Could not find block.")
