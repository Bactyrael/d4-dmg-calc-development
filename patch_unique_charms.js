const fs = require('fs');

const path = 'assets/database.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /desc: item\.desc,\s*icon: window\.D4_DATABASE\.talismanIcons\[item\.name\] \|\| item\.icon\s*\n\s*\}/m;

if (regex.test(content)) {
    const replacement = `desc: item.desc,
                        icon: window.D4_DATABASE.talismanIcons[item.name] || item.icon,
                        affixes: item.affixes ? [...item.affixes] : [],
                        inherentAffixes: item.inherentAffixes ? [...item.inherentAffixes] : []
                    }`;
    content = content.replace(regex, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully patched unique charms in database.js.");
} else {
    console.log("Target string not found using regex.");
}
