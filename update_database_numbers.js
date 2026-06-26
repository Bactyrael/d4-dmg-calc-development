const fs = require('fs');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));
const affixes = data.affixes;
const attrDescriptions = data.attributeDescriptions;
const attrFormulas = data.attributeFormulas;
const attributes = data.attributes;

const IPower = 900; // Ancestral max

function evaluateFormula(formulaStr, isMax) {
  let f = formulaStr.replace(/IPower\(\)/g, IPower.toString());
  
  const Round = Math.round;
  const Max = Math.max;
  const Min = Math.min;
  const Ceil = Math.ceil;
  const Floor = Math.floor;
  const FloatRandomRangeWithInterval = (a, b, c) => isMax ? c : b;
  const GetTotalAffixBonus = () => 1;
  
  f = f.replace(/RandomInt\(([^,]+),\s*(.+?)\)/g, (match, a, b) => isMax ? b : a);
  f = f.replace(/RandomFloat\(([^,]+),\s*(.+?)\)/g, (match, a, b) => isMax ? b : a);

  try { return eval(f); } catch(e) { return 0; }
}

const parsedAffixes = [];

for (const affixKey in affixes) {
  const affix = affixes[affixKey];
  if (!affix.attributes || affix.attributes.length === 0) continue;
  
  const attrId = affix.attributes[0].id;
  const attr = attributes[attrId];
  if (!attr) continue;
  
  let descString = attrDescriptions[attr.name];
  if (!descString) continue;
  
  const formulaId = affix.attributes[0].formula;
  let formulaList = attrFormulas[formulaId];
  let formulaStr = null;
  if (Array.isArray(formulaList)) {
    formulaList.sort((a,b) => b.power - a.power);
    for (const f of formulaList) {
      if (f.power <= IPower) { formulaStr = f.formula; break; }
    }
  } else if (typeof formulaList === 'string') {
    formulaStr = formulaList;
  }
  
  if (!formulaStr) continue;
  
  let minVal = evaluateFormula(formulaStr, false);
  let maxVal = evaluateFormula(formulaStr, true);
  
  let formattedMin = minVal;
  let formattedMax = maxVal;
  if (descString.includes('*100')) {
     formattedMin *= 100;
     formattedMax *= 100;
  }
  formattedMin = formattedMin >= 10 ? Math.round(formattedMin) : formattedMin.toFixed(1);
  formattedMax = formattedMax >= 10 ? Math.round(formattedMax) : formattedMax.toFixed(1);
  
  let statString = descString.replace(/\[([^\]]+)\]/g, (match, inner) => {
    if (inner.includes('%')) return `[${formattedMin} - ${formattedMax}]%`;
    return `[${formattedMin} - ${formattedMax}]`;
  });
  
  statString = statString.replace(/\{c_.*?}/g, '').replace(/\{\/c\}/g, '').replace(/\{value\d*\}/g, '').replace(/  /g, ' ').trim();
  
  if (!statString.startsWith('+') && statString.match(/^\[/)) {
     statString = '+' + statString;
  }
  
  parsedAffixes.push({
    rawText: statString,
    baseText: statString.replace(/^[+\[\]\d\.,\-\s%]+(to )?/, '').trim(),
    min: parseFloat(formattedMin),
    max: parseFloat(formattedMax)
  });
}

// Load pristine database
const window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));

let matchesCount = 0;
for (const a of window.D4_DATABASE.affixes) {
  let oldBaseText = a.name.replace(/^[+\[\]\d\.,\-\s%]+(to )?/, '').trim();
  
  // Find all matches in parsedAffixes
  let matches = parsedAffixes.filter(p => p.baseText === oldBaseText);
  if (matches.length > 0) {
    matches.sort((x, y) => x.max - y.max);
    
    // If it's a temper, pick the highest variant, else pick the lowest variant
    let chosen = a.tempering ? matches[matches.length - 1] : matches[0];
    
    console.log(`Updated: ${a.name} -> ${chosen.rawText}`);
    a.name = chosen.rawText;
    matchesCount++;
  } else {
    // If no exact match, try ignoring "to "
    let oldBaseTextNoTo = a.name.replace(/^[+\[\]\d\.,\-\s%]+(to )?/, '').replace(/^to /, '').trim();
    let matches2 = parsedAffixes.filter(p => p.baseText.replace(/^to /, '').trim() === oldBaseTextNoTo);
    if (matches2.length > 0) {
      matches2.sort((x, y) => x.max - y.max);
      let chosen = a.tempering ? matches2[matches2.length - 1] : matches2[0];
      console.log(`Updated (loose): ${a.name} -> ${chosen.rawText}`);
      a.name = chosen.rawText;
      matchesCount++;
    } else {
      console.log(`NO MATCH FOUND for: ${a.name}`);
    }
  }
}

console.log(`Matched ${matchesCount} out of ${window.D4_DATABASE.affixes.length}`);

// Write back to database.js
const newDbStr = `window.D4_DATABASE = ${JSON.stringify(window.D4_DATABASE, null, 2)};`;
fs.writeFileSync('assets/database.js', newDbStr);

