import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace b.lhcBonus.toFixed(1))}%) with b.lhcBonus.toFixed(1))}%)${b.lhcComponents.some(c => c.name.includes('[x]')) ? ' * ' + b.lhcComponents.filter(c => c.name.includes('[x]')).map(c => '(100% + ' + Number(c.value.toFixed(1)) + '%)').join(' * ') : ''}

# Find exact match for b.lhcBonus
old_str = "Formula: ${Number(b.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b.lhcBonus.toFixed(1))}%)"
new_str = "Formula: ${Number(b.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b.lhcBonus.toFixed(1))}%)${b.lhcComponents.some(c => c.name.includes('[x]')) ? ' * ' + b.lhcComponents.filter(c => c.name.includes('[x]')).map(c => '(100% + ' + Number(c.value.toFixed(1)) + '%)').join(' * ') : ''}"
content = content.replace(old_str, new_str)

# Find exact match for b2.lhcBonus
old_str2 = "Formula: ${Number(b2.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b2.lhcBonus.toFixed(1))}%)"
new_str2 = "Formula: ${Number(b2.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b2.lhcBonus.toFixed(1))}%)${b2.lhcComponents.some(c => c.name.includes('[x]')) ? ' * ' + b2.lhcComponents.filter(c => c.name.includes('[x]')).map(c => '(100% + ' + Number(c.value.toFixed(1)) + '%)').join(' * ') : ''}"
content = content.replace(old_str2, new_str2)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated LHC UI via Regex")
