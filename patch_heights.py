import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update paragon-boards-layout
old_layout = '<div class="paragon-boards-layout" style="display: flex; gap: 20px;">'
new_layout = '<div class="paragon-boards-layout" style="display: flex; gap: 20px; flex: 1; min-height: 0;">'
html = html.replace(old_layout, new_layout)

# 2. Update paragon-board-main
old_main = '<div class="paragon-board-main" style="flex: 1; display: flex; gap: 20px; height: 800px;">'
new_main = '<div class="paragon-board-main" style="flex: 1; display: flex; gap: 20px; height: 100%;">'
html = html.replace(old_main, new_main)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Heights patched.")
