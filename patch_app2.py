with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_logic = '''let items = [...(window.D4_DATABASE?.gems || [])];
    
    if (window.currentSocketIndex === 0) {
      items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Ritual'));
    } else if (window.currentSocketIndex === 1) {
      items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Invocation'));
    }'''

new_logic = '''let items = [...(window.D4_DATABASE?.gems || [])];
    
    const eq = window.savedEquipment[slotName] || {};
    const maxSockets = getMaxSockets(slotName, eq);
    
    let globalRuneCount = 0;
    for (const [s, sEq] of Object.entries(window.savedEquipment || {})) {
        if (sEq && sEq.sockets) {
            sEq.sockets.forEach(gemName => {
                if (gemName && window.D4_DATABASE?.runes?.some(r => r.name === gemName)) {
                    globalRuneCount++;
                }
            });
        }
    }
    
    const currentGemName = eq.sockets ? eq.sockets[window.currentSocketIndex] : null;
    const isReplacingRune = currentGemName && window.D4_DATABASE?.runes?.some(r => r.name === currentGemName);
    
    const canAddRune = globalRuneCount < 4 || isReplacingRune;
    
    if (maxSockets >= 2 && canAddRune) {
        if (window.currentSocketIndex === 0) {
            items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Ritual'));
        } else if (window.currentSocketIndex === 1) {
            const socket0GemName = eq.sockets ? eq.sockets[0] : null;
            const hasRitualInSocket0 = socket0GemName && window.D4_DATABASE?.runes?.some(r => r.name === socket0GemName && r.type === 'Ritual');
            if (hasRitualInSocket0) {
                items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Invocation'));
            }
        }
    }'''

if old_logic in app:
    app = app.replace(old_logic, new_logic)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app)
    print("Successfully patched app.js with rune constraints")
else:
    print("Could not find the target logic to patch.")
