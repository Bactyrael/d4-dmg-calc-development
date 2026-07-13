const fs = require('fs');

const payload = `
setTimeout(() => {
    // Add generic sets
    if (!window.D4_DATABASE.talismanSets) window.D4_DATABASE.talismanSets = {};
    
    window.D4_DATABASE.talismanSets['Survival'] = {
        pieces: ["Phoba of Survival", "Fer of Survival", "Mlor of Survival"],
        bonuses: {
            2: ["+[1,000] Armor", "+[100] Maximum Resistance to All Elements"],
            3: ["+[200] All Stats"]
        }
    };
    
    window.D4_DATABASE.talismanSets['Slaughter'] = {
        pieces: ["Phoba of Slaughter", "Fer of Slaughter", "Mlor of Slaughter"],
        bonuses: {
            2: ["+[5]% Damage Reduction", "x[10]% Damage"],
            3: ["+[10]% Damage Reduction from Elites", "x[15]% Damage to Elites"]
        }
    };
    
    window.D4_DATABASE.talismanSets['Mastery'] = {
        pieces: ["Phoba of Mastery", "Fer of Mastery"],
        bonuses: {
            2: ["+[2] to All Skills"]
        }
    };
    
    window.D4_DATABASE.talismanSets['Practiced Technique'] = {
        pieces: ["Phoba of Practiced Technique", "Fer of Practiced Technique", "Mlor of Practiced Technique"],
        bonuses: {
            2: ["+[5]% Attack Speed", "+[15]% Movement Speed"],
            3: ["+[25]% Gold Find", "+[50]% Bonus Kill Experience"]
        }
    };
    
    window.D4_DATABASE.talismanSets['Dark Pact'] = {
        pieces: ["Phoba of Dark Pact", "Fer of Dark Pact"],
        bonuses: {
            2: [
                "Lucky Hit: Up to a [40]% chance to deal [1,500] Cold damage",
                "Lucky Hit: Up to a [40]% chance to deal [1,500] Fire damage",
                "Lucky Hit: Up to a [40]% chance to deal [1,500] Lightning damage"
            ]
        }
    };

    const genericCharms = [
        { name: 'Phoba of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Phoba of Survival' },
        { name: 'Fer of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Fer of Survival' },
        { name: 'Mlor of Survival', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Mlor of Survival' },
    
        { name: 'Phoba of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Phoba of Slaughter' },
        { name: 'Fer of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Fer of Slaughter' },
        { name: 'Mlor of Slaughter', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Mlor of Slaughter' },
    
        { name: 'Phoba of Mastery', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Phoba of Mastery' },
        { name: 'Fer of Mastery', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Fer of Mastery' },
    
        { name: 'Phoba of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Phoba of Practiced Technique' },
        { name: 'Fer of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Fer of Practiced Technique' },
        { name: 'Mlor of Practiced Technique', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Mlor of Practiced Technique' },
    
        { name: 'Phoba of Dark Pact', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Phoba of Dark Pact' },
        { name: 'Fer of Dark Pact', type: 'Charm', class: 'ALL CLASSES', rarity: 'set', isUnique: false, icon: 'Fer of Dark Pact' }
    ];

    if (!window.D4_DATABASE.charms) window.D4_DATABASE.charms = [];
    window.D4_DATABASE.charms.push(...genericCharms);

}, 400);
`;

fs.appendFileSync('assets/database.js', payload);
console.log("Successfully appended generic sets and charms to database.js");
