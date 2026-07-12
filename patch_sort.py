with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = "const charms = window.D4_DATABASE?.charms || [];\n      charms.forEach(item => {"

replacement = """const charms = [...(window.D4_DATABASE?.charms || [])].sort((a, b) => {
          const aIsSet = a.rarity === 'set';
          const bIsSet = b.rarity === 'set';
          
          if (aIsSet && bIsSet) {
              if (a.set === b.set) return a.name.localeCompare(b.name);
              return (a.set || '').localeCompare(b.set || '');
          }
          if (aIsSet) return -1;
          if (bIsSet) return 1;
          
          return a.name.localeCompare(b.name);
      });
      charms.forEach(item => {"""

content = content.replace(target, replacement)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Added sorting to renderCharmTab.")
