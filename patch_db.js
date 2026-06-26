const fs = require('fs');
let file = fs.readFileSync('assets/database.js', 'utf8');

// The DB is defined as window.D4_DATABASE = { ... }

function injectResist(itemClass, resValue) {
    const regex = new RegExp('(\"' + itemClass + '\":\\s*\\[)([\\\\s\\\\S]*?)(\\]\\,)', 'g');
    file = file.replace(regex, (match, p1, p2, p3) => {
        let modified = p2.replace(/(\"rarity\":\\s*\"[^\"]+\")((?:,\\s*\"classes\":\\s*\\[.*?\\])?)/g, '$1$2, \"resistance\": ' + resValue);
        return p1 + modified + p3;
    });
}

injectResist('Amulet', 230);
injectResist('Ring', 173);

fs.writeFileSync('assets/database.js', file);
console.log('Done!');
