const fs = require('fs');
const lines = fs.readFileSync('assets/database.js', 'utf8').split('\n');
const stats = new Set();
lines.forEach(l => {
    if(l.includes('"name":')) {
        const m = l.match(/"name":\s*"([^"]+)"/);
        if(m && m[1].includes(':')) stats.add(m[1]);
    }
});
Array.from(stats).slice(0, 30).forEach(s => console.log(s));
