import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

switch_tab_target = """  function switchModalTab(tabName) {
      const tabs = document.querySelectorAll('.item-modal-tab');
      const selectTab = tabs[0];
      const editTab = tabs[1];
      
      const selectBody = document.getElementById('item-modal-select-body');
      const editBody = document.getElementById('item-modal-edit-body');
      const aspectBody = document.getElementById('item-modal-aspect-body');
      const modifierBody = document.getElementById('item-modal-modifier-body');
      const temperBody = document.getElementById('item-modal-temper-body');
      const transfigureBody = document.getElementById('item-modal-transfigure-body');
      const gemBody = document.getElementById('item-modal-gem-body');
      
      // Reset all
      [selectTab, editTab].forEach(t => t?.classList.remove('active'));
      [selectBody, editBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });
  
      if (tabName === 'select') {
        selectTab?.classList.add('active');
        if (selectBody) selectBody.style.display = 'flex';
      } else if (tabName === 'edit') {
        editTab?.classList.add('active');
        if (editBody) editBody.style.display = 'flex';"""

switch_tab_replacement = """  function switchModalTab(tabName) {
      const tabs = document.querySelectorAll('.item-modal-tab');
      const selectTab = tabs[0];
      const editTab = tabs[1];
      const stashTab = tabs[2];
      
      const selectBody = document.getElementById('item-modal-select-body');
      const editBody = document.getElementById('item-modal-edit-body');
      const stashBody = document.getElementById('item-modal-stash-body');
      const aspectBody = document.getElementById('item-modal-aspect-body');
      const modifierBody = document.getElementById('item-modal-modifier-body');
      const temperBody = document.getElementById('item-modal-temper-body');
      const transfigureBody = document.getElementById('item-modal-transfigure-body');
      const gemBody = document.getElementById('item-modal-gem-body');
      
      // Reset all
      [selectTab, editTab, stashTab].forEach(t => t?.classList.remove('active'));
      [selectBody, editBody, stashBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });
  
      if (tabName === 'select') {
        selectTab?.classList.add('active');
        if (selectBody) selectBody.style.display = 'flex';
      } else if (tabName === 'edit') {
        editTab?.classList.add('active');
        if (editBody) editBody.style.display = 'flex';
      } else if (tabName === 'stash') {
        stashTab?.classList.add('active');
        if (stashBody) stashBody.style.display = 'flex';
        if (typeof renderStashTab === 'function') renderStashTab(currentModalSlot);"""

# The target might have different line endings or slightly different whitespace. Let's use regex.

# We will just replace the `switchModalTab` function entirely by regex
# It starts at "  function switchModalTab(tabName) {" and ends before "  function renderEditTab(slotName) {"

match = re.search(r"  function switchModalTab\(tabName\).*?  function renderEditTab\(slotName\)", content, re.DOTALL)
if match:
    old_switch = match.group(0)
    new_switch = """  function switchModalTab(tabName) {
      const tabs = document.querySelectorAll('.item-modal-tab');
      const selectTab = tabs[0];
      const editTab = tabs[1];
      const stashTab = tabs[2];
      
      const selectBody = document.getElementById('item-modal-select-body');
      const editBody = document.getElementById('item-modal-edit-body');
      const stashBody = document.getElementById('item-modal-stash-body');
      const aspectBody = document.getElementById('item-modal-aspect-body');
      const modifierBody = document.getElementById('item-modal-modifier-body');
      const temperBody = document.getElementById('item-modal-temper-body');
      const transfigureBody = document.getElementById('item-modal-transfigure-body');
      const gemBody = document.getElementById('item-modal-gem-body');
      
      // Reset all
      [selectTab, editTab, stashTab].forEach(t => t?.classList.remove('active'));
      [selectBody, editBody, stashBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });
  
      if (tabName === 'select') {
        selectTab?.classList.add('active');
        if (selectBody) selectBody.style.display = 'flex';
      } else if (tabName === 'edit') {
        editTab?.classList.add('active');
        if (editBody) editBody.style.display = 'flex';
      } else if (tabName === 'stash') {
        stashTab?.classList.add('active');
        if (stashBody) stashBody.style.display = 'flex';
        if (typeof renderStashTab === 'function') renderStashTab(currentModalSlot);
      } else if (tabName === 'aspect') {
        if (aspectBody) aspectBody.style.display = 'flex';
      } else if (tabName === 'modifiers') {
        if (modifierBody) modifierBody.style.display = 'flex';
      } else if (tabName === 'temper' || tabName === 'tempering') {
        if (temperBody) temperBody.style.display = 'flex';
      } else if (tabName === 'transfigure') {
        if (transfigureBody) transfigureBody.style.display = 'flex';
      } else if (tabName === 'gem') {
        if (gemBody) gemBody.style.display = 'flex';
      }
    }
  
  function renderEditTab(slotName"""
    
    content = content.replace(old_switch, new_switch)
    
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed switchModalTab")
else:
    print("Could not find switchModalTab")
