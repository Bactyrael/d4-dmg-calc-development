import re
with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'(function selectSeal\(item\) \{\s*if \(!currentBuild\.talisman\) currentBuild\.talisman = \{ seal: null, charms: \[null, null, null, null, null, null\] \};\s*currentBuild\.talisman\.seal = item;)')

match = pattern.search(content)
if match:
    replacement = match.group(1) + """
        
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
    content = content[:match.end()] + replacement[len(match.group(1)):] + content[match.end():]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Patched selectSeal via regex")
else:
    print("Regex failed for selectSeal")
