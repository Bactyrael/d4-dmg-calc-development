import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace the onclick logic
old_onclick = r"""          slot\.onclick = \(e\) => \{
              const cur = window\.selectedSkills\[name\] \|\| 0;
              if \(cur < maxRank\) \{
                  window\.selectedSkills\[name\] = cur \+ 1;
                  updateDisplay\(\);
                  if \(typeof recalculate === 'function'\) recalculate\(\);
              \}
          \};"""

new_onclick = """          slot.onclick = (e) => {
              // Restriction: must have a point in base skill to add points to its modifiers
              if (!isBase && (!window.selectedSkills[baseSkillName] || window.selectedSkills[baseSkillName] === 0)) {
                  return; // Do nothing if base skill has no points
              }
              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  window.selectedSkills[name] = cur + 1;
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };"""

app = re.sub(old_onclick, new_onclick, app)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Added restriction logic to app.js")
