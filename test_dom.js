const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');
const dbJs = fs.readFileSync('assets/database.js', 'utf8');

// evaluate database
eval(dbJs);

// Create a mock DOM environment
const domMock = {
    luckyHitChance: { value: 0, disabled: false, title: "" },
    attackSpeed: { value: 0, disabled: false, title: "" },
    critChance: { value: 5, disabled: false, title: "" },
    castSpeed: { value: 0, disabled: false, title: "" },
    strength: { value: 0 },
    intelligence: { value: 0 },
    willpower: { value: 0 },
    dexterity: { value: 0 },
    weaponDamage: { value: 0 },
    skillDamage: { value: 0 },
    aps: { value: 1 },
    weaponSpeed: { value: 1 },
    level: { value: 70 },
    ehpPhysical: {}, ehpFire: {}, ehpLightning: {}, ehpCold: {}, ehpPoison: {}, ehpShadow: {}
};

// mock getEquipmentValues
const getEquipmentValues = () => {
    return {
        "gloves": {
            "name": "Gloves",
            "affixes": ["+[8 - 9]% Lucky Hit Chance", "+[8 - 10]% Attack Speed"],
            "greaterAffixes": [false, false]
        }
    };
};

const dom = domMock;
let currentBuild = {};
let isLoading = false;
let autoStats = { baseStr: 7, baseInt: 7, baseWill: 7, baseDex: 7, levelStr: 69, levelInt: 69, levelWill: 69, levelDex: 69 };

// extract compileCharacterStats and calculate
const compileMatch = appJs.match(/function compileCharacterStats[\s\S]+?return stats;\n  }/);
const addStatMatch = appJs.match(/function addStat[\s\S]+?\}\n\s*\}\n/);
// This is too brittle. Let's just execute the whole app.js inside a JSDOM environment if possible, or just extract exactly what we need.

// For now, let's just do a manual extraction of `compileCharacterStats` logic using the DB
const stats = {};
function addStat(stats, statName, value, sourceName) {
    if (!value) return;
    let cleanName = statName.replace(/^\+\[[\d\.,\s-]+\]%?\s*/, '').replace(/ \[x\]$/, '').replace(/^\+[\d\.,]+%?\s*/, '').trim();
    if (!stats[cleanName]) stats[cleanName] = { total: 0, final: 0, sources: [] };
    stats[cleanName].total += value;
    stats[cleanName].final = stats[cleanName].total;
}

const equipped = getEquipmentValues();
Object.keys(equipped).forEach(slotName => {
    const item = equipped[slotName];
    if (item.affixes) {
        item.affixes.forEach((affixName, i) => {
            let v = 0;
            let match = affixName.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
            if (match) {
                v = parseFloat(match[2].replace(/,/g, ''));
            } else {
                // fallback
                const dbMatch = window.D4_DATABASE.classData['Necromancer'].equipment['gloves'].modifiers.find(a => a.shortName === affixName || a.name === affixName);
                if (dbMatch) {
                    match = dbMatch.name.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                    if (match) v = parseFloat(match[2].replace(/,/g, ''));
                }
            }
            let isGA = item.greaterAffixes?.[i] || false;
            let val = isGA ? v * 1.5 : v;
            addStat(stats, affixName, val, slotName);
        });
    }
});

console.log("Compiled Stats:", JSON.stringify(stats, null, 2));

// Test update logic
if (dom.luckyHitChance) {
    dom.luckyHitChance.value = stats['Lucky Hit Chance'] ? stats['Lucky Hit Chance'].final : 0;
}
if (dom.attackSpeed) {
    dom.attackSpeed.value = stats['Attack Speed'] ? stats['Attack Speed'].final : 0;
}
console.log("DOM Lucky Hit:", dom.luckyHitChance.value);
console.log("DOM Attack Speed:", dom.attackSpeed.value);

