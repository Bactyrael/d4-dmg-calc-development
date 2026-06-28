import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update maxSockets logic in renderEditTab FIRST before we insert helpers
old_edit_tab = re.search(r'let maxSockets = 2; // Default to 2 for helm, chest, pants.*?if \(maxSockets === 0\) return \'\';', text, re.DOTALL)
if old_edit_tab:
    text = text.replace(old_edit_tab.group(0), "let maxSockets = getMaxSockets(slotName, itemObj);\n        if (maxSockets === 0) return '';")

# Add helper functions
helpers = '''
function getMaxSockets(slotName, itemObj) {
    const lowerSlot = slotName.toLowerCase();
    let maxSockets = 2; // HELPER: Default to 2 for helm, chest, pants
    
    if (lowerSlot.includes('glove') || lowerSlot.includes('boot')) {
      maxSockets = 0;
    } else if (lowerSlot.includes('ring') || lowerSlot.includes('amulet') || lowerSlot.includes('offhand') || lowerSlot.includes('dual wield') || lowerSlot.includes('slicing')) {
      maxSockets = 1;
    } else if (lowerSlot.includes('mainhand') || lowerSlot.startsWith('weapon') || lowerSlot.includes('ranged weapon')) {
      if (lowerSlot.includes('bludgeoning') || lowerSlot.includes('weapon 2 (slashing)') || lowerSlot.includes('ranged weapon')) {
        maxSockets = 2;
      } else if (typeof checkIs2H === 'function' && checkIs2H(itemObj, slotName)) {
        maxSockets = 2;
      } else {
        maxSockets = 1;
      }
    }
    return maxSockets;
}

function getSlotBackgroundImage(slotName, itemObj) {
    let imgName = '';
    const defaults = {
      'Helm': 'default_helm.png',
      'Chest Armor': 'default_chest_armor.png',
      'Gloves': 'default_gloves.png',
      'Pants': 'default_pants.png',
      'Boots': 'default_boots.png',
      'Amulet': 'default_amulet.png',
      'Left Ring': 'default_left_ring.png',
      'Right Ring': 'default_right_ring.png',
      'Mainhand': 'default_one_handed_sword.png',
      'Offhand': 'default_focus.png',
      'Ranged Weapon': 'default_two_handed_sword.png',
      'Bludgeoning Weapon': 'default_two_handed_mace.png',
      'Slicing Weapon': 'default_one_handed_sword.png',
      'Weapon 1': 'default_one_handed_mace.png',
      'Weapon 2': 'default_one_handed_sword.png'
    };
    imgName = defaults[slotName] || 'default_one_handed_sword.png';
    
    if (itemObj && itemObj.name && itemObj.name !== 'Empty') {
      let dbSlotName = slotName;
      if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
      if (slotName === 'Ranged Weapon' || slotName.startsWith('Weapon') || slotName.endsWith('Weapon')) dbSlotName = 'Mainhand';
      
      const dbItems = window.D4_DATABASE?.itemDatabase?.[dbSlotName] || window.D4_DATABASE?.itemDatabase?.['Mainhand'] || [];
      const baseItem = dbItems.find(i => i.name === itemObj.name);
      
      if (baseItem) {
        const type = (baseItem.weaponType || baseItem.type || '').toLowerCase();
        if (type.includes('wand')) imgName = 'default_wand.png';
        else if (type.includes('dagger')) imgName = 'default_dagger.png';
        else if (type.includes('two-handed scythe')) imgName = 'default_two_handed_scythe.png';
        else if (type.includes('two-handed axe')) imgName = 'default_two_handed_axe.png';
        else if (type.includes('two-handed mace')) imgName = 'default_two_handed_mace.png';
        else if (type.includes('two-handed sword')) imgName = 'default_two_handed_sword.png';
        else if (type.includes('scythe')) imgName = 'default_one_handed_scythe.png';
        else if (type.includes('axe')) imgName = 'default_one_handed_axe.png';
        else if (type.includes('mace')) imgName = 'default_one_handed_mace.png';
        else if (type.includes('sword') || type.includes('blade')) imgName = 'default_one_handed_sword.png';
        else if (type.includes('shield')) imgName = 'default_shield.png';
        else if (type.includes('focus')) imgName = 'default_focus.png';
        else if (type.includes('totem')) imgName = 'default_focus.png';
      }
    }
    
    const clsE = document.getElementById('class-select');
    const clsName = clsE ? clsE.textContent : 'Necromancer';
    return `assets/images/${clsName}/slots/${imgName}`;
}
'''
if 'function getMaxSockets' not in text:
    text = text.replace('function renderEquipment', helpers + '\nfunction renderEquipment')


# Remove icon text content
text = re.sub(r"if \(slot === 'Left Ring' \|\| slot === 'Right Ring'\) icon\.textContent = 'R';\s*else icon\.textContent = slot\.substring\(0, 2\)\.toUpperCase\(\);", '', text)

# Set icon background
text = re.sub(r"(icon\.className = 'paperdoll-slot-icon';)(.*?)(// Icon placeholder)", r"\1\n      icon.style.backgroundImage = `url('${getSlotBackgroundImage(slot, savedEquipment[slot])}')`;\n      icon.style.backgroundSize = 'cover';\n      icon.style.backgroundPosition = 'center';\n\2\3", text, flags=re.DOTALL)

# Replace socket rendering
old_sock = re.search(r"if \(val && val\.sockets\) \{.*?val\.sockets\.forEach\(gem => \{.*?socketContainer\.appendChild\(circle\);\s*\}\);\s*\}", text, re.DOTALL)
if old_sock:
    new_sock = '''let maxSockets = getMaxSockets(slot, val || {});
      for (let i = 0; i < maxSockets; i++) {
        const gem = (val && val.sockets && val.sockets[i]) ? val.sockets[i] : null;
        const circle = document.createElement('div');
        if (gem) {
            circle.className = 'socket-circle filled';
            circle.title = gem;
            if (gem.includes('Ruby')) circle.style.background = '#e74c3c';
            else if (gem.includes('Amethyst')) circle.style.background = '#9b59b6';
            else if (gem.includes('Emerald')) circle.style.background = '#2ecc71';
            else if (gem.includes('Topaz')) circle.style.background = '#f1c40f';
            else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
            else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
            else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
        } else {
            circle.className = 'socket-circle empty';
            circle.title = 'Empty Socket';
        }
        socketContainer.appendChild(circle);
      }'''
    text = text.replace(old_sock.group(0), new_sock)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(text)
print('Updated app.js successfully.')
