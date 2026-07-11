import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert stashItem function before selectItem
stash_item_code = """
  function stashItem(slotName, jsonValue) {
      if (!jsonValue) return;
      try {
          const itemObj = JSON.parse(jsonValue);
          if (itemObj && itemObj.name) {
              if (!currentBuild.stash) currentBuild.stash = [];
              itemObj.stashSlot = slotName;
              currentBuild.stash.push(itemObj);
              if (currentBuild.stash.length > 50) {
                  currentBuild.stash.shift();
              }
          }
      } catch(e) {}
  }

  function selectItem(itemName) {"""
content = content.replace("  function selectItem(itemName) {", stash_item_code)

# 2. Modify selectItem to use stashItem for the new item case
select_item_target = """      if (box) {
        const valDiv = box.querySelector('.paperdoll-slot-value');
        if (itemName) {
          let rarity = 'rare';"""
select_item_replacement = """      if (box) {
        const valDiv = box.querySelector('.paperdoll-slot-value');
        if (itemName) {
          const oldVal = box.dataset.value;
          if (oldVal) {
              const oldItem = JSON.parse(oldVal);
              if (oldItem.name !== itemName) stashItem(currentModalSlot, oldVal);
          }
          let rarity = 'rare';"""
content = content.replace(select_item_target, select_item_replacement)

# 3. Two-handed offhand stash
th_offhand_target = """                  if (offhandBox) {
                      delete offhandBox.dataset.value;
                      const offValDiv = offhandBox.querySelector('.paperdoll-slot-value');"""
th_offhand_replacement = """                  if (offhandBox) {
                      stashItem('Offhand', offhandBox.dataset.value);
                      delete offhandBox.dataset.value;
                      const offValDiv = offhandBox.querySelector('.paperdoll-slot-value');"""
content = content.replace(th_offhand_target, th_offhand_replacement)

# 4. Offhand equipping two-handed stash
mh_twohand_target = """                    if (mhFoundItem && mhFoundItem.weaponType && mhFoundItem.weaponType.toLowerCase().includes('two-handed')) {
                        delete mainhandBox.dataset.value;
                        const mhValDiv = mainhandBox.querySelector('.paperdoll-slot-value');"""
mh_twohand_replacement = """                    if (mhFoundItem && mhFoundItem.weaponType && mhFoundItem.weaponType.toLowerCase().includes('two-handed')) {
                        stashItem('Mainhand', mainhandBox.dataset.value);
                        delete mainhandBox.dataset.value;
                        const mhValDiv = mainhandBox.querySelector('.paperdoll-slot-value');"""
content = content.replace(mh_twohand_target, mh_twohand_replacement)

# 5. Empty remove button stash
remove_target = """        renderEditTab(currentModalSlot);
        switchModalTab('edit');
      } else {
        delete box.dataset.value;
        if (valDiv) {"""
remove_replacement = """        renderEditTab(currentModalSlot);
        switchModalTab('edit');
      } else {
        stashItem(currentModalSlot, box.dataset.value);
        delete box.dataset.value;
        if (valDiv) {"""
content = content.replace(remove_target, remove_replacement)

# 6. switchModalTab
switch_tab_target = """  function switchModalTab(tabName) {
      const tabs = document.querySelectorAll('.item-modal-tab');
      const selectTab = tabs[0];
      const editTab = tabs[1];
      
      const selectBody = document.getElementById('item-modal-select-body');
      const editBody = document.getElementById('item-modal-edit-body');
      const aspectBody = document.getElementById('item-modal-aspect-body');
      const modifierBody = document.getElementById('item-modal-modifier-body');
      const temperBody = document.getElementById('item-modal-temper-body');
      const transfigureBody = document.getElementById('item-modal-transfigure-body');
      const gemBody = document.getElementById('item-modal-gem-body');
      
      // Reset all
      [selectTab, editTab].forEach(t => t?.classList.remove('active'));
      [selectBody, editBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });
  
      if (tabName === 'select') {
        selectTab?.classList.add('active');
        if (selectBody) selectBody.style.display = 'flex';
      } else if (tabName === 'edit') {
        editTab?.classList.add('active');
        if (editBody) editBody.style.display = 'flex';"""

switch_tab_replacement = """  function switchModalTab(tabName) {
      const tabs = document.querySelectorAll('.item-modal-tab');
      const selectTab = tabs[0];
      const editTab = tabs[1];
      const stashTab = tabs[2];
      
      const selectBody = document.getElementById('item-modal-select-body');
      const editBody = document.getElementById('item-modal-edit-body');
      const stashBody = document.getElementById('item-modal-stash-body');
      const aspectBody = document.getElementById('item-modal-aspect-body');
      const modifierBody = document.getElementById('item-modal-modifier-body');
      const temperBody = document.getElementById('item-modal-temper-body');
      const transfigureBody = document.getElementById('item-modal-transfigure-body');
      const gemBody = document.getElementById('item-modal-gem-body');
      
      // Reset all
      [selectTab, editTab, stashTab].forEach(t => t?.classList.remove('active'));
      [selectBody, editBody, stashBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });
  
      if (tabName === 'select') {
        selectTab?.classList.add('active');
        if (selectBody) selectBody.style.display = 'flex';
      } else if (tabName === 'edit') {
        editTab?.classList.add('active');
        if (editBody) editBody.style.display = 'flex';
      } else if (tabName === 'stash') {
        stashTab?.classList.add('active');
        if (stashBody) stashBody.style.display = 'flex';
        if (typeof renderStashTab === 'function') renderStashTab(currentModalSlot);"""
content = content.replace(switch_tab_target, switch_tab_replacement)

# 7. Add renderStashTab at the end of file (before the last closing bracket if there is one, or just append)
render_stash_code = """

  function renderStashTab(slotName) {
      const list = document.getElementById('item-modal-stash-body');
      if (!list) return;
      list.innerHTML = '';
      
      if (!currentBuild || !currentBuild.stash || currentBuild.stash.length === 0) {
          list.innerHTML = '<div style="padding: 20px; color: #888; text-align: center;">No items in stash.</div>';
          return;
      }
      
      const validItems = currentBuild.stash.filter(i => i.stashSlot === slotName);
      if (validItems.length === 0) {
          list.innerHTML = '<div style="padding: 20px; color: #888; text-align: center;">No items for this slot in stash.</div>';
          return;
      }
      
      validItems.forEach((itemObj, index) => {
          const card = document.createElement('div');
          card.className = 'item-row';
          
          let displayName = itemObj.name;
          if (itemObj.aspect && itemObj.aspect !== 'None') {
              let cleanAspect = itemObj.aspect;
              if (cleanAspect.startsWith('Aspect of ')) {
                  displayName += ' ' + cleanAspect.replace('Aspect of ', 'of ');
              } else if (cleanAspect.endsWith(' Aspect')) {
                  displayName = cleanAspect.replace(' Aspect', '') + ' ' + displayName;
              } else {
                  displayName += ' (' + cleanAspect + ')';
              }
          }
          
          card.innerHTML = `
              <div class="item-icon rarity-${itemObj.rarity || 'rare'}"></div>
              <div class="item-name rarity-${itemObj.rarity || 'rare'}" style="flex-grow: 1;">
                  ${displayName}
              </div>
              <button class="d4-btn btn-equip" style="margin-right: 10px; padding: 4px 8px; font-size: 12px;">Equip</button>
              <button class="d4-btn btn-delete-stash btn-danger" style="padding: 4px 8px; font-size: 12px;">X</button>
          `;
          
          card.querySelector('.btn-equip').addEventListener('click', (e) => {
              e.stopPropagation();
              
              // Swap with currently equipped item in this slot
              const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
              if (box) {
                  const currentVal = box.dataset.value;
                  box.dataset.value = JSON.stringify(itemObj);
                  
                  const valDiv = box.querySelector('.paperdoll-slot-value');
                  if (valDiv) {
                      valDiv.textContent = itemObj.name;
                      valDiv.className = `paperdoll-slot-value rarity-${itemObj.rarity || 'rare'}`;
                  }
                  
                  // Handle Two-handed unequip logic (optional, simpler version for now)
                  // If we equipped a 2H, unequip offhand
                  const dbItems = getDbItems(slotName);
                  const foundItem = dbItems.find(i => i.name === itemObj.name);
                  if (foundItem && foundItem.weaponType && foundItem.weaponType.toLowerCase().includes('two-handed') && slotName === 'Mainhand') {
                      const offhandBox = document.querySelector(`.equipment-slot-box[data-slot="Offhand"]`);
                      if (offhandBox) {
                          stashItem('Offhand', offhandBox.dataset.value);
                          delete offhandBox.dataset.value;
                          const offValDiv = offhandBox.querySelector('.paperdoll-slot-value');
                          if (offValDiv) {
                              offValDiv.textContent = 'Empty';
                              offValDiv.className = 'paperdoll-slot-value empty';
                          }
                      }
                  }
                  
                  // Remove equipped item from stash array
                  currentBuild.stash.splice(currentBuild.stash.indexOf(itemObj), 1);
                  
                  // Put the currently equipped item into the stash
                  if (currentVal) stashItem(slotName, currentVal);
                  
                  calculate();
                  renderEditTab(slotName);
                  switchModalTab('edit');
              }
          });
          
          card.querySelector('.btn-delete-stash').addEventListener('click', (e) => {
              e.stopPropagation();
              currentBuild.stash.splice(currentBuild.stash.indexOf(itemObj), 1);
              renderStashTab(slotName);
          });
          
          list.appendChild(card);
      });
  }
"""

content += render_stash_code

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Patch applied")
