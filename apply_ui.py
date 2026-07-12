import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# For Seal Tab
seal_target = """row.innerHTML = `<div class="item-icon" style="color: #c17ce2;">M</div><div class="item-name rarity-mythic">${item.name}</div>`;"""
seal_replace = """let iconHtml = `<div class="item-icon" style="color: #c17ce2;">M</div>`;
          if (item.icon && item.icon.url) {
              iconHtml = `<div class="item-icon" style="background-image: url('${item.icon.url}'); background-position: ${item.icon.position}; background-size: ${item.icon.size}; width: 36px; height: 36px; display: inline-block; vertical-align: middle;"></div>`;
          }
          row.innerHTML = `${iconHtml}<div class="item-name rarity-mythic" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;"""

content = content.replace(seal_target, seal_replace)

# For Charm Tab
charm_target = """row.innerHTML = `<div class="item-icon" style="color: ${color};">${letter}</div><div class="item-name ${rarityClass}">${item.name}</div>`;"""
charm_replace = """let iconHtml = `<div class="item-icon" style="color: ${color};">${letter}</div>`;
          if (item.icon && item.icon.url) {
              iconHtml = `<div class="item-icon" style="background-image: url('${item.icon.url}'); background-position: ${item.icon.position}; background-size: ${item.icon.size}; width: 36px; height: 36px; display: inline-block; vertical-align: middle;"></div>`;
          }
          row.innerHTML = `${iconHtml}<div class="item-name ${rarityClass}" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;"""

content = content.replace(charm_target, charm_replace)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Applied UI patch to app.js")
