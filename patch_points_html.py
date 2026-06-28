import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find <div id="tab-skills" class="tab-pane"> and add a points counter header
old_str = r'<div id="tab-skills" class="tab-pane">'
new_str = """<div id="tab-skills" class="tab-pane">
        <div class="skills-header" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: rgba(0,0,0,0.5); border: 1px solid #444; border-radius: 4px; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 1.2rem; color: #fff;">Skill Tree</h2>
          <div style="font-size: 1.1rem; font-weight: bold; color: #ffd700; text-shadow: 1px 1px 2px #000;">
            Points Spent: <span id="skill-points-spent">0</span> / 83
          </div>
        </div>"""

if '<div id="tab-skills" class="tab-pane">' in html:
    html = html.replace('<div id="tab-skills" class="tab-pane">', new_str)
else:
    print("Could not find tab-skills in index.html")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
