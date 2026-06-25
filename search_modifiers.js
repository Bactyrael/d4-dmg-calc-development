const fs = require('fs');
const data = JSON.parse(fs.readFileSync('assets/affixes_data.json', 'utf8'));
const searchTerms = ['Toughened', 'Unbound', 'Swift', 'Wise', 'Vigorous', 'Lucky'];

searchTerms.forEach(term => {
    const found = data.filter(a => (a.name && a.name.includes(term)) || (a.desc && a.desc.includes(term)));
    console.log("Searched for " + term + ": found " + found.length + " matches");
    if (found.length > 0) {
        console.log(found.slice(0, 2).map(f => f.name || f.desc));
    }
});
