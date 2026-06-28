import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace window.skillsDatabase with just skillsDatabase
app = app.replace('window.skillsDatabase[category]', 'skillsDatabase[category]')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed skillsDatabase reference for auto wipe.")
