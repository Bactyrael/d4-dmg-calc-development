import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace querySelectorAll('.equipment-slot-box')
content = content.replace(
    "querySelectorAll('.equipment-slot-box')",
    "querySelectorAll('.equipment-slot-box, .charm-slot, .seal-slot')"
)
content = content.replace(
    'querySelectorAll(".equipment-slot-box")',
    'querySelectorAll(".equipment-slot-box, .charm-slot, .seal-slot")'
)

# Replace querySelector('.equipment-slot-box[data-slot="..."]')
# Using regex to catch template strings and standard strings
def repl(match):
    slot_expr = match.group(1)
    return f'.equipment-slot-box[data-slot="{slot_expr}"], .charm-slot[data-slot="{slot_expr}"], .seal-slot[data-slot="{slot_expr}"]'

content = re.sub(
    r'\.equipment-slot-box\[data-slot="([^"]+)"\]',
    repl,
    content
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced all equipment-slot-box queries to include charms and seals!")
