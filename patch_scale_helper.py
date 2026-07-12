import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

helper_func = """  function getScaledSpriteStyle(iconObj, targetSize) {
      if (!iconObj || !iconObj.url) return '';
      
      // Assume original box was ~122px
      const scale = targetSize / 122;
      
      // Parse position: "-245px -5253px"
      let posMatch = iconObj.position.match(/(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px/);
      let posX = 0, posY = 0;
      if (posMatch) {
          posX = parseFloat(posMatch[1]) * scale;
          posY = parseFloat(posMatch[2]) * scale;
      }
      
      // Parse size: "512px 9856px"
      let sizeMatch = iconObj.size.match(/(\d+\.?\d*)px\s+(\d+\.?\d*)px/);
      let sizeX = 512 * scale, sizeY = 9856 * scale; // defaults
      if (sizeMatch) {
          sizeX = parseFloat(sizeMatch[1]) * scale;
          sizeY = parseFloat(sizeMatch[2]) * scale;
      }
      
      return `background-image: url('${iconObj.url}'); background-position: ${posX}px ${posY}px; background-size: ${sizeX}px ${sizeY}px; width: ${targetSize}px; height: ${targetSize}px; display: inline-block; vertical-align: middle;`;
  }
"""

if "function getScaledSpriteStyle" not in content:
    content = content.replace("function renderSealTab() {", helper_func + "\n  function renderSealTab() {")

# Replace Seal Tab rendering
old_seal_icon = """iconHtml = `<div class="item-icon" style="width: 36px; height: 36px; display: inline-block; vertical-align: middle; position: relative; overflow: hidden; background: transparent;"><div style="background-image: url('${item.icon.url}'); background-position: ${item.icon.position}; background-size: ${item.icon.size}; width: 122px; height: 122px; transform: scale(0.295); transform-origin: top left; position: absolute; top: 0; left: 0;"></div></div>`;"""
new_seal_icon = """iconHtml = `<div class="item-icon" style="${getScaledSpriteStyle(item.icon, 36)}"></div>`;"""

content = content.replace(old_seal_icon, new_seal_icon)

# There should be two occurrences because I replaced both seal and charm tabs with the exact same old_seal_icon string
content = content.replace(old_seal_icon, new_seal_icon)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Applied dynamic scale helper to app.js")
