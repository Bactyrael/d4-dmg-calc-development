import sys
import re

def patch():
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update renderSealTab
    pattern1 = r"(function renderSealTab\(\) \{\s*const list = document\.getElementById\('item-modal-list'\);\s*if \(!list\) return;\s*list\.innerHTML = '';)"
    repl1 = r"\1\n        const currentSealItem = currentBuild.talisman?.seal;"
    content = re.sub(pattern1, repl1, content, count=1)
    
    pattern1b = r"(seals\.forEach\(item => \{\s*const row = document\.createElement\('div'\);\s*row\.className = 'item-row';)"
    repl1b = r"\1\n            if (currentSealItem && currentSealItem.name === item.name) {\n                row.style.border = '1px solid #d18a45';\n                row.style.background = 'rgba(209, 138, 69, 0.2)';\n            }"
    content = re.sub(pattern1b, repl1b, content, count=1)
    
    # 2. Update renderCharmTab
    pattern2 = r"(charms\.forEach\(item => \{\s*const row = document\.createElement\('div'\);\s*row\.className = 'item-row';)"
    repl2 = r"\1\n            if (currentSlotItem && currentSlotItem.name === item.name) {\n                row.style.border = '1px solid #d18a45';\n                row.style.background = 'rgba(209, 138, 69, 0.2)';\n            }"
    content = re.sub(pattern2, repl2, content, count=1)
    
    # 3. Update renderEquipment
    pattern3 = r"(footer\.appendChild\(sb\);\s*\}\s*\})"
    repl3 = r"footer.appendChild(sb);\n      }\n      const sealBox = document.querySelector('.equipment-slot-box[data-slot=\"Seal\"]');\n      if (sealBox) {\n          let val = savedEquipment['Seal'];\n          if (typeof val === 'string' && val) val = { name: val, power: 900, quality: 0, rarity: 'legendary' };\n          sealBox.dataset.value = val ? JSON.stringify(val) : '';\n      }\n    }"
    content = re.sub(pattern3, repl3, content, count=1)
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    patch()
