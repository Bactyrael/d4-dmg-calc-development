with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """  function getScaledSpriteStyle(iconObj, targetSize) {
      if (!iconObj || !iconObj.url) return '';
      
      // Assume original box was ~122px
      const scale = targetSize / 122;
      
      // Parse position: "-245px -5253px"
      let posMatch = iconObj.position.match(/(-?\\d+\\.?\\d*)px\\s+(-?\\d+\\.?\\d*)px/);
      let posX = 0, posY = 0;
      if (posMatch) {
          posX = parseFloat(posMatch[1]) * scale;
          posY = parseFloat(posMatch[2]) * scale;
      }
      
      // Parse size: "512px 9856px"
      let sizeMatch = iconObj.size.match(/(\\d+\\.?\\d*)px\\s+(\\d+\\.?\\d*)px/);
      let sizeX = 512 * scale, sizeY = 9856 * scale; // defaults
      if (sizeMatch) {
          sizeX = parseFloat(sizeMatch[1]) * scale;
          sizeY = parseFloat(sizeMatch[2]) * scale;
      }
      
      return `background-image: url('${iconObj.url}'); background-position: ${posX}px ${posY}px; background-size: ${sizeX}px ${sizeY}px; width: ${targetSize}px; height: ${targetSize}px; display: inline-block; vertical-align: middle;`;
  }"""

# Actually, because Python string literals interpret \d, my target above uses \\d. But wait, in the original script it used \d and python stripped it?
# Let's just find the start and end of the function using find().
start_idx = content.find("function getScaledSpriteStyle")
if start_idx != -1:
    end_idx = content.find("  function renderSealTab", start_idx)
    
    new_func = """function getScaledSpriteStyle(iconObj, targetSize) {
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
}

"""
    # Fix the double escaping back to single in JS
    new_func = new_func.replace('\\\\', '\\')
    
    content = content[:start_idx] + new_func + content[end_idx:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Replaced getScaledSpriteStyle successfully.")
else:
    print("Function not found.")
