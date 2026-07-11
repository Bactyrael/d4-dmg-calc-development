import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target1 = """function showAspectTooltip(aspectName, e) {
    if (!window.tooltipEl) {
        window.tooltipEl = document.createElement('div');
        window.tooltipEl.id = 'skill-tooltip';
        window.tooltipEl.className = 'd4-tooltip';
        document.body.appendChild(window.tooltipEl);
    }
    
    let aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === aspectName);
    if (!aspectObj) return;

    let tooltipHtml = `
      <div style="font-family: var(--font-display); width: 280px;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 5px;">
            <div style="width: 40px; height: 40px; background: url('assets/images/legendary_aspect_icon.png') no-repeat center/contain; margin-bottom: 5px; opacity: 0.8;"></div>
            <div style="font-size: 1.1rem; color: #fff; margin-bottom: 2px; font-weight: bold; letter-spacing: 1px; text-align: center;">
                ${aspectObj.name}
            </div>
            <div style="color: #d1b87a; font-size: 0.8rem; margin-bottom: 2px;">
                Legendary Aspect
            </div>
        </div>
        <div style="border-bottom: 1px solid #444; margin: 8px 0; width: 100%;"></div>
        <div style="color: #ccc; font-size: 0.9rem; margin-bottom: 5px; line-height: 1.4; font-family: var(--font-body);">
            <span style="color: #e4c466;">?</span> ${aspectObj.desc}
        </div>
      </div>
    `;

    window.tooltipEl.innerHTML = tooltipHtml;
    window.tooltipEl.style.display = 'block';
    
    // Position tooltip
    moveItemTooltip(e);
}"""

replacement1 = """function showAspectTooltip(aspectName, e) {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'skill-tooltip';
        tooltipEl.className = 'd4-tooltip';
        document.body.appendChild(tooltipEl);
    }
    
    let aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === aspectName);
    if (!aspectObj) return;

    let tooltipHtml = `
      <div style="font-family: var(--font-display); width: 280px;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 5px;">
            <div style="width: 40px; height: 40px; background: url('assets/images/legendary_aspect_icon.png') no-repeat center/contain; margin-bottom: 5px; opacity: 0.8;"></div>
            <div style="font-size: 1.1rem; color: #fff; margin-bottom: 2px; font-weight: bold; letter-spacing: 1px; text-align: center;">
                ${aspectObj.name}
            </div>
            <div style="color: #d1b87a; font-size: 0.8rem; margin-bottom: 2px;">
                Legendary Aspect
            </div>
        </div>
        <div style="border-bottom: 1px solid #444; margin: 8px 0; width: 100%;"></div>
        <div style="color: #ccc; font-size: 0.9rem; margin-bottom: 5px; line-height: 1.4; font-family: var(--font-body);">
            <span style="color: #e4c466;">?</span> ${aspectObj.desc}
        </div>
      </div>
    `;

    tooltipEl.innerHTML = tooltipHtml;
    tooltipEl.classList.add('visible');
    
    // Position tooltip
    moveItemTooltip(e);
}"""
content = content.replace(target1, replacement1)

target2 = """      row.addEventListener('mouseleave', () => { if(window.tooltipEl) window.tooltipEl.style.display = 'none'; });"""
replacement2 = """      row.addEventListener('mouseleave', (e) => { if(typeof hideItemTooltip === 'function') hideItemTooltip(e); });"""
content = content.replace(target2, replacement2)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Tooltip fix applied")
