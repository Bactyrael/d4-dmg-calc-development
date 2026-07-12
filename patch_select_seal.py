with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """function selectSeal(item) {
    if (!currentBuild.talisman) currentBuild.talisman = {};
    currentBuild.talisman.seal = item;"""

replacement = """function selectSeal(item) {
    if (!currentBuild.talisman) currentBuild.talisman = {};
    currentBuild.talisman.seal = item;
    
    const box = document.querySelector(`.equipment-slot-box[data-slot="Seal"]`);
    if (box) {
        if (!item) {
            delete box.dataset.value;
        } else {
            let sealObj = null;
            if (box.dataset.value) {
                try { sealObj = JSON.parse(box.dataset.value); } catch(e) {}
            }
            if (!sealObj || sealObj.name !== item.name) {
                sealObj = { name: item.name, power: 900, quality: 0, rarity: item.rarity };
            }
            box.dataset.value = JSON.stringify(sealObj);
        }
    }"""

if target in content:
    content = content.replace(target, replacement)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Patched selectSeal")
else:
    print("Target not found for selectSeal")
