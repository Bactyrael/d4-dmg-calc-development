import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace the conditional check so that it always executes for all categories
old_logic = """          if (category === 'Basic') {
              let imgName = name.toLowerCase().replace(/\\s+/g, '-');"""

new_logic = """          // Execute image loading for all categories
          if (true) {
              let imgName = name.toLowerCase().replace(/\\s+/g, '-');"""

app = app.replace(old_logic, new_logic)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Unlocked images for all skills.")
