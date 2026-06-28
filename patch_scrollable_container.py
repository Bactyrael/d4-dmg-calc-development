import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update skills-container to be scrollable
old_str = '<div id="skills-container" style="display:flex; flex-direction:column; gap:20px; padding:20px; color:#fff;"></div>'
new_str = '<div id="skills-container" class="custom-scrollbar" style="display:flex; flex-direction:column; gap:20px; padding:20px; color:#fff; max-height: 600px; overflow-y: auto; border: 1px solid #333; border-top: none; border-radius: 0 0 4px 4px; background: rgba(0,0,0,0.3);"></div>'
html = html.replace(old_str, new_str)

# Update the header to blend better with the new container
old_header = 'background: rgba(0,0,0,0.5); border: 1px solid #444; border-radius: 4px; margin-bottom: 16px;'
new_header = 'background: rgba(20,20,20,0.8); border: 1px solid #444; border-radius: 4px 4px 0 0; border-bottom: 1px solid #222; position: sticky; top: 0; z-index: 10;'
html = html.replace(old_header, new_header)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Add custom scrollbar CSS to style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

scrollbar_css = """
/* Custom Scrollbar for contained windows */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #777;
}
"""
css += scrollbar_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Container scrollable UI added.")
