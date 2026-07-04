const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8').replace(/window\.D4_COMPILED_STATS/g, 'global.D4_COMPILED_STATS');
// Evaluate the code in this context
eval(app);

global.D4_COMPILED_STATS = {
    'Shadow Damage [x]': { final: 24, isMultiplicative: false }
};

global.getActiveConditions = () => ({});

const chilledToTheBone = {
    name: 'Chilled To The Bone',
    tags: ['Keyword_Chill', 'Damage_Override_Cold', 'Search_CastSpeed', 'Search_Cold'],
    damageType: ''
};

const multiBucket = calculateSkillMultiplicativeBucket(chilledToTheBone);
console.log('Multiplicative Bucket for Chilled To The Bone:', multiBucket);
