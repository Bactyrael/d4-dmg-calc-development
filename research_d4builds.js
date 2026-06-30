const https = require('https');

https.get('https://d4builds.gg/app-aed816527968c16e2f64.js', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        let pngs = data.match(/[^"']+\.png/g) || [];
        console.log("PNGs found in app.js:");
        console.log([...new Set(pngs)].slice(0, 50).join('\n'));
    });
});
