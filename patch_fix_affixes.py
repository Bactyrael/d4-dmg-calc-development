import json
import re

generic_affixes = [
    "Vigorous: [6.5 - 8.0]% Maximum Life",
    "Keen: +[8.0 - 10.0]% Attack Speed",
    "Adept: +[7.5 - 10.0]% Critical Strike Chance",
    "Ferocious: [12.0 - 20.0]%[x] Damage",
    "Stalwart's: +[7.5 - 10.0]% Total Armor",
    "Resistant: +[7.5 - 10.0]% Resistance to All Elements",
    "Efficient: [7.5 - 10.0]% Resource Cost Reduction",
    "Resourceful: +[15 - 20] Maximum Resource",
    "Astute: +[7.5 - 10.0]% Intelligence",
    "Harmonious: +[6.0 - 8.0]% All Stats",
    "of Glory: +1 Charm Slot"
]

necro_affixes = [
    "of Minions: +[7 - 10]%[x] Minion Damage",
    "of Ghouls: +[2 - 3] to Skeleton Warrior",
    "of Liches: +[2 - 3] to Skeleton Mage",
    "of Force: +[7 - 10]%[x] Physical Damage",
    "of Flaying: +[8 - 10]% Minion Attack Speed",
    "of Bones: +[7 - 10]% Bone Skill Damage",
    "of Spirits: +[5 - 11]% Maximum Essence",
    "of Lamellar: +[8 - 10]% Armor",
    "of Shattering: +[5 - 8]% Bone Skill Cooldown Reduction",
    "of Innards: +[7.0 - 10.0]%[x] Core Skill Damage",
    "of Swiftness: +[20 - 24]% Movement Speed while Quintessence is active",
    "of Exsanguination: +[7 - 10]%[x] Blood Skill Damage",
    "of Lifesteal: +[263 - 316] Life on Kill",
    "of Clotting: +[12 - 15]% Fortification Generation",
    "of Coagulation: +[5 - 8]% Blood Skill Cooldown Reduction",
    "of Survival: +[7 - 8]% Maximum Life",
    "of Infusions: +[7 - 10]% Damage for 4 seconds after picking up a Blood Orb",
    "of Stygian: +[7 - 10]%[x] Darkness Skill Damage",
    "of Shrouds: +[7.5 - 10.0] Resistance to All Elements",
    "of Shade: +[7 - 10]%[x] Shadow Damage",
    "of Shadows: +[5 - 8]% Darkness Skill Cooldown Reduction",
    "of Injuries: +[7.0 - 10.0]%[x] Damage to Crowd Controlled Enemies",
    "of Chilling: +[7 - 10]%[x] Cold Damage",
    "of Corpses: +[7 - 10]%[x] Corpse Skill Damage",
    "of Death Rattles: +[5 - 8]% Macabre Skill Cooldown Reduction",
    "of Graves: +[7 - 10]% Macabre Skill Damage",
    "of Severing: +[1 - 2] Essence on Kill",
    "of Curses: +[7 - 10]% Damage against Cursed Enemies",
    "of Reapers: +[7.0 - 10.0]%[x] Ultimate Skill Damage"
]

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# I will find all instances of "classData: {" to safely navigate
# Or better, parse the db with a regex that looks for each class key
# The classes are: "Barbarian": { ... }, "Necromancer": { ... }

class_names = ["Barbarian", "Druid", "Necromancer", "Rogue", "Sorcerer", "Spiritborn"]

for cls in class_names:
    pattern = re.compile(rf'"{cls}":\s*\{{\s*equipment:\s*\{{\s*seal:\s*\{{\s*modifiers:\s*\[(.*?)\]\s*\}}\s*,', re.DOTALL)
    match = pattern.search(db)
    if match:
        arr = generic_affixes.copy()
        if cls == "Necromancer":
            arr.extend(necro_affixes)
        
        replacement = 'seal: {\n          modifiers: [\n'
        for m in arr:
            replacement += f'            "{m}",\n'
        replacement += '          ]\n        },'
        
        db = db[:match.start()] + f'"{cls}": {{\n      equipment: {{\n        {replacement}' + db[match.end():]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Fixed affixes.")
