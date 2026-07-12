with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

target = """    {
      "name": "Zid",
      "type": "Invocation",
      "description": "Invoke the Paladin's Blessed Spear, striking nearby to enemies.",
      "offering": 25
    }
  ]
};"""

replacement = """    {
      "name": "Zid",
      "type": "Invocation",
      "description": "Invoke the Paladin's Blessed Spear, striking nearby to enemies.",
      "offering": 25
    }
  ]
});"""

db = db.replace(target, replacement)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Replaced Object.assign closing brace.")
