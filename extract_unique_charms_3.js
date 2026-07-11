const fs = require('fs');

const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

const results = [];

for (const key in data) {
    if (key.includes("Talisman_Charm_Affix_") || key.includes("Talisman_SealAffix_")) {
        const item = data[key];
        if (item && item.desc) {
            results.push({
                key: key,
                desc: item.desc
            });
        }
    }
}

fs.writeFileSync('unique_charms_dump.json', JSON.stringify(results, null, 2));
console.log(`Extracted ${results.length} charm/seal affixes`);
