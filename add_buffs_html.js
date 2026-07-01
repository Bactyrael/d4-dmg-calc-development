const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Add Buffs Navigation Button
const navRegex = /(<button class="calc-nav-btn" data-target="calc-pane-monster"[^>]*>Monster<\/button>)/;
const navReplacement = `$1
              <button class="calc-nav-btn" data-target="calc-pane-buffs" style="width: 100%; text-align: left; padding: 12px 20px; background: transparent; border: none; border-left: 3px solid transparent; color: #aaa; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Buffs</button>`;
index = index.replace(navRegex, navReplacement);

// 2. Add Buffs Pane Content
// I need to insert it right before `<div id="calc-pane-monster"` but if it doesn't exist I'll insert after `calc-pane-conditions`. Let's search for Monster pane.
const paneRegex = /(<!-- Monster Sub-tab -->)/;
const paneReplacement = `<!-- Buffs Sub-tab -->
              <div id="calc-pane-buffs" class="calc-pane-content" style="display: none;">
                <div class="d4-panel" style="background: rgba(20,20,25,0.9); border: 1px solid #334; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                   <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                     <span class="icon" style="color: #c9a55c;">&#x2728;</span> Active Buffs
                   </h2>
                   <p style="color: #aaa; font-style: italic; margin-bottom: 20px;">Toggle and configure buffs to apply global modifiers to your character.</p>
                   
                   <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;" id="buffs-grid">
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="buff-weakened" class="d4-checkbox calc-buff"> Weakened (Enemy DR)
                     </label>
                     <label style="display: flex; flex-direction: column; gap: 5px; color: #ddd;">
                       <span>Ferocity Stacks (0-8)</span>
                       <input type="number" id="buff-ferocity" class="calc-buff" min="0" max="8" value="0" style="background: rgba(0,0,0,0.5); border: 1px solid #445; color: #fff; padding: 5px; border-radius: 4px; width: 60px;">
                     </label>
                     <label style="display: flex; flex-direction: column; gap: 5px; color: #ddd;">
                       <span>Overpower Stacks (0-8)</span>
                       <input type="number" id="buff-overpower" class="calc-buff" min="0" max="8" value="0" style="background: rgba(0,0,0,0.5); border: 1px solid #445; color: #fff; padding: 5px; border-radius: 4px; width: 60px;">
                     </label>
                     <label style="display: flex; flex-direction: column; gap: 5px; color: #ddd;">
                       <span>Resolve Stacks (0-30)</span>
                       <input type="number" id="buff-resolve" class="calc-buff" min="0" max="30" value="0" style="background: rgba(0,0,0,0.5); border: 1px solid #445; color: #fff; padding: 5px; border-radius: 4px; width: 60px;">
                     </label>
                   </div>
                </div>
              </div>
              
              $1`;
index = index.replace(paneRegex, paneReplacement);

fs.writeFileSync('index.html', index);
console.log("Added buffs pane to index.html");
