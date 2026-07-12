import json
import re

affixes_text = """
1. Vigorous: [6.5 - 8.0]% Maximum Life
2. Keen: +[8.0 - 10.0]% Attack Speed
3. Adept: +[7.5 - 10.0]% Critical Strike Chance
4. Ferocious: [12.0 - 20.0]%[x] Damage
5. Stalwart's: +[7.5 - 10.0]% Total Armor
6. Resistant: +[7.5 - 10.0]% Resistance to All Elements
7. Efficient: [7.5 - 10.0]% Resource Cost Reduction
8. Resourceful: +[15 - 20] Maximum Resource
9. Astute: +[7.5 - 10.0]% Intelligence
10. Harmonious: +[6.0 - 8.0]% All Stats
11. of Glory: +1 Charm Slot
12. of Minions: +[7 - 10]%[x] Minion Damage
13. of Ghouls: +[2 - 3] to Skeleton Warrior
14. of Liches: +[2 - 3] to Skeleton Mage
15. of Force: +[7 - 10]%[x] Physical Damage
16. of Flaying: +[8 - 10]% Minion Attack Speed
17. of Bones: +[7 - 10]% Bone Skill Damage
18. of Spirits: +[5 - 11]% Maximum Essence
19. of Lamellar: +[8 - 10]% Armor
20. of Shattering: +[5 - 8]% Bone Skill Cooldown Reduction
21. of Innards: +[7.0 - 10.0]%[x] Core Skill Damage
22. of Swiftness: +[20 - 24]% Movement Speed while Quintessence is active
23. of Exsanguination: +[7 - 10]%[x] Blood Skill Damage
24. of Lifesteal: +[263 - 316] Life on Kill
25. of Clotting: +[12 - 15]% Fortification Generation
26. of Coagulation: +[5 - 8]% Blood Skill Cooldown Reduction
27. of Survival: +[7 - 8]% Maximum Life
28. of Infusions: +[7 - 10]% Damage for 4 seconds after picking up a Blood Orb
29. of Stygian: +[7 - 10]%[x] Darkness Skill Damage
30. of Shrouds: +[7.5 - 10.0] Resistance to All Elements
31. of Shade: +[7 - 10]%[x] Shadow Damage
32. of Shadows: +[5 - 8]% Darkness Skill Cooldown Reduction
33. of Injuries: +[7.0 - 10.0]%[x] Damage to Crowd Controlled Enemies
34. of Chilling: +[7 - 10]%[x] Cold Damage
35. of Corpses: +[7 - 10]%[x] Corpse Skill Damage
36. of Death Rattles: +[5 - 8]% Macabre Skill Cooldown Reduction
37. of Graves: +[7 - 10]% Macabre Skill Damage
38. of Severing: +[1 - 2] Essence on Kill
39. of Curses: +[7 - 10]% Damage against Cursed Enemies
40. of Reapers: +[7.0 - 10.0]%[x] Ultimate Skill Damage
"""

lines = [l.strip() for l in affixes_text.strip().split('\n') if l.strip()]
modifiers = []
for line in lines:
    parts = line.split(': ', 1)
    if len(parts) == 2:
        modifiers.append(parts[1])

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# We need to add 'seal': { 'modifiers': [...] } to every class's equipment in classData
import sys

def inject_modifiers():
    global db
    seal_obj = '        seal: {\n          modifiers: [\n'
    for m in modifiers:
        seal_obj += f'            "{m}",\n'
    seal_obj += '          ]\n        },\n'

    # find all "equipment: {"
    search_idx = 0
    while True:
        idx = db.find("equipment: {", search_idx)
        if idx == -1:
            break
        insert_idx = idx + len("equipment: {\n")
        db = db[:insert_idx] + seal_obj + db[insert_idx:]
        search_idx = insert_idx + len(seal_obj)

inject_modifiers()

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Added seal modifiers to database.js")
