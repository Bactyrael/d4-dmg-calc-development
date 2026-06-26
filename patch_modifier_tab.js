const fs = require('fs');
let appStr = fs.readFileSync('app.js', 'utf8');

const modifierTabCode = `
  function renderModifierTab(slotName, type, query = '') {
    const list = document.getElementById('item-modal-modifier-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Get current class
    const currentClassVal = document.getElementById('class-select').value;
    const classIdx = D4_CLASS_MAP[currentClassVal];

    // Get base item to pass to isAffixAllowedForSlot
    const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"]\`);
    let itemObj = { name: '' };
    if (box && box.dataset.value) {
      try { itemObj = JSON.parse(box.dataset.value); } catch(e) {}
    }
    const baseItemDef = window.D4_DATABASE.itemDatabase[slotName]?.find(i => i.name === itemObj.name) || {};

    function isAffixAllowedForSlot(affix, slotName) {
      if (affix.targetSpeeds && baseItemDef.weaponSpeed !== undefined) {
        if (!affix.targetSpeeds.includes(baseItemDef.weaponSpeed)) return false;
      }
      const affixSlots = affix.slots;
      if (!affixSlots || affixSlots.length === 0) return true; // generic
      let mapped = slotName.toLowerCase();
      if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
      if (mapped === 'chest armor') mapped = 'chest';
      if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2' || mapped === 'ranged weapon') {
         if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';
      }
      return affixSlots.some(s => {
        const ms = s.toLowerCase();
        if (mapped === 'ring' && (ms === 'ring1' || ms === 'ring2')) return true;
        if (mapped === 'mainhand' && (ms === 'mainhand' || ms === '2h-slashing' || ms === '2h-bludgeoning' || ms === '2h-ranged')) return true; 
        if (mapped === 'offhand' && (ms === 'offhand' || ms === 'shield')) return true;
        return ms === mapped;
      });
    }

    // Filter logic
    let items = (window.D4_DATABASE?.affixes || []).filter(a => {
      // Filter by class
      if (classIdx !== undefined && a.classes && a.classes[classIdx] !== 1) return false;
      // Filter by Tempering vs Affix vs Transfigure
      if (type === 'temper' && !a.tempering) return false;
      if (type === 'affix' && a.tempering) return false;
      if (type === 'transfigure') {
        if (a.tempering) return false;
      }
      // Filter by slot
      if (!isAffixAllowedForSlot(a, slotName)) return false;
      // Filter by Search Query
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    if (items.length === 0) {
      list.innerHTML = '<div style="padding: 20px; color: #888; text-align: center;">No modifiers found.</div>';
      return;
    }

    items.forEach(a => {
      const card = document.createElement('div');
      card.className = 'item-card';
      
      const title = document.createElement('div');
      title.className = 'item-card-title';
      title.textContent = a.name;
      
      const desc = document.createElement('div');
      desc.className = 'item-card-desc';
      desc.innerHTML = a.desc || '';
      
      card.appendChild(title);
      card.appendChild(desc);
      
      card.addEventListener('click', () => {
        const editing = window.currentModifierEditing;
        if (!editing) return;
        
        let targetObj = itemObj;
        if (editing.type === 'affix') {
          if (!targetObj.affixes) targetObj.affixes = [];
          targetObj.affixes[editing.idx] = a.name;
        } else if (editing.type === 'temper') {
          if (!targetObj.tempering) targetObj.tempering = [];
          targetObj.tempering[editing.idx] = a.name;
        } else if (editing.type === 'transfigure') {
          if (!targetObj.transfigure) targetObj.transfigure = [];
          targetObj.transfigure[editing.idx] = a.name;
        }
        
        box.dataset.value = JSON.stringify(targetObj);
        calculate();
        switchModalTab('edit');
        renderEditTab(slotName);
      });
      
      list.appendChild(card);
    });
  }

  // Setup search input listener for modifiers
  document.addEventListener('DOMContentLoaded', () => {
    const modifierSearchInput = document.getElementById('modifier-search-input');
    if (modifierSearchInput) {
      modifierSearchInput.addEventListener('input', (e) => {
        if (window.currentModifierEditing) {
          renderModifierTab(window.currentModifierEditing.slotName, window.currentModifierEditing.type, e.target.value);
        }
      });
    }
  });
`;

if (!appStr.includes('function renderModifierTab')) {
  appStr += '\n' + modifierTabCode + '\n';
  fs.writeFileSync('app.js', appStr);
  console.log("Successfully injected renderModifierTab logic.");
} else {
  console.log("Already injected.");
}
