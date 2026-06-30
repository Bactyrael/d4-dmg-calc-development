const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const navTarget = `<button class="calc-nav-btn active" data-target="calc-pane-skills" style="width: 100%; text-align: left; padding: 12px 20px; background: rgba(255,255,255,0.05); border: none; border-left: 3px solid #c9a55c; color: #fff; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Skills</button>
              <button class="calc-nav-btn" data-target="calc-pane-monster"`;

const navReplacement = `<button class="calc-nav-btn active" data-target="calc-pane-skills" style="width: 100%; text-align: left; padding: 12px 20px; background: rgba(255,255,255,0.05); border: none; border-left: 3px solid #c9a55c; color: #fff; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Skills</button>
              <button class="calc-nav-btn" data-target="calc-pane-conditions" style="width: 100%; text-align: left; padding: 12px 20px; background: transparent; border: none; border-left: 3px solid transparent; color: #aaa; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Conditions</button>
              <button class="calc-nav-btn" data-target="calc-pane-monster"`;

if (html.includes(navTarget)) {
    html = html.replace(navTarget, navReplacement);
}

const contentTarget = `              </div>
              
              <!-- Monster Sub-tab -->`;

const contentReplacement = `              </div>
              
              <!-- Conditions Sub-tab -->
              <div id="calc-pane-conditions" class="calc-pane-content" style="display: none;">
                <div class="d4-panel" style="background: rgba(20,20,25,0.9); border: 1px solid #334; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                   <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                     <span class="icon" style="color: #c9a55c;">🎯</span> Combat Conditions
                   </h2>
                   <p style="color: #aaa; font-style: italic; margin-bottom: 20px;">Toggle these conditions to activate conditional additive and multiplicative damage bonuses.</p>
                   
                   <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;" id="conditions-grid">
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-vulnerable" class="d4-checkbox calc-condition" checked> Enemy is Vulnerable
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-close" class="d4-checkbox calc-condition" checked> Enemy is Close
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-distant" class="d4-checkbox calc-condition"> Enemy is Distant
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-healthy" class="d4-checkbox calc-condition"> Enemy is Healthy
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-injured" class="d4-checkbox calc-condition"> Enemy is Injured
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-cc" class="d4-checkbox calc-condition"> Enemy is Crowd Controlled
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="checkbox" id="cond-overpower" class="d4-checkbox calc-condition"> Attack Overpowers
                     </label>
                   </div>
                </div>
              </div>
              
              <!-- Monster Sub-tab -->`;

if (html.includes(contentTarget)) {
    html = html.replace(contentTarget, contentReplacement);
}

fs.writeFileSync('index.html', html);
console.log('Updated index.html');
