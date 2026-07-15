const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const uniques = [
  'Rustbitten Dirk',
  'Mace of King Leoric',
  'Sanguivor, Blade of Zir',
  'Shard of Verathiel',
  'Signet of Pelghain',
  'Wendigo Brand',
  'Gospel of the Devotee',
  'Lidless Wall',
  'Ring of the Sacrilegious Soul',
  'Tassets of the Dawning Sky'
];

let replacedCount = 0;
for (const unique of uniques) {
  // We want to match: item.name === 'Unique' or i.name === "Unique"
  const regex = new RegExp(`([a-zA-Z0-9_]+)\\.name\\s*===\\s*['"]${unique}['"]`, 'g');
  content = content.replace(regex, (match, p1) => {
    replacedCount++;
    console.log('Replaced:', match);
    return `(${p1}.name === '${unique}' || ${p1}.name === '${unique} (Charm)')`;
  });
}

fs.writeFileSync('app.js', content);
console.log('Total replacements:', replacedCount);
