const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Fix renderEditTab enabling tabs
const renderEditTabOld = `    function renderEditTab(slotName) {
      const editBody = document.getElementById('item-modal-edit-body');
      const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"]\`);
      const tabs = document.querySelectorAll('.item-modal-tab');
      const editTabBtn = tabs[1];
      const aspectTabBtn = tabs[2];
      const modifierTabBtn = tabs[3];
      const gemTabBtn = tabs[4];
      
      if (!editBody || !box) return;
  
      if (!box.dataset.value) {
        editTabBtn.disabled = true;
        aspectTabBtn.disabled = true;
        modifierTabBtn.disabled = true;
        gemTabBtn.disabled = true;
        return;
      } else {
        editTabBtn.disabled = false;
        aspectTabBtn.disabled = false;
        modifierTabBtn.disabled = false;
        gemTabBtn.disabled = false;
      }`;

const renderEditTabNew = `    function renderEditTab(slotName) {
      const editBody = document.getElementById('item-modal-edit-body');
      const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"]\`);
      const tabs = document.querySelectorAll('.item-modal-tab');
      const editTabBtn = tabs[1];
      const aspectTabBtn = tabs[2];
      const modifierTabBtn = tabs[3];
      const temperTabBtn = tabs[4];
      const transfigureTabBtn = tabs[5];
      const gemTabBtn = tabs[6];
      
      if (!editBody || !box) return;
  
      if (!box.dataset.value) {
        editTabBtn.disabled = true;
        aspectTabBtn.disabled = true;
        modifierTabBtn.disabled = true;
        temperTabBtn.disabled = true;
        transfigureTabBtn.disabled = true;
        gemTabBtn.disabled = true;
        return;
      } else {
        editTabBtn.disabled = false;
        aspectTabBtn.disabled = false;
        modifierTabBtn.disabled = false;
        temperTabBtn.disabled = false;
        transfigureTabBtn.disabled = false;
        gemTabBtn.disabled = false;
      }`;

code = code.replace(renderEditTabOld, renderEditTabNew);

// 2. Fix switchModalTab 'tempering' mapping
const switchModalTabOld = `} else if (tabName === 'temper') {`;
const switchModalTabNew = `} else if (tabName === 'temper' || tabName === 'tempering') {`;
code = code.replace(switchModalTabOld, switchModalTabNew);

fs.writeFileSync('app.js', code);
console.log('Fixed tabs!');
