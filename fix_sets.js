const fs = require('fs');
let content = fs.readFileSync('assets/database.js', 'utf8');

const startMarker = `    // Add generic sets`;
const startIndex = content.indexOf(startMarker);

if (startIndex !== -1) {
    const endMarker = `}, 400);`;
    const endIndex = content.indexOf(endMarker, startIndex);
    
    if (endIndex !== -1) {
        const replacement = `    // Add generic sets
    if (!window.D4_DATABASE.talismanSets) window.D4_DATABASE.talismanSets = {};
    
    window.D4_DATABASE.talismanSets['Survival'] = {
        "2": "+[1,000] Armor<br>+[100] All Resistances",
        "3": "+[200] All Stats"
    };
    
    window.D4_DATABASE.talismanSets['Slaughter'] = {
        "2": "+[5]% Damage Reduction<br>x[10]% Damage",
        "3": "+[10]% Damage Reduction from Elites<br>x[15]% Damage to Elites"
    };
    
    window.D4_DATABASE.talismanSets['Mastery'] = {
        "2": "+[2] to All Skills"
    };
    
    window.D4_DATABASE.talismanSets['Practiced Technique'] = {
        "2": "+[5]%[+] Attack Speed<br>+[15]%[+] Movement Speed",
        "3": "+[25]%[+] Gold Find<br>+[50]%[+] Bonus Kill Experience<br>(5%[+] at level 70)"
    };
    
    window.D4_DATABASE.talismanSets['Dark Pact'] = {
        "2": "Lucky Hit: Up to a [40]% chance to deal [1,500] Cold damage<br>Lucky Hit: Up to a [40]% chance to deal [1,500] Fire damage<br>Lucky Hit: Up to a [40]% chance to deal [1,500] Lightning damage"
    };

    const getIcon = (name) => window.D4_DATABASE.talismanIcons[name] || window.TALISMAN_SPRITES[name];

    const fZoltun = "Life can be most often characterized as meat ruled by instinct. Dumb flesh, Mlor alone. Disassembly is the most efficient, I find. - Zoltun Kulle";
    const fTalRasha1 = "Berú... The purest, strongest, and most perilous aspect of the mage is their Soul. Our work demands that we risk it for the greater good. When and how is your choice. -Tal Rasha";
    const fTalRasha2 = "Phoba, Fer. Emotion and Mind. These form the root of a mage's intention, no matter the medium. Focus first upon these, and put all ambition aside. -Tal Rasha";

    const genericCharms = [
        { name: 'Phoba of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Survival', icon: getIcon('Phoba of Survival'), flavorText: fZoltun },
        { name: 'Fer of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Survival', icon: getIcon('Fer of Survival'), flavorText: fZoltun },
        { name: 'Mlor of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Survival', icon: getIcon('Mlor of Survival'), flavorText: fZoltun },
    
        { name: 'Phoba of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Slaughter', icon: getIcon('Phoba of Slaughter'), flavorText: fZoltun },
        { name: 'Fer of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Slaughter', icon: getIcon('Fer of Slaughter'), flavorText: fZoltun },
        { name: 'Mlor of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Slaughter', icon: getIcon('Mlor of Slaughter'), flavorText: fZoltun },
    
        { name: 'Phoba of Mastery', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Mastery', icon: getIcon('Phoba of Mastery'), flavorText: fTalRasha2 },
        { name: 'Fer of Mastery', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Mastery', icon: getIcon('Fer of Mastery'), flavorText: fTalRasha2 },
    
        { name: 'Phoba of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Practiced Technique', icon: getIcon('Phoba of Practiced Technique'), flavorText: fTalRasha2 },
        { name: 'Fer of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Practiced Technique', icon: getIcon('Fer of Practiced Technique'), flavorText: fTalRasha2 },
        { name: 'Mlor of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Practiced Technique', icon: getIcon('Mlor of Practiced Technique'), flavorText: fTalRasha2 },
    
        { name: 'Phoba of Dark Pact', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Dark Pact', icon: getIcon('Phoba of Dark Pact'), flavorText: fTalRasha1 },
        { name: 'Fer of Dark Pact', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, set: 'Dark Pact', icon: getIcon('Fer of Dark Pact'), flavorText: fTalRasha1 }
    ];

    if (!window.D4_DATABASE.charms) window.D4_DATABASE.charms = [];
    window.D4_DATABASE.charms.push(...genericCharms);

`;
        content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
        fs.writeFileSync('assets/database.js', content);
        console.log("Replaced sets and added flavor text");
    } else {
        console.log("End marker not found");
    }
} else {
    console.log("Start marker not found");
}
