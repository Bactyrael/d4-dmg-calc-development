import json

known = {
    "of Virtuosity", "of Command", "of Expertise",
    "of Insight", "of Safeguarding", "of Devastation",
    "of Riches", "of Alchemy",
    "of Armor", "of Durability",
    "of Minions", "of Ghouls", "of Liches", "of Force", "of Flaying",
    "of Bones", "of Spirits", "of Lamellar", "of Shattering", "of Innards", "of Swiftness",
    "of Exsanguination", "of Lifesteal", "of Clotting", "of Coagulation", "of Survival", "of Infusions",
    "of Stygian", "of Shrouds", "of Shade", "of Shadows", "of Injuries", "of Chilling",
    "of Corpses", "of Death Rattles", "of Graves", "of Severing", "of Curses",
    "of Proficiency", "of Elements"
}

with open("parsed_seals.json", "r", encoding="utf-16") as f:
    class_sets = json.load(f)

missing = {}

for cls, sets in class_sets.items():
    missing[cls] = {}
    for set_name, affixes in sets.items():
        missing[cls][set_name] = {}
        for affix_name, stat in affixes.items():
            if affix_name not in known:
                # cleanup the stat for easy reading
                s = stat.replace("++", "+")
                s = s.replace("<b>", "")
                s = s.replace("</b>", "")
                missing[cls][set_name][affix_name] = s

with open("missing_modifiers.md", "w", encoding="utf-8") as f:
    f.write("# Missing Seal Modifier Values\n\n")
    f.write("Please provide the numerical ranges for the following modifiers. I've grouped them by Class and Set to make it easier to search.\n\n")
    for cls in missing:
        has_items = False
        for set_name in missing[cls]:
            if missing[cls][set_name]:
                has_items = True
        if not has_items: continue
        
        f.write(f"## {cls}\n")
        for set_name, affixes in missing[cls].items():
            if not affixes: continue
            f.write(f"### {set_name}\n")
            for affix_name, stat in affixes.items():
                f.write(f"- **{affix_name}**: {stat}\n")
        f.write("\n")

print("Created missing_modifiers.md")
