with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Patch renderEquipment (Paperdoll Sockets)
old_paperdoll = '''            else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
            else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
            else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
        } else {'''

new_paperdoll = '''            else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
            else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
            else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
            
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
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app)
else:
    print("Could not patch renderEquipment")
