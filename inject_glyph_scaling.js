const fs = require('fs');

let logic = fs.readFileSync('paragon_logic.js', 'utf8');

const regex = /(return stats;\s*\}\;)/;
const replacement = `  // --- Dynamic Glyph Scaling ---
  if (currentBuild && currentBuild.paragon) {
    for (let i = 0; i < 5; i++) {
      let boardState = currentBuild.paragon[i];
      if (boardState && boardState.glyph && boardState.glyph.id) {
          let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[boardState.glyph.id];
          if (gData && gData.affixes) {
              for (let affixKey of gData.affixes) {
                  let affixInfo = window.D4_PARAGON_DATA.paragonGlyphAffixes?.[affixKey];
                  if (affixInfo && affixInfo.formula && (affixInfo.formula.includes('StatSide') || affixInfo.formula.includes('Main') || affixInfo.formula.includes('Rare'))) {
                      
                      let reqAttrId = null;
                      if (affixInfo.convertedAttributes && affixInfo.convertedAttributes.length > 0) {
                          reqAttrId = affixInfo.convertedAttributes[0].from?.id;
                          let toAttrId = affixInfo.convertedAttributes[0].to?.id;
                          
                          if (reqAttrId && toAttrId) {
                              let currentStats = window.getGlyphStatsInRadius(i, boardState.glyph);
                              let purchased = 0;
                              if (reqAttrId === 9 || reqAttrId === 18) purchased = currentStats.Strength;
                              else if (reqAttrId === 10 || reqAttrId === 19) purchased = currentStats.Intelligence;
                              else if (reqAttrId === 11 || reqAttrId === 20) purchased = currentStats.Willpower;
                              else if (reqAttrId === 12 || reqAttrId === 21) purchased = currentStats.Dexterity;
                              
                              if (purchased > 0) {
                                  let base = affixInfo.base || 0;
                                  let perLvl = affixInfo.perLevel || 0;
                                  let gLvl = boardState.glyph.level || 1;
                                  let scalar = base + (perLvl * (gLvl - 1));
                                  
                                  // Divide by 5 for per-point scaling
                                  let perPoint = scalar / 5;
                                  let rawValue = perPoint * purchased;
                                  
                                  let attrMeta = window.D4_PARAGON_FORMULAS?.attributes?.[toAttrId];
                                  if (attrMeta) {
                                      let internalName = attrMeta.name;
                                      let descString = window.D4_PARAGON_FORMULAS?.attributeDescriptions?.[internalName];
                                      if (descString) {
                                          let parsed = window.cleanAttributeDescription(descString, rawValue, {id: toAttrId});
                                          if (parsed && parsed.name) {
                                              if (!stats[parsed.name]) {
                                                  stats[parsed.name] = { value: 0, isPercent: parsed.isPercent };
                                              }
                                              stats[parsed.name].value += parsed.value;
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
    }
  }

  $1`;

logic = logic.replace(regex, replacement);
fs.writeFileSync('paragon_logic.js', logic);
console.log("Injected dynamic glyph parsing logic into getCompiledParagonStats.");
