const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });

// Load database script first
const dbScript = fs.readFileSync('assets/database.js', 'utf8');
dom.window.eval(dbScript);

const appCode = fs.readFileSync('app.js', 'utf8');
dom.window.eval(appCode);

// Wait a bit for DOMContentLoaded
setTimeout(() => {
  try {
    // Select an item
    const box = dom.window.document.querySelector('.equipment-slot-box[data-slot="mainhand"]');
    box.dataset.value = JSON.stringify({name: 'Bone Blade', power: 900, affixes: []});
    
    // Simulate clicking it to open Edit tab
    box.click();
    
    // Set up modifier editing state
    dom.window.currentModifierEditing = { type: 'affix', idx: 0, slotName: 'mainhand' };
    
    // Fix class map
    dom.window.D4_CLASS_MAP = {
      'Barbarian': 0,
      'Druid': 1,
      'Necromancer': 4,
      'Rogue': 5,
      'Sorcerer': 6,
      'Spiritborn': 7
    };
    
    // Call renderModifierTab manually
    dom.window.renderModifierTab('mainhand', 'affix');
    
    // Check what is in the modifier list
    const list = dom.window.document.getElementById('item-modal-modifier-list');
    
    const titles = Array.from(list.querySelectorAll('.item-card-title')).map(el => el.textContent);
    console.log("Total modifiers rendered:", titles.length);
    console.log("Does it include Weapon Damage?", titles.some(t => t.includes('Weapon Damage')));
    console.log("Matches:", titles.filter(t => t.includes('Weapon Damage')));
  } catch(e) {
    console.error("Error:", e);
  }
}, 1000);
