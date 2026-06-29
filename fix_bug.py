with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_logic = '''const eq = window.savedEquipment[slotName] || {};
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
    }'''

new_logic = '''const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
    let eq = {};
    if (box && box.dataset.value) {
        try { eq = JSON.parse(box.dataset.value); } catch(e){}
    }
    const maxSockets = getMaxSockets(slotName, eq);
    
    let globalRuneCount = 0;
    document.querySelectorAll('.equipment-slot-box').forEach(b => {
        if (b.dataset.value) {
            try {
                const bEq = JSON.parse(b.dataset.value);
                if (bEq && bEq.sockets) {
                    bEq.sockets.forEach(gemName => {
                        if (gemName && window.D4_DATABASE?.runes?.some(r => r.name === gemName)) {
                            globalRuneCount++;
                        }
                    });
                }
            } catch(e){}
        }
    });'''

if old_logic in app:
    app = app.replace(old_logic, new_logic)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app)
    print("Fixed savedEquipment bug")
else:
    print("Could not find the target logic to fix.")
