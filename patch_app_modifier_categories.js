const fs = require('fs');

let appStr = fs.readFileSync('app.js', 'utf8');

const newRenderCode = `
  function getAffixCategory(name) {
    const n = name.toLowerCase();
    if (n.includes('strength') || n.includes('intelligence') || n.includes('willpower') || n.includes('dexterity') || n.includes('all stats')) return 'Core Stats';
    if (n.includes('damage') || n.includes('critical') || n.includes('attack speed') || n.includes('vulnerable') || n.includes('overpower') || n.includes('chance to')) return 'Offensive';
    if (n.includes('armor') || n.includes('life') || n.includes('resistance') || n.includes('dodge') || n.includes('reduction') || n.includes('barrier')) return 'Defensive';
    if (n.includes('movement') || n.includes('cooldown') || n.includes('luck') || n.includes('healing') || n.includes('duration') || n.includes('size')) return 'Utility';
    if (n.includes('essence') || n.includes('mana') || n.includes('fury') || n.includes('spirit') || n.includes('energy') || n.includes('resource') || n.includes('regeneration')) return 'Resource';
    if (n.includes('rank') || n.includes('to ')) return 'Skills';
    return 'Utility';
  }

  function renderModifierTab(slotName, type, query = '', activeCategory = 'All Modifiers') {
    const list = document.getElementById('item-modal-modifier-list');
    if (!list) return;
    list.innerHTML = '';
    
    const currentClassVal = document.getElementById('class-select').value;
    const classIdx = D4_CLASS_MAP[currentClassVal];

    const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"]\`);
    let itemObj = { name: '' };
    if (box && box.dataset.value) {
      try { itemObj = JSON.parse(box.dataset.value); } catch(e) {}
    }
    
    function getDbItems(sName) {
      const keys = Object.keys(window.D4_DATABASE?.itemDatabase || {});
      const match = keys.find(k => k.toLowerCase() === sName.toLowerCase());
      return match ? window.D4_DATABASE.itemDatabase[match] : [];
    }
    
    const baseItemDef = getDbItems(slotName).find(i => i.name === itemObj.name) || {};

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

    let items = (window.D4_DATABASE?.affixes || []).filter(a => {
      if (classIdx !== undefined && a.classes && a.classes[classIdx] !== 1) return false;
      if (type === 'temper' && !a.tempering) return false;
      if (type === 'affix' && a.tempering) return false;
      if (type === 'transfigure') {
        if (a.tempering) return false;
      }
      if (!isAffixAllowedForSlot(a, slotName)) return false;
      if (activeCategory !== 'All Modifiers' && getAffixCategory(a.name) !== activeCategory) return false;
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    // Update sidebar visibility and active state
    document.querySelectorAll('#modifier-sidebar .sidebar-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.category === activeCategory) el.classList.add('active');
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
        let editing = window.currentModifierEditing;
        if (!editing) {
          // If no specific slot was clicked, find the first empty one
          let targetObj = itemObj;
          if (!targetObj.affixes) targetObj.affixes = [];
          let idx = targetObj.affixes.findIndex(x => !x);
          if (idx === -1) idx = Math.min(targetObj.affixes.length, 2); // Max 3 affixes (0,1,2)
          editing = { type: type || 'affix', idx, slotName };
        }
        
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
`;

// Replace from 'function renderModifierTab' up to the end of the file.
const startIndex = appStr.indexOf('function renderModifierTab');
if (startIndex !== -1) {
  const beforeRenderModifier = appStr.substring(0, startIndex);
  
  const restOfCode = `
  // Setup search input listener for modifiers
  document.addEventListener('DOMContentLoaded', () => {
    const modifierSearchInput = document.getElementById('modifier-search-input');
    if (modifierSearchInput) {
      modifierSearchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const activeCat = document.querySelector('#modifier-sidebar .sidebar-item.active')?.dataset.category || 'All Modifiers';
        const type = window.currentModifierEditing ? window.currentModifierEditing.type : 'affix';
        renderModifierTab(currentModalSlot, type, query, activeCat);
      });
    }

    document.querySelectorAll('#modifier-sidebar .sidebar-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.target.dataset.category;
        const query = document.getElementById('modifier-search-input')?.value || '';
        const type = window.currentModifierEditing ? window.currentModifierEditing.type : 'affix';
        renderModifierTab(currentModalSlot, type, query, cat);
      });
    });
  });
`;

  fs.writeFileSync('app.js', beforeRenderModifier + newRenderCode + restOfCode);
}
