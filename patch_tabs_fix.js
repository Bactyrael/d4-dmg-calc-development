const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const newCode = `
// Tab Persistence
document.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTabId');
    if (savedTab) {
        const tabToClick = document.querySelector(\`.tab-btn[data-target="\${savedTab}"]\`);
        if (tabToClick) {
            tabToClick.click();
        }
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            if (target) {
                localStorage.setItem('activeTabId', target);
            }
        });
    });
});
`;

appJs = appJs.replace(/\/\/ Tab Persistence[\s\S]*?\}\);\s*\}\);/m, newCode.trim());

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Fixed tab persistence");
