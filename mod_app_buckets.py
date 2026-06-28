import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update categories
old_categories = """      const categories = {
          'Core Stats': ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'All Stats'],
          'Offensive': ['Damage', 'Critical', 'Vulnerable', 'Attack Speed', 'Overpower'],
          'Defensive': ['Life', 'Armor', 'Resistance', 'Reduction', 'Dodge', 'Block'],
          'Utility': ['Movement', 'Cooldown', 'Resource', 'Essence', 'Healing', 'Lucky Hit']
      };"""

new_categories = """      const categories = {
          'Core Stats': ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'All Stats'],
          'Offensive': ['Damage', 'Critical', 'Vulnerable', 'Attack Speed', 'Overpower'],
          'Defensive': ['Life', 'Armor', 'Resistance', 'Reduction', 'Dodge', 'Block'],
          'Utility': ['Movement', 'Cooldown', 'Resource', 'Essence', 'Healing', 'Lucky Hit', 'Barrier']
      };"""
app_code = app_code.replace(old_categories, new_categories)

# 2. Skip DR stats in the loop
old_loop = """      Object.keys(stats).forEach(statName => {
          let matched = false;
          for (const [cat, keywords] of Object.entries(categories)) {
              if (keywords.some(kw => statName.toLowerCase().includes(kw.toLowerCase()))) {"""

new_loop = """      Object.keys(stats).forEach(statName => {
          // Skip stats that are exclusively displayed in the Toughness Dashboard
          if (statName.includes('DR%') || statName.includes('Universal Damage Reduction %')) return;
          
          let matched = false;
          for (const [cat, keywords] of Object.entries(categories)) {
              // Exact match or contains (avoid 'Damage Reduction' matching 'Damage')
              if (keywords.some(kw => statName.toLowerCase().includes(kw.toLowerCase()))) {
                  if (cat === 'Offensive' && statName.toLowerCase().includes('damage reduction')) continue;
"""
app_code = app_code.replace(old_loop, new_loop)

# Let's double check the damage reduction logic:
# if `statName` includes `Universal Damage Reduction %`, it will hit the early return and NOT be grouped.
# Wait, what if someone has a generic "Damage Reduction" stat from gear? It might also be skipped if I just did return.
# The user specifically said "we dont need universal damage reduction in the offensive window... The other window should not display information that we already have in the defenses and toughness window. "Fire, physical, lightning, cold, poison, and shadow DR%." dont belong in there."
# So ignoring 'DR%' and 'Universal Damage Reduction %' specifically covers exactly what the user asked.

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Updated renderCharacterSheet")
