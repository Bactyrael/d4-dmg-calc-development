import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Bind the charm wheel slots in start()
bind_target = """      box.addEventListener('click', () => openItemModal(slot));
    });"""
bind_replacement = """      box.addEventListener('click', () => openItemModal(slot));
    });

    document.querySelectorAll('.seal-slot, .charm-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            const slotName = slot.dataset.slot;
            openItemModal(slotName);
        });
    });
"""
content = content.replace(bind_target, bind_replacement)

# Render talisman UI in renderEquipment
render_target = """function renderEquipment(className, equipment) {"""
render_replacement = """
function renderTalismanUI() {
    if (!currentBuild.talisman) return;
    
    // Render Seal
    const sealSlot = document.querySelector('.seal-slot');
    if (sealSlot) {
        sealSlot.innerHTML = '';
        if (currentBuild.talisman.seal) {
            sealSlot.innerHTML = `<div style="color: #c17ce2; font-weight: bold; font-size: 0.8rem; text-align: center; margin-top: 15px;">M</div>`;
            sealSlot.style.borderColor = '#c17ce2';
            sealSlot.onmouseenter = (e) => showItemTooltip(currentBuild.talisman.seal, e, 'Seal');
            sealSlot.onmousemove = (e) => moveItemTooltip(e);
            sealSlot.onmouseleave = (e) => hideItemTooltip(e);
        } else {
            sealSlot.style.borderColor = '#444';
            sealSlot.onmouseenter = null;
        }
    }
    
    // Render Charms
    for (let i = 0; i < 6; i++) {
        const charmSlot = document.querySelector(`.charm-slot.charm-${i}`);
        if (charmSlot) {
            charmSlot.innerHTML = '';
            const charmItem = currentBuild.talisman.charms[i];
            if (charmItem) {
                let color = '#a3d9a5'; // Set green
                if (charmItem.rarity === 'mythic') color = '#c17ce2';
                else if (charmItem.isUnique) color = '#c4a96e';
                
                let letter = charmItem.rarity === 'set' ? 'S' : (charmItem.isUnique ? 'U' : 'C');
                charmSlot.innerHTML = `<div style="color: ${color}; font-weight: bold; font-size: 0.8rem; text-align: center; margin-top: 5px;">${letter}</div>`;
                charmSlot.style.borderColor = color;
                charmSlot.onmouseenter = (e) => showItemTooltip(charmItem, e, `Charm ${i+1}`);
                charmSlot.onmousemove = (e) => moveItemTooltip(e);
                charmSlot.onmouseleave = (e) => hideItemTooltip(e);
            } else {
                charmSlot.style.borderColor = '#444';
                charmSlot.onmouseenter = null;
            }
        }
    }
}

function renderEquipment(className, equipment) {
    renderTalismanUI();
"""
content = content.replace(render_target, render_replacement)

# Update openItemModal / renderModalItems for Seal and Charm
modal_target = """    if (slotName === 'Aspect') {
      renderAspectTab(document.getElementById('modal-sidebar-slot-name').dataset.slot || 'Helm');
      return;
    }"""
modal_replacement = """    if (slotName === 'Aspect') {
      renderAspectTab(document.getElementById('modal-sidebar-slot-name').dataset.slot || 'Helm');
      return;
    }
    
    if (slotName === 'Seal') {
      renderSealTab();
      return;
    }
    
    if (slotName.startsWith('Charm')) {
      renderCharmTab(slotName);
      return;
    }
"""
content = content.replace(modal_target, modal_replacement)

# Add renderSealTab and renderCharmTab
render_tabs = """
function getEquippedUniqueCharmCount() {
    if (!currentBuild.talisman) return 0;
    return currentBuild.talisman.charms.filter(c => c && c.isUnique).length;
}

function renderSealTab() {
    const list = document.getElementById('item-modal-select-list');
    if (!list) return;
    list.innerHTML = '';
    
    const noneRow = document.createElement('div');
    noneRow.className = 'item-row';
    noneRow.innerHTML = `<div class="item-icon">?</div><div class="item-name" style="color: #888;">None</div>`;
    noneRow.addEventListener('click', () => selectSeal(null));
    list.appendChild(noneRow);
    
    const seals = window.D4_DATABASE?.seals || [];
    seals.forEach(item => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `<div class="item-icon" style="color: #c17ce2;">M</div><div class="item-name rarity-mythic">${item.name}</div>`;
        row.addEventListener('click', () => selectSeal(item));
        row.addEventListener('mouseenter', (e) => showItemTooltip(item, e, 'Seal'));
        row.addEventListener('mousemove', (e) => { if(typeof moveItemTooltip === 'function') moveItemTooltip(e); });
        row.addEventListener('mouseleave', (e) => hideItemTooltip(e));
        list.appendChild(row);
    });
}

function renderCharmTab(slotName) {
    const list = document.getElementById('item-modal-select-list');
    if (!list) return;
    list.innerHTML = '';
    
    const noneRow = document.createElement('div');
    noneRow.className = 'item-row';
    noneRow.innerHTML = `<div class="item-icon">?</div><div class="item-name" style="color: #888;">None</div>`;
    noneRow.addEventListener('click', () => selectCharm(null, slotName));
    list.appendChild(noneRow);
    
    let canEquipMoreUniques = true;
    let uniqueLimit = (currentBuild.talisman?.seal?.name === 'Seal of the Golden Epiphany') ? 3 : 1;
    let currentUniqueCount = getEquippedUniqueCharmCount();
    
    // Check if the current slot already has a unique charm
    const charmIdx = parseInt(slotName.split(' ')[1]) - 1;
    const currentSlotItem = currentBuild.talisman?.charms[charmIdx];
    if (currentSlotItem && currentSlotItem.isUnique) {
        currentUniqueCount--; // Don't count the item we are replacing against the limit
    }
    
    if (currentUniqueCount >= uniqueLimit) {
        canEquipMoreUniques = false;
    }
    
    const charms = window.D4_DATABASE?.charms || [];
    charms.forEach(item => {
        const row = document.createElement('div');
        row.className = 'item-row';
        
        let color = '#a3d9a5'; // Set green
        let letter = 'S';
        let rarityClass = 'rarity-set';
        
        if (item.rarity === 'mythic') { color = '#c17ce2'; letter = 'M'; rarityClass = 'rarity-mythic'; }
        else if (item.isUnique) { color = '#c4a96e'; letter = 'U'; rarityClass = 'rarity-unique'; }
        
        row.innerHTML = `<div class="item-icon" style="color: ${color};">${letter}</div><div class="item-name ${rarityClass}">${item.name}</div>`;
        
        if (item.isUnique && !canEquipMoreUniques) {
            row.style.opacity = '0.5';
            row.style.cursor = 'not-allowed';
            row.title = `You can only equip ${uniqueLimit} Unique Charm(s).`;
        } else {
            row.addEventListener('click', () => selectCharm(item, slotName));
        }
        
        row.addEventListener('mouseenter', (e) => showItemTooltip(item, e, slotName));
        row.addEventListener('mousemove', (e) => { if(typeof moveItemTooltip === 'function') moveItemTooltip(e); });
        row.addEventListener('mouseleave', (e) => hideItemTooltip(e));
        
        list.appendChild(row);
    });
}

function selectSeal(item) {
    if (!currentBuild.talisman) currentBuild.talisman = { seal: null, charms: [null, null, null, null, null, null] };
    currentBuild.talisman.seal = item;
    
    // Check if we need to unequip unique charms because limit dropped
    let uniqueLimit = (item && item.name === 'Seal of the Golden Epiphany') ? 3 : 1;
    let uniqueCount = 0;
    for (let i = 0; i < 6; i++) {
        if (currentBuild.talisman.charms[i] && currentBuild.talisman.charms[i].isUnique) {
            uniqueCount++;
            if (uniqueCount > uniqueLimit) {
                currentBuild.talisman.charms[i] = null; // Unequip it
            }
        }
    }
    
    saveBuild();
    document.getElementById('item-selection-modal').style.display = 'none';
    renderTalismanUI();
    calculate();
}

function selectCharm(item, slotName) {
    if (!currentBuild.talisman) currentBuild.talisman = { seal: null, charms: [null, null, null, null, null, null] };
    const idx = parseInt(slotName.split(' ')[1]) - 1;
    currentBuild.talisman.charms[idx] = item;
    
    saveBuild();
    document.getElementById('item-selection-modal').style.display = 'none';
    renderTalismanUI();
    calculate();
}
"""
content = content.replace("function renderSelectTab", render_tabs + "\nfunction renderSelectTab")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated UI bindings for Talisman")
