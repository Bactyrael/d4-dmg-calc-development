import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

new_func = """  function getScaledSpriteStyle(iconObj, targetSize) {
      if (!iconObj || !iconObj.url) return '';
      
      const cellWidth = 122.5;
      const cellHeight = 182;
      const scale = targetSize / cellWidth;
      
      let posMatch = iconObj.position.match(/(-?\\d+\\.?\\d*)px\\s+(-?\\d+\\.?\\d*)px/);
      let posX = 0, posY = 0;
      if (posMatch) {
          let origX = parseFloat(posMatch[1]);
          let origY = parseFloat(posMatch[2]);
          
          let scaledCellHeight = cellHeight * scale;
          let yOffsetToCenter = (scaledCellHeight - targetSize) / 2;
          
          posX = origX * scale;
          posY = (origY * scale) - yOffsetToCenter;
      }
      
      let sizeMatch = iconObj.size.match(/(\\d+\\.?\\d*)px\\s+(\\d+\\.?\\d*)px/);
      let sizeX = 512 * scale, sizeY = 9856 * scale;
      if (sizeMatch) {
          sizeX = parseFloat(sizeMatch[1]) * scale;
          sizeY = parseFloat(sizeMatch[2]) * scale;
      }
      
      return `background-image: url('${iconObj.url}'); background-position: ${posX}px ${posY}px; background-size: ${sizeX}px ${sizeY}px; width: ${targetSize}px; height: ${targetSize}px; display: inline-block; vertical-align: middle;`;
  }"""

# Using python regex to safely replace the old function block
content = re.sub(
    r'function getScaledSpriteStyle\(iconObj, targetSize\) \{.*?(?=\s+function renderSealTab)', 
    new_func + "\n", 
    content, 
    flags=re.DOTALL
)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated getScaledSpriteStyle.")
