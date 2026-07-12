with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(r"${slotName === \'Seal\' ? \'display:none;\' : \'\'}", "${slotName === 'Seal' ? 'display:none;' : ''}")
content = content.replace(r"${slotName === \'Seal\' ? \'\' : renderAffixRow(3, \'affix\')}", "${slotName === 'Seal' ? '' : renderAffixRow(3, 'affix')}")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed JS syntax errors.")
