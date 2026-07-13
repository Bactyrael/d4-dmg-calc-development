import json
import re

known_values = {
    # Mastery
    "of Virtuosity": "+1 to All Skills",
    "of Command": "+[7.0 - 10.0] Basic Skill Damage",
    "of Expertise": "+[7.0 - 10.0] Core Skill Damage",
    # Slaughter
    "of Insight": "+[2.0 - 10.0] Bonus Experience from Elites",
    "of Safeguarding": "+[11.0 - 15.0] Damage Reduction from Elites",
    "of Devastation": "+[7.0 - 10.0] Damage to Elites",
    # Practiced Technique
    "of Riches": "+[85 - 100]% Gold Drop Rate",
    "of Alchemy": "+[2 - 3] Potion Capacity",
    # Survival
    "of Armor": "+[7.5 - 10.0] Armor",
    "of Durability": "+[7.5 - 10.0] Maximum Resistance to All Elements",
    # Necro Rathma
    "of Minions": "+[7 - 10]% [x] Minion Damage",
    "of Ghouls": "+[2 - 3] to Skeleton Warrior",
    "of Liches": "+[2 - 3] to Skeleton Mage",
    "of Force": "+[7 - 10]% [x] Physical Damage",
    "of Flaying": "+[8 - 10]% Minion Attack Speed",
    # Necro Bone
    "of Bones": "+[7 - 10]% Bone Skill Damage",
    "of Spirits": "+[5 - 11]% Maximum Essence",
    "of Lamellar": "+[8 - 10]% Armor",
    "of Shattering": "+[5 - 8]% Bone Skill Cooldown Reduction",
    "of Innards": "+[7.0 - 10.0]% [x] Core Skill Damage",
    "of Swiftness": "+[20 - 24]% Movement Speed while Quintessence is active",
    # Necro Blood
    "of Exsanguination": "+[7 - 10]% [x] Blood Skill Damage",
    "of Lifesteal": "+[263 - 316] Life on Kill",
    "of Clotting": "+[12 - 15]% Fortification Generation",
    "of Coagulation": "+[5 - 8]% Blood Skill Cooldown Reduction",
    "of Survival": "+[7 - 8]% Maximum Life",
    "of Infusions": "+[7 - 10]% Damage for 4 seconds after picking up a Blood Orb",
    # Necro Shadow
    "of Stygian": "+[7 - 10]% [x] Darkness Skill Damage",
    "of Shrouds": "+[7.5 - 10.0] Resistance to All Elements",
    "of Shade": "+[7 - 10]% [x] Shadow Damage",
    "of Shadows": "+[5 - 8]% Darkness Skill Cooldown Reduction",
    "of Injuries": "+[7.0 - 10.0]% [x] Damage to Crowd Controlled Enemies",
    "of Chilling": "+[7 - 10]% [x] Cold Damage",
    # Necro Corpse
    "of Corpses": "+[7 - 10]% [x] Corpse Skill Damage",
    "of Death Rattles": "+[5 - 8]% Macabre Skill Cooldown Reduction",
    "of Graves": "+[7 - 10]% Macabre Skill Damage",
    "of Severing": "+[1 - 2] Essence on Kill",
    "of Curses": "+[7 - 10]% Damage against Cursed Enemies"
}

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# For each known value, we find its htmlName and name properties in the JSON and replace the "+[x]..." part
for suffix, stat in known_values.items():
    # We find the name line like: "name": "of Virtuosity: +[x] All Skills",
    # And replace it with the new full stat
    pattern = re.compile(rf'("name": "{re.escape(suffix)}: ).*?"')
    db = pattern.sub(rf'\g<1>{stat}"', db)
    
    # We find the shortName line
    pattern2 = re.compile(rf'("shortName": ").*?"(?=\s*,\s*"htmlName".*?{re.escape(suffix)})', re.DOTALL)
    db = pattern2.sub(rf'\g<1>{stat}"', db)

    # We find the htmlName stat div which is the last div
    pattern3 = re.compile(rf'({re.escape(suffix)}</div>(?:<div[^>]*>.*?</div>)*<div[^>]*>).*?(</div>")', re.DOTALL)
    db = pattern3.sub(rf'\g<1>{stat}\g<2>', db)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Restored known values!")
