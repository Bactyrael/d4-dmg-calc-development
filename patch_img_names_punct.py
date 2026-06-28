import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Update imgName generation
old_imgName = "let imgName = name.toLowerCase().replace(/\\s+/g, '-');"
new_imgName = "let imgName = name.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');"
app = app.replace(old_imgName, new_imgName)

# Update baseName generation
old_baseName = "let baseName = baseSkillName.toLowerCase().replace(/\\s+/g, '-');"
new_baseName = "let baseName = baseSkillName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');"
app = app.replace(old_baseName, new_baseName)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Image name formatting updated to remove punctuation.")
