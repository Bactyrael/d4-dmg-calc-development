const fs = require('fs');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));
const affixes = data.affixes;
const itemTypes = data.itemTypes;
const attrDescriptions = data.attributeDescriptions;
const attrFormulas = data.attributeFormulas;
const attributes = data.attributes;

const IPower = 925;

const slotsToExport = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Amulet', 'Ring', 'Wand', 'Staff', 'Focus', 'Shield', 'Dagger', 'Sword', 'Sword2H', 'Scythe', 'Scythe2H'];
const slotItemLabels = {};

for (const [id, typeObj] of Object.entries(itemTypes)) {
  if (slotsToExport.includes(typeObj.name) || typeObj.name === 'Focus' || typeObj.name === 'Shield') {
    slotItemLabels[typeObj.name] = typeObj.itemLabels || [];
  }
}

function evaluateFormula(formulaStr, isMax) {
  let f = formulaStr.replace(/IPower\(\)/g, IPower.toString());
  
  // Custom math context for eval
  const Round = Math.round;
  const Max = Math.max;
  const Min = Math.min;
  const Ceil = Math.ceil;
  const Floor = Math.floor;
  const FloatRandomRangeWithInterval = (a, b, c) => isMax ? c : b;
  const GetTotalAffixBonus = () => 1;
  
  // Replace RandomInt(a, b) and RandomFloat(a, b)
  f = f.replace(/RandomInt\(([^,]+),\s*(.+?)\)/g, (match, a, b) => {
    return isMax ? b : a;
  });
  f = f.replace(/RandomFloat\(([^,]+),\s*(.+?)\)/g, (match, a, b) => {
    return isMax ? b : a;
  });

  try {
    return eval(f);
  } catch(e) {
    fs.appendFileSync('eval_errors.log', f + ' | ' + e.message + '\\n');
    return 0;
  }
}

try { fs.unlinkSync('eval_errors.log'); } catch(e) {}

const slotAffixes = {};
slotsToExport.forEach(s => slotAffixes[s] = new Set());

for (const affixKey in affixes) {
  const affix = affixes[affixKey];
  if (!affix.classFilter || !affix.classFilter[4]) continue;
  if (!affix.attributes || affix.attributes.length === 0) continue;
  
  const attrId = affix.attributes[0].id;
  const attr = attributes[attrId];
  if (!attr) continue;
  
  const attrName = attr.name;
  let descString = attrDescriptions[attrName];
  if (!descString) continue;
  
  const formulaId = affix.attributes[0].formula;
  let formulaList = attrFormulas[formulaId];
  
  let formulaStr = null;
  if (Array.isArray(formulaList)) {
    formulaList.sort((a,b) => b.power - a.power);
    for (const f of formulaList) {
      if (f.power <= IPower) {
        formulaStr = f.formula;
        break;
      }
    }
  } else if (typeof formulaList === 'string') {
    formulaStr = formulaList;
  }
  
  if (!formulaStr) continue;
  
  let minVal = evaluateFormula(formulaStr, false);
  let maxVal = evaluateFormula(formulaStr, true);
  
  // Often maxroll formulas output scalar numbers which need to be *100 if the UI string has %
  // The actual conversion is usually handled by UI formatting tags, e.g. {value1} vs {value1} * 100
  // But D4 stats vary. Let's just output the formula evaluation for now.
  // Actually, some tags look like `+[*100|1%|] Intelligence`
  
  let formattedMin = minVal;
  let formattedMax = maxVal;
  
  if (descString.includes('*100')) {
     formattedMin = minVal * 100;
     formattedMax = maxVal * 100;
  }
  
  formattedMin = (formattedMin >= 10 ? Math.round(formattedMin) : formattedMin.toFixed(1));
  formattedMax = (formattedMax >= 10 ? Math.round(formattedMax) : formattedMax.toFixed(1));
  
  let statString = descString.replace(/\[([^\]]+)\]/g, (match, inner) => {
    if (inner.includes('%')) return `[${formattedMin} - ${formattedMax}]%`;
    return `[${formattedMin} - ${formattedMax}]`;
  });
  
  // Clean up maxroll internal tags like {c_important} and {value1}
  statString = statString.replace(/\{c_.*?}/g, '');
  statString = statString.replace(/\{\/c\}/g, '');
  statString = statString.replace(/\{value\d*\}/g, '');
  
  // Some resistances are formatted strangely like ' Resistance'. Fix spacing.
  statString = statString.replace(/  /g, ' ').trim();
  
  const aLabels = affix.itemLabels || [];
  
  for (const [slotName, sLabels] of Object.entries(slotItemLabels)) {
    const isValid = aLabels.some(l => sLabels.includes(l));
    if (isValid) {
      slotAffixes[slotName].add(statString.trim());
    }
  }
}

const finalExport = {};
for (const [k, v] of Object.entries(slotAffixes)) {
  finalExport[k] = Array.from(v).sort();
}

fs.writeFileSync('assets/maxroll_parsed_affixes.json', JSON.stringify(finalExport, null, 2));
