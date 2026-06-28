import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Inside slot.onclick:
# We need to add the mutual exclusivity logic before adding the point.
old_logic = """                  if (e.shiftKey) {
                      // Fill up the skill as much as possible up to maxRank or global cap
                      let availablePoints = 83 - spent;
                      let pointsToMax = maxRank - cur;
                      let pointsToAdd = Math.min(availablePoints, pointsToMax);
                      window.selectedSkills[name] = cur + pointsToAdd;
                  } else {
                      window.selectedSkills[name] = cur + 1;
                  }"""

new_logic = """                  if (!isBase && skillsDatabase[category]) {
                      // Mutual Exclusivity logic per row
                      const baseSkillData = skillsDatabase[category].find(s => s.name === baseSkillName);
                      if (baseSkillData && baseSkillData.modifiers) {
                          let groupIndices = [];
                          if (index >= 0 && index <= 2) groupIndices = [0, 1, 2];
                          else if (index >= 3 && index <= 4) groupIndices = [3, 4];
                          else if (index >= 5 && index <= 6) groupIndices = [5, 6];
                          
                          groupIndices.forEach(idx => {
                              if (idx !== index && baseSkillData.modifiers[idx]) {
                                  const modName = baseSkillData.modifiers[idx].name;
                                  if (window.selectedSkills[modName] > 0) {
                                      delete window.selectedSkills[modName];
                                  }
                              }
                          });
                          // We need a brief timeout to let the global UI refresh to clear active states of wiped siblings
                          setTimeout(() => renderSkills(), 10);
                      }
                  }

                  if (e.shiftKey) {
                      // Fill up the skill as much as possible up to maxRank or global cap
                      let availablePoints = 83 - spent;
                      let pointsToMax = maxRank - cur;
                      let pointsToAdd = Math.min(availablePoints, pointsToMax);
                      window.selectedSkills[name] = cur + pointsToAdd;
                  } else {
                      window.selectedSkills[name] = cur + 1;
                  }"""

app = app.replace(old_logic, new_logic)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("Mutual exclusivity logic added.")
