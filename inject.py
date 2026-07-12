with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Let's find "type: \"Seal\"," backwards from "charms: ["
idx = db.find('"charms": [')
if idx != -1:
    close_bracket_idx = db.rfind("]", 0, idx)
    if close_bracket_idx != -1:
        new_seal = """,
          {
              name: "Legendary Horadric Seal",
              icon: { url: "https://assets.infinitybuilds.gg/assets/d4/atlases/2DInventory_Talisman.webp", position: "-1px -235px", size: "512px 9856px" },
              type: "Seal",
              rarity: "legendary",
              isMythic: false,
              desc: "Unlocks 5 Charm Slots"
          }
      """
        # insert new_seal right before close_bracket_idx
        db = db[:close_bracket_idx] + new_seal + db[close_bracket_idx:]
        
        with open("assets/database.js", "w", encoding="utf-8") as f:
            f.write(db)
        print("Successfully injected Legendary Horadric Seal!")
