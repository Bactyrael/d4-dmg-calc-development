const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const tabPersistenceCode = `
// Tab Persistence
document.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTabId');
    if (savedTab) {
        const tabToClick = document.getElementById(savedTab);
        if (tabToClick) {
            tabToClick.click();
        }
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.id) {
                localStorage.setItem('activeTabId', e.target.id);
            }
        });
    });
});
`;

if (!appJs.includes('// Tab Persistence')) {
    appJs += '\n' + tabPersistenceCode;
    fs.writeFileSync('app.js', appJs, 'utf8');
    console.log("Added tab persistence");
} else {
    console.log("Tab persistence already exists");
}
