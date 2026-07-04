const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let fn = app.substring(app.indexOf('window.getGlyphStatsInRadius = function'), app.indexOf('function getAdditionalBonusValues()'));
let out = `
const fs = require('fs');
global.window = {};
eval(fs.readFileSync('assets/paragon.js', 'utf8'));
${fn}
const currentBuild = {paragon: {0: {boardId: 'Paragon_Necro_00', nodes: []}}};
global.currentBuild = currentBuild;
const bData = window.D4_PARAGON_DATA.paragonBoards['Paragon_Necro_00'];
for(let i=0; i<441; i++) { if(bData.nodes[i]) currentBuild.paragon[0].nodes.push(i); }
console.log(window.getGlyphStatsInRadius(0, {level: 15}));
`;
fs.writeFileSync('test_generated.js', out);
