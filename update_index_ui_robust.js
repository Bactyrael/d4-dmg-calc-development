const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Inject the navigation button
const navRegex = /(<button class="calc-nav-btn active" data-target="calc-pane-skills".*?<\/button>)\s*(<button class="calc-nav-btn" data-target="calc-pane-monster")/s;

if (navRegex.test(html)) {
    html = html.replace(navRegex, `$1\n              <button class="calc-nav-btn" data-target="calc-pane-conditions" style="width: 100%; text-align: left; padding: 12px 20px; background: transparent; border: none; border-left: 3px solid transparent; color: #aaa; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Conditions</button>\n              $2`);
    console.log("Nav button injected!");
} else {
    console.log("Failed to inject nav button.");
}

// Inject the content pane
const paneRegex = /(<div id="calc-pane-skills".*?<\/div>\s*<\/div>)\s*(<!-- Monster Sub-tab -->)/s;

if (paneRegex.test(html)) {
    html = html.replace(paneRegex, `$1\n              <!-- Conditions Sub-tab -->
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
              </div>\n              $2`);
    console.log("Content pane injected!");
} else {
    console.log("Failed to inject content pane.");
}

fs.writeFileSync('index.html', html);
