with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(r"\'Seal\'", "'Seal'")
content = content.replace(r"\'display:none;\'", "'display:none;'")
content = content.replace(r"\'\'", "''")
content = content.replace(r"\'affix\'", "'affix'")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Replaced backslash quotes.")
