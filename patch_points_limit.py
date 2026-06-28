import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. We need a helper function to count points
# I'll inject this right after window.selectedSkills = {}; (or near the top)
points_func = """
function getSpentSkillPoints() {
    return Object.values(window.selectedSkills || {}).reduce((sum, val) => sum + val, 0);
}

function updateSkillPointsUI() {
    const el = document.getElementById('skill-points-spent');
    if (el) {
        const spent = getSpentSkillPoints();
        el.textContent = spent;
        if (spent >= 83) {
            el.style.color = '#ff4444';
        } else {
            el.style.color = '#ffd700';
        }
    }
}
"""
app = app.replace("window.selectedSkills = {};", "window.selectedSkills = {};\n" + points_func)

# 2. Add the restriction to slot.onclick
# The current onclick block looks like:
#          slot.onclick = (e) => {
#              // Restriction: must have a point in base skill to add points to its modifiers
#              if (!isBase && (!window.selectedSkills[baseSkillName] || window.selectedSkills[baseSkillName] === 0)) {
#                  return; // Do nothing if base skill has no points
#              }
#              const cur = window.selectedSkills[name] || 0;
#              if (cur < maxRank) {

old_onclick = """              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {"""

new_onclick = """              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  if (getSpentSkillPoints() >= 83) {
                      return; // Max points reached
                  }"""

app = app.replace(old_onclick, new_onclick)

# 3. Add updateSkillPointsUI() to updateDisplay() and the oncontextmenu
old_update = """              if (window.selectedSkills[name] > 0) slot.classList.add('active');
              else slot.classList.remove('active');"""

new_update = """              if (window.selectedSkills[name] > 0) slot.classList.add('active');
              else slot.classList.remove('active');
              updateSkillPointsUI();"""

app = app.replace(old_update, new_update)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Added 83 point limit logic.")
