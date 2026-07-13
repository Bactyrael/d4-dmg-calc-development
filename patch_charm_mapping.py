import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# For `mapped`
content = re.sub(
    r'(let mapped = slotName\.toLowerCase\(\);)',
    r'\1\n    if (mapped.startsWith("charm")) mapped = "charm";',
    content
)

# For `mappedSlot`
content = re.sub(
    r'(let mappedSlot = slotName\.toLowerCase\(\);)',
    r'\1\n    if (mappedSlot.startsWith("charm")) mappedSlot = "charm";',
    content
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Mapping patched successfully.")
