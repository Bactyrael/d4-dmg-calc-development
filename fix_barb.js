const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const oldAllowed = `    if (mapped === 'ranged weapon') {
      return slotsArr.some(s => {
        const sl = s.toLowerCase();
        return sl.includes('ranged') || sl.includes('bow') || sl.includes('mainhand') || sl.includes('2h');
      });
    }`;

const newAllowed = `    if (mapped === 'ranged weapon' || mapped === 'bludgeoning weapon' || mapped === 'slicing weapon') {
      return slotsArr.some(s => {
        const sl = s.toLowerCase();
        return sl.includes('ranged') || sl.includes('bow') || sl.includes('mainhand') || sl.includes('2h') || sl.includes('1h') || sl.includes('blunt') || sl.includes('slash');
      });
    }`;

app = app.replace(oldAllowed, newAllowed);

fs.writeFileSync('app.js', app);
