import json

with open('parsed_charms.json', 'r') as f:
    modifiers = json.load(f)

# The classes array for Necromancer only is [0, 0, 0, 0, 1]
for mod in modifiers:
    mod["classes"] = [0, 0, 0, 0, 1]

json_str = json.dumps(modifiers, indent=4)

injection_code = f"""

// === AUTO-INJECTED CHARM MODIFIERS (NECROMANCER ONLY) ===
setTimeout(() => {{
    const charmModifiers = {json_str};

    if (window.D4_DATABASE && window.D4_DATABASE.classData && window.D4_DATABASE.classData["Necromancer"]) {{
        let necro = window.D4_DATABASE.classData["Necromancer"];
        if (!necro.equipment) necro.equipment = {{}};
        if (!necro.equipment.charm) necro.equipment.charm = {{}};
        if (!necro.equipment.charm.modifiers) necro.equipment.charm.modifiers = [];
        
        // Push all charm modifiers directly into the necro charm slot
        necro.equipment.charm.modifiers.push(...charmModifiers);
    }}
}}, 300);
"""

with open('assets/database.js', 'a') as f:
    f.write(injection_code)

print("Injected successfully!")
