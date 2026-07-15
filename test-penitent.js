const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

// Mock DOM
global.window = {
    D4_COMPILED_STATS: {},
    D4_DATABASE: { charms: [] }
};
global.document = {
    getElementById: (id) => null
};
global.addStat = function(stats, key, val, src) {
    if(!stats[key]) stats[key] = { final: 0, isMultiplicative: false };
    stats[key].final += val;
};

// Evaluate app.js but intercept execution
try {
    eval(code + "\n\nmodule.exports = { compileCharacterStats, calculateSkillMultiplicativeBucket };");
} catch(e) {
    // Ignore errors from immediate execution in app.js
}

const app = module.exports;

const equipped = {
    "Feet": {
        name: "Penitent Greaves",
        isUnique: true,
        aspectValues: [10] // Roll 10%
    }
};

let stats = {};
try {
    stats = app.compileCharacterStats(equipped, false);
    console.log("Stats from compileCharacterStats:", stats["Penitent_Greaves_Mult"]);
    window.D4_COMPILED_STATS = stats;
} catch(e) {
    console.log("Error in compileCharacterStats:", e);
}

const skill = { name: "Bone Spear", tags: [] };
try {
    global.getActiveConditions = () => ({ chilled: true });
    let multi = app.calculateSkillMultiplicativeBucket(skill, true);
    console.log("Multiplicative Bucket Components:", multi.components.filter(c => c.name.includes("Penitent")));
} catch(e) {
    console.log("Error in calculateSkillMultiplicativeBucket:", e);
}
