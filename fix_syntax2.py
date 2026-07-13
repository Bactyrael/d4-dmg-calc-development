with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

bad_string = """            },
            "name": "of Insight"""

good_string = """            },
            {
              "name": "of Insight"""

db = db.replace(bad_string, good_string)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Syntax fixed 2!")
