import re

# Patch index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

if 'data-category="Ritual"' not in idx:
    idx = idx.replace('<div class="sidebar-item" data-category="Topaz">Topaz</div>', '<div class="sidebar-item" data-category="Topaz">Topaz</div>\n          <div class="sidebar-item" data-category="Ritual">Ritual Runes</div>\n          <div class="sidebar-item" data-category="Invocation">Invocation Runes</div>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(idx)

# Patch app.js
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Patch renderEditTab socket formatting
old_socket_format = '''const gemObj = window.D4_DATABASE?.gems?.find(g => g.name === gemName);
            let effectStr = gemName;
            if (gemObj) {'''
new_socket_format = '''const gemObj = window.D4_DATABASE?.gems?.find(g => g.name === gemName);
            const runeObj = window.D4_DATABASE?.runes?.find(r => r.name === gemName);
            let effectStr = gemName;
            if (gemObj) {'''

if old_socket_format in app:
    app = app.replace(old_socket_format, new_socket_format)
    app = app.replace('''else if (isJewelry) effectStr = gemObj.jewelryEffect;
            }''', '''else if (isJewelry) effectStr = gemObj.jewelryEffect;
            } else if (runeObj) {
                effectStr = runeObj.description;
            }''')

# Patch renderGemTab
old_render_gem = '''let items = window.D4_DATABASE?.gems || [];
    
    // Filter
    items = items.filter(g => {'''

new_render_gem = '''let items = [...(window.D4_DATABASE?.gems || [])];
    
    if (window.currentSocketIndex === 0) {
      items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Ritual'));
    } else if (window.currentSocketIndex === 1) {
      items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Invocation'));
    }
    
    // Filter
    items = items.filter(g => {'''

if old_render_gem in app:
    app = app.replace(old_render_gem, new_render_gem)

old_row_html = '''let effect = item.armorEffect;
      if (isWeapon) effect = item.weaponEffect;
      else if (isJewelry) effect = item.jewelryEffect;
      
      let color = '#fff';
      if (item.type === 'ruby') color = '#e74c3c';
      if (item.type === 'amethyst') color = '#9b59b6';
      if (item.type === 'emerald') color = '#2ecc71';
      if (item.type === 'topaz') color = '#f1c40f';
      if (item.type === 'sapphire') color = '#3498db';
      if (item.type === 'diamond') color = '#bdc3c7';
      if (item.type === 'skull') color = '#ecf0f1';
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          <div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}</div>
        </div>
        <div style="font-size: 0.85rem; color: #aaa; margin-left: 28px;">${effect}</div>
      `;'''

new_row_html = '''let effect = item.armorEffect;
      let isRune = item.type === 'Ritual' || item.type === 'Invocation';
      if (isRune) {
        effect = item.description;
      } else {
        if (isWeapon) effect = item.weaponEffect;
        else if (isJewelry) effect = item.jewelryEffect;
      }
      
      let color = '#fff';
      if (item.type === 'ruby') color = '#e74c3c';
      if (item.type === 'amethyst') color = '#9b59b6';
      if (item.type === 'emerald') color = '#2ecc71';
      if (item.type === 'topaz') color = '#f1c40f';
      if (item.type === 'sapphire') color = '#3498db';
      if (item.type === 'diamond') color = '#bdc3c7';
      if (item.type === 'skull') color = '#ecf0f1';
      if (isRune) color = '#ffcc00'; // Runes are gold
      
      let offeringHTML = '';
      if (isRune) {
          offeringHTML = ` <span style="color: #a8a8a8; font-size: 0.8em;">(Offering: ${item.offering})</span>`;
      }
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          <div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}${offeringHTML}</div>
        </div>
        <div style="font-size: 0.85rem; color: #aaa; margin-left: 28px;">${effect}</div>
      `;'''

if old_row_html in app:
    app = app.replace(old_row_html, new_row_html)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
print('Patched app.js and index.html successfully')
