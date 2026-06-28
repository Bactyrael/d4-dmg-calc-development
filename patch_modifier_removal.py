import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace the oncontextmenu logic
old_oncontext = r"""          slot\.oncontextmenu = \(e\) => \{
              e\.preventDefault\(\);
              if \(window\.selectedSkills\[name\] > 0\) \{
                  window\.selectedSkills\[name\]--;
                  if \(window\.selectedSkills\[name\] === 0\) delete window\.selectedSkills\[name\];
                  updateDisplay\(\);
                  if \(typeof recalculate === 'function'\) recalculate\(\);
              \}
          \};"""

new_oncontext = """          slot.oncontextmenu = (e) => {
              e.preventDefault();
              if (window.selectedSkills[name] > 0) {
                  window.selectedSkills[name]--;
                  if (window.selectedSkills[name] === 0) {
                      delete window.selectedSkills[name];
                      // Restriction: If a base skill drops to 0, automatically clear all its modifiers
                      if (isBase && window.skillsDatabase[category]) {
                          const skillData = window.skillsDatabase[category].find(s => s.name === name);
                          if (skillData && skillData.modifiers) {
                              skillData.modifiers.forEach(mod => {
                                  delete window.selectedSkills[mod.name];
                              });
                          }
                          // We need to trigger a full UI refresh to clear the active classes from the modifiers
                          setTimeout(() => renderSkills(), 10);
                      }
                  }
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };"""

app = re.sub(old_oncontext, new_oncontext, app)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Added base skill removal logic to app.js")
