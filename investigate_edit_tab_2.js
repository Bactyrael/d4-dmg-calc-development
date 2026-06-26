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
    
    // Simulate clicking it
    box.click();
    
    // Check if edit body has content
    const editBody = dom.window.document.getElementById('item-modal-edit-body');
    console.log("Edit Body Length:", editBody.innerHTML.length);
    if (editBody.innerHTML.length < 100) {
      console.log("Edit Body is empty or too short!");
    } else {
      console.log("Edit Body seems rendered.");
    }
  } catch(e) {
    console.error("Error clicking/rendering:", e);
  }
}, 1000);
