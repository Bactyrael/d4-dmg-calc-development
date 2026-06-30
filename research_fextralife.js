const https = require('https');

https.get('https://diablo4.wiki.fextralife.com/Necromancer+Paragon+Boards', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        let regex = /<img[^>]+src=["']([^"']+\.png)["']/g;
        let match;
        let images = [];
        while((match = regex.exec(data)) !== null) {
            images.push(match[1]);
        }
        let nodes = images.filter(u => u.toLowerCase().includes('node') || u.toLowerCase().includes('paragon'));
        console.log("Found Node Images:");
        console.log([...new Set(nodes)].join('\n'));
    });
});
