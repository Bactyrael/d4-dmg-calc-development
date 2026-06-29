import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

old = """                  const controls = document.getElementById('paragon-board-controls');
                  if (controls) {
                      controls.style.display = 'block';
                      document.getElementById('paragon-active-board-name').textContent = `Slot ${s}: ${bData.name}`;"""

new = """                  const controls = document.getElementById('paragon-board-controls');
                  if (controls) {
                      controls.style.display = 'block';
                      document.getElementById('paragon-active-board-name').textContent = `Slot ${s}: ${bData.name}`;
                      
                      let rotBtn = document.getElementById('paragon-rotate-btn');
                      let remBtn = document.getElementById('paragon-remove-btn');
                      if (rotBtn) rotBtn.style.display = (s === 0) ? 'none' : 'inline-block';
                      if (remBtn) remBtn.style.display = (s === 0) ? 'none' : 'inline-block';"""

if old in js:
    js = js.replace(old, new)
    with open('paragon_logic.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Patched controls.")
else:
    print("Block not found.")
