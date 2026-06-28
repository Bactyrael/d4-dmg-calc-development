import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace the onclick logic
old_onclick = """          slot.onclick = (e) => {
              // Restriction: must have a point in base skill to add points to its modifiers
              if (!isBase && (!window.selectedSkills[baseSkillName] || window.selectedSkills[baseSkillName] === 0)) {
                  return; // Do nothing if base skill has no points
              }
              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  if (getSpentSkillPoints() >= 83) {
                      return; // Max points reached
                  }
                  window.selectedSkills[name] = cur + 1;
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };"""

new_onclick = """          slot.onclick = (e) => {
              // Restriction: must have a point in base skill to add points to its modifiers
              if (!isBase && (!window.selectedSkills[baseSkillName] || window.selectedSkills[baseSkillName] === 0)) {
                  return; // Do nothing if base skill has no points
              }
              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  let spent = getSpentSkillPoints();
                  if (spent >= 83) {
                      return; // Max points reached
                  }
                  
                  if (e.shiftKey) {
                      // Fill up the skill as much as possible up to maxRank or global cap
                      let availablePoints = 83 - spent;
                      let pointsToMax = maxRank - cur;
                      let pointsToAdd = Math.min(availablePoints, pointsToMax);
                      window.selectedSkills[name] = cur + pointsToAdd;
                  } else {
                      window.selectedSkills[name] = cur + 1;
                  }
                  
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
              }
          };"""

app = app.replace(old_onclick, new_onclick)

# Replace the oncontextmenu logic
old_oncontext = """          slot.oncontextmenu = (e) => {
              e.preventDefault();
              if (window.selectedSkills[name] > 0) {
                  window.selectedSkills[name]--;
                  if (window.selectedSkills[name] === 0) {
                      delete window.selectedSkills[name];
                      // Restriction: If a base skill drops to 0, automatically clear all its modifiers
                      if (isBase && skillsDatabase[category]) {
                          const skillData = skillsDatabase[category].find(s => s.name === name);
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

new_oncontext = """          slot.oncontextmenu = (e) => {
              e.preventDefault();
              if (window.selectedSkills[name] > 0) {
                  if (e.shiftKey) {
                      window.selectedSkills[name] = 0; // Wipe all points from this skill
                  } else {
                      window.selectedSkills[name]--;
                  }
                  
                  if (window.selectedSkills[name] === 0) {
                      delete window.selectedSkills[name];
                      // Restriction: If a base skill drops to 0, automatically clear all its modifiers
                      if (isBase && skillsDatabase[category]) {
                          const skillData = skillsDatabase[category].find(s => s.name === name);
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

app = app.replace(old_oncontext, new_oncontext)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Shift-click feature added.")
