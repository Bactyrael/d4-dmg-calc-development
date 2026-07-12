import sys

def patch():
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update renderSealTab
    target1 = """    function renderSealTab() {
      const list = document.getElementById('item-modal-list');
      if (!list) return;
      list.innerHTML = '';
      
      const noneRow = document.createElement('div');"""
      
    target1_alt = """    function renderSealTab() {
        const list = document.getElementById('item-modal-list');
        if (!list) return;
        list.innerHTML = '';
        
        const noneRow = document.createElement('div');"""
    
    repl1 = """    function renderSealTab() {
        const list = document.getElementById('item-modal-list');
        if (!list) return;
        list.innerHTML = '';
        
        const currentSealItem = currentBuild.talisman?.seal;
        
        const noneRow = document.createElement('div');"""
        
    if target1 in content:
        content = content.replace(target1, repl1)
    elif target1_alt in content:
        content = content.replace(target1_alt, repl1)
        
    target1b = """        seals.forEach(item => {
            const row = document.createElement('div');
            row.className = 'item-row';
            let rarityClass = item.rarity === 'legendary' ? 'rarity-legendary' : 'rarity-mythic';"""
            
    repl1b = """        seals.forEach(item => {
            const row = document.createElement('div');
            row.className = 'item-row';
            if (currentSealItem && currentSealItem.name === item.name) {
                row.style.border = '1px solid #d18a45';
                row.style.background = 'rgba(209, 138, 69, 0.2)';
            }
            let rarityClass = item.rarity === 'legendary' ? 'rarity-legendary' : 'rarity-mythic';"""
    content = content.replace(target1b, repl1b)
    
    # 2. Update renderCharmTab
    target2 = """        charms.forEach(item => {
            const row = document.createElement('div');
            row.className = 'item-row';
            if (item.isUnique && !canEquipMoreUniques && (!currentSlotItem || currentSlotItem.name !== item.name)) {"""
            
    repl2 = """        charms.forEach(item => {
            const row = document.createElement('div');
            row.className = 'item-row';
            if (currentSlotItem && currentSlotItem.name === item.name) {
                row.style.border = '1px solid #d18a45';
                row.style.background = 'rgba(209, 138, 69, 0.2)';
            }
            if (item.isUnique && !canEquipMoreUniques && (!currentSlotItem || currentSlotItem.name !== item.name)) {"""
    content = content.replace(target2, repl2)
    
    # 3. Update renderEquipment
    target3 = """          }
          calculate();
        });
        
        footer.appendChild(sb);
      });
    }"""
    
    repl3 = """          }
          calculate();
        });
        
        footer.appendChild(sb);
      });
      
      const sealBox = document.querySelector('.equipment-slot-box[data-slot="Seal"]');
      if (sealBox) {
          let val = savedEquipment['Seal'];
          if (typeof val === 'string' && val) {
              val = { name: val, power: 900, quality: 0, rarity: 'legendary' };
          }
          sealBox.dataset.value = val ? JSON.stringify(val) : '';
      }
    }"""
    content = content.replace(target3, repl3)
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    patch()
