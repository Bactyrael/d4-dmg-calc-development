with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Patch renderEquipment (Paperdoll Sockets)
old_paperdoll = '''            else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
            else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
            else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
            else circle.style.background = '#888';
        } else {'''

new_paperdoll = '''            else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
            else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
            else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
            else circle.style.background = '#888';
            
            const isRune = window.D4_DATABASE?.runes?.some(r => r.name === gem);
            if (isRune) {
                circle.style.background = `url('assets/images/Runes/rune_${gem.toLowerCase()}.png')`;
                circle.style.backgroundSize = 'cover';
                circle.style.border = '1px solid #d18a45';
                circle.style.borderRadius = '50%';
            }
        } else {'''

if old_paperdoll in app:
    app = app.replace(old_paperdoll, new_paperdoll)
    print("Patched renderEquipment")

# Patch renderGemTab
old_gemtab = '''      let offeringHTML = '';
      if (isRune) {
          offeringHTML = ` <span style="color: #a8a8a8; font-size: 0.8em;">(Offering: ${item.offering})</span>`;
      }
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          <div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}${offeringHTML}</div>'''

new_gemtab = '''      let offeringHTML = '';
      let iconHTML = `<div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>`;
      if (isRune) {
          offeringHTML = ` <span style="color: #a8a8a8; font-size: 0.8em;">(Offering: ${item.offering})</span>`;
          iconHTML = `<div style="width: 24px; height: 24px; background-image: url('assets/images/Runes/rune_${item.name.toLowerCase()}.png'); background-size: cover; background-position: center; border-radius: 50%; border: 1px solid #d18a45;"></div>`;
      }
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          ${iconHTML}
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}${offeringHTML}</div>'''

if old_gemtab in app:
    app = app.replace(old_gemtab, new_gemtab)
    print("Patched renderGemTab")

# Patch renderEditTab socket name
old_edittab = '''<strong style="color: #d18a45; margin-right: 4px; font-size: 0.85em;">${gemName.split(' ')[1] || gemName}:</strong> ${formattedEffect}'''
new_edittab = '''<strong style="color: #d18a45; margin-right: 4px; font-size: 0.85em;">${gemName}:</strong> ${formattedEffect}'''

if old_edittab in app:
    app = app.replace(old_edittab, new_edittab)
    print("Patched renderEditTab gem name display")


with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
