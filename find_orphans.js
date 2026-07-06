const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// We want to find objects with name: "X (Y)" where X is some name, Y is a skill, e.g., "Damage Bonus (Sever)"
// or "Damage Reduction (Blood Wave)".
const regex = /name:\s*['"]([a-zA-Z\s]+\([a-zA-Z\s]+\))['"]/g;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[1]);
}

console.log('Renamed Skills found in app.js:');
found.forEach(item => console.log(item));

// Also let's find all window.selectedSkills lookups
const lookupRegex = /window\.selectedSkills\[['"]([^'"]+)['"]\]/g;
const lookups = new Set();
while ((match = lookupRegex.exec(content)) !== null) {
  lookups.add(match[1]);
}

console.log('\nLookups in window.selectedSkills:');
lookups.forEach(item => {
  // Print only lookups that don't have parenthesis but maybe should? Or print all and we can manually check
  if (!item.includes('(')) {
    // console.log(item); // this might be too noisy, let's just save to a file or print all
  }
});

// To be precise, let's identify potential orphans: lookups for generic terms like "Damage Bonus", "Damage Reduction"
const genericTerms = ['Damage Bonus', 'Damage Reduction', 'Ferocity', 'Size Increase', 'Essence Cost Reduction'];
console.log('\nPotential orphaned lookups:');
lookups.forEach(item => {
  if (genericTerms.some(term => item === term)) {
    console.log(item);
  }
});
