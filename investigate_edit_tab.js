const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const window = dom.window;
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

window.D4_DATABASE = {};
window.D4_DATABASE.itemDatabase = { 'mainhand': [{name: 'Bone Blade', weaponSpeed: 1.2}] };
window.D4_DATABASE.affixes = [{name: 'Test Affix', slots: ['mainhand']}];
window.D4_DATABASE.aspects = [];

const appCode = fs.readFileSync('app.js', 'utf8');
try {
  // Mock calculate function and others
  window.calculate = () => {};
  window.updateBuildStats = () => {};
  window.renderEquipment = () => {};
  window.saveCurrentBuild = () => {};
  window.currentBuild = { equipment: { 'mainhand': { affixes: [] } } };
  
  eval(appCode);
  
  // Set up dummy element
  const box = document.createElement('div');
  box.className = 'equipment-slot-box';
  box.dataset.slot = 'mainhand';
  box.dataset.value = JSON.stringify({name: 'Bone Blade', power: 900});
  document.body.appendChild(box);
  
  // Need to set class select
  const classSelect = document.createElement('select');
  classSelect.id = 'class-select';
  classSelect.innerHTML = '<option value="Necromancer" selected>Necromancer</option>';
  document.body.appendChild(classSelect);
  
  renderEditTab('mainhand');
  console.log("renderEditTab executed successfully.");
} catch (e) {
  console.error("Error in renderEditTab:", e.stack);
}
