with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

rune_func = '''function renderActiveRunes() {
    const slots = document.querySelectorAll('.rune-slot.slot-square');
    if (!slots.length) return;
    
    // Clear existing
    slots.forEach(slot => {
        slot.innerHTML = '';
        slot.style.backgroundImage = 'none';
        slot.title = 'Empty Rune Slot';
        slot.style.border = '1px solid #333';
        slot.style.borderRadius = '0';
    });
    
    let activeRunes = [];
    
    document.querySelectorAll('.equipment-slot-box').forEach(box => {
        if (box.dataset.value) {
            try {
                const eq = JSON.parse(box.dataset.value);
                if (eq && eq.sockets && eq.sockets.length >= 2) {
                    const r0 = eq.sockets[0];
                    const r1 = eq.sockets[1];
                    const isR0Rune = r0 && window.D4_DATABASE?.runes?.some(r => r.name === r0);
                    const isR1Rune = r1 && window.D4_DATABASE?.runes?.some(r => r.name === r1);
                    
                    if (isR0Rune && isR1Rune) {
                        activeRunes.push(r0);
                        activeRunes.push(r1);
                    } else if (isR0Rune) {
                        activeRunes.push(r0);
                        activeRunes.push(null); 
                    } else if (isR1Rune) {
                        activeRunes.push(null);
                        activeRunes.push(r1);
                    }
                }
            } catch(e) {}
        }
    });
    
    for (let i = 0; i < Math.min(4, activeRunes.length); i++) {
        const gem = activeRunes[i];
        const slot = slots[i];
        if (gem) {
            slot.title = gem;
            slot.style.backgroundImage = `url('assets/images/Runes/rune_${gem.toLowerCase()}.png')`;
            slot.style.backgroundSize = 'cover';
            slot.style.backgroundPosition = 'center';
            slot.style.border = '1px solid #d18a45';
            slot.style.borderRadius = '4px';
        }
    }
}

'''

old_calc_end = '''    // Update the Character Sheet UI
    renderCharacterSheet(compiledStats);
    renderToughnessDashboard(compiledStats);

  } catch (e) {'''

new_calc_end = '''    // Update the Character Sheet UI
    renderCharacterSheet(compiledStats);
    renderToughnessDashboard(compiledStats);
    
    renderActiveRunes();

  } catch (e) {'''

if old_calc_end in app:
    app = app.replace(old_calc_end, new_calc_end)
    app = rune_func + app
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app)
    print("Patched app.js with renderActiveRunes")
else:
    print("Could not patch app.js")
