with open("assets/database.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """          {
              name: "Seal of the Golden Epiphany",
              icon: { url: "https://assets.infinitybuilds.gg/assets/d4/atlases/2DInventory_Talisman.webp", position: "-1px -469px", size: "512px 9856px" },
              type: "Seal",
              rarity: "mythic",
              isMythic: true,
              desc: "Can equip up to 3 Unique Charms."
          }
      ],"""

replacement = """          {
              name: "Seal of the Golden Epiphany",
              icon: { url: "https://assets.infinitybuilds.gg/assets/d4/atlases/2DInventory_Talisman.webp", position: "-1px -469px", size: "512px 9856px" },
              type: "Seal",
              rarity: "mythic",
              isMythic: true,
              desc: "Can equip up to 3 Unique Charms."
          },
          {
              name: "Legendary Horadric Seal",
              icon: { url: "https://assets.infinitybuilds.gg/assets/d4/atlases/2DInventory_Talisman.webp", position: "-1px -235px", size: "512px 9856px" },
              type: "Seal",
              rarity: "legendary",
              isMythic: false,
              desc: "Unlocks 5 Charm Slots"
          }
      ],"""

if target in content:
    content = content.replace(target, replacement)
    with open("assets/database.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Added Legendary Horadric Seal.")
else:
    print("Target not found. Doing fallback.")
    target_fallback = '              desc: "Can equip up to 3 Unique Charms."\n          }\n      ],'
    if target_fallback in content:
        content = content.replace(target_fallback, '              desc: "Can equip up to 3 Unique Charms."\n          },\n          {\n              name: "Legendary Horadric Seal",\n              icon: { url: "https://assets.infinitybuilds.gg/assets/d4/atlases/2DInventory_Talisman.webp", position: "-1px -235px", size: "512px 9856px" },\n              type: "Seal",\n              rarity: "legendary",\n              isMythic: false,\n              desc: "Unlocks 5 Charm Slots"\n          }\n      ],')
        with open("assets/database.js", "w", encoding="utf-8") as f:
            f.write(content)
        print("Fallback worked.")
