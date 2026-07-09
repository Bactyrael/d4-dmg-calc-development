import sys
with open('app.js', 'r', encoding='utf-8') as f:
    data = f.read()
target = "if ((window.selectedSkills && window.selectedSkills[Lucky Hit Chance ()] > 0) || (baseName === 'Corpse Tendrils' && hasSacrilegiousRing)) {"
replacement = "if (isSkillActiveNode(Lucky Hit Chance ())) {"
data = data.replace(target, replacement)
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(data)
