import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add seals and charms to D4_DATABASE
talisman_data = """
    "seals": [
        {
            name: "Seal of the Diamond Mind",
            type: "Seal",
            rarity: "mythic",
            isMythic: true,
            desc: "Reduces the number of Charms needed for Set bonuses by 1 (to a minimum of 2)."
        },
        {
            name: "Seal of the Golden Epiphany",
            type: "Seal",
            rarity: "mythic",
            isMythic: true,
            desc: "Can equip up to 3 Unique Charms."
        }
    ],
    "charms": [
        {
            name: "Beru of the Waking Touch",
            type: "Charm",
            rarity: "set",
            set: "Rathma's Waking Touch",
            desc: "Part of Rathma's Waking Touch set."
        },
        {
            name: "Phoba of the Waking Touch",
            type: "Charm",
            rarity: "set",
            set: "Rathma's Waking Touch",
            desc: "Part of Rathma's Waking Touch set."
        },
        {
            name: "Fer of the Waking Touch",
            type: "Charm",
            rarity: "set",
            set: "Rathma's Waking Touch",
            desc: "Part of Rathma's Waking Touch set."
        },
        {
            name: "Mlor of the Waking Touch",
            type: "Charm",
            rarity: "set",
            set: "Rathma's Waking Touch",
            desc: "Part of Rathma's Waking Touch set."
        },
        {
            name: "Linta of the Waking Touch",
            type: "Charm",
            rarity: "set",
            set: "Rathma's Waking Touch",
            desc: "Part of Rathma's Waking Touch set."
        }
    ],
    "talismanSets": {
        "Rathma's Waking Touch": {
            2: "Your Minions deal 60%[x] increased damage and reduce the Cooldown of Army of the Dead by 1 second each time they deal damage.",
            3: "35% of the damage you take is redirected to your Minions.",
            5: "Army of the Dead deals 450%[x] increased damage. While Army of the Dead is active, your Minions are larger, have 100%[x] increased Life, and gain 25%[+] Attack Speed."
        }
    },
"""

if '"seals": [' not in content:
    content = content.replace('"aspects": [', talisman_data + '  "aspects": [')

# Also fix the script that was appended which might crash if charms is undefined
dynamic_unique_charms = """
    // Dynamically generate Unique Charms from Mythics and Uniques
    setTimeout(() => {
        const uniqueCharmNames = [
          "Andariel's Visage", "Doombringer", "Harlequin Crest", "Heir of Perdition", "Melted Heart of Selig", "Ring of Starless Skies",
          "Shroud of False Death", "The Grandfather", "Tyrael's Might", "Azurewrath", "Banished Lord's Talisman",
          "Blood Moon Breeches", "Blood-Mad Idol", "Bloodless Scream", "Crown of Lucion", "Endurant Faith", "Fists of Fate",
          "Flickerstep", "Frostburn", "Godslayer Crown", "Gravewalker's Hand", "Locran's Talisman", "Mother's Embrace",
          "Omen of Pain", "Pact of Bone", "Paingorger's Gauntlets", "Penitent Greaves", "Rakanoth's Wake", "Razorplate",
          "Red Blessing", "Rustbitten Dirk", "Soulbrand", "Tassets of the Dawning Sky", "Temerity", "The Butcher's Cleaver",
          "The Gloom Ward", "Thousand-Eye Reaver", "Tibault's Will", "Wendigo Brand", "Will of Rathma", "Wyrdskin",
          "X'Fal's Corroded Signet", "Yen's Blessing"
        ];
        
        if (!window.D4_DATABASE.charms) window.D4_DATABASE.charms = [];
        let allUniques = (window.D4_DATABASE.uniques || []).concat(window.D4_DATABASE.mythics || []);
        for (const item of allUniques) {
            if (uniqueCharmNames.includes(item.name)) {
                // Ensure we don't add duplicates if it runs multiple times
                if (!window.D4_DATABASE.charms.find(c => c.name === item.name + " (Charm)")) {
                    window.D4_DATABASE.charms.push({
                        name: item.name + " (Charm)",
                        baseName: item.name,
                        type: "Charm",
                        rarity: item.isMythic ? "mythic" : "unique",
                        isMythic: item.isMythic,
                        isUnique: true,
                        desc: item.desc,
                        icon: item.icon
                    });
                }
            }
        }
    }, 100);
"""

# Replace the old setTimeout block with the safe one
content = re.sub(r'setTimeout\(\(\) => \{.*?uniqueCharmNames.*?\}, 100\);', dynamic_unique_charms.strip(), content, flags=re.DOTALL)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed database.js")
