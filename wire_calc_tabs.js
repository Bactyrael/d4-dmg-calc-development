const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const injection = `
      // Calculation Sub-tabs logic
      document.querySelectorAll('.calc-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.calc-nav-btn').forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.borderLeftColor = 'transparent';
            b.style.color = '#aaa';
          });
          const target = e.target;
          target.classList.add('active');
          target.style.background = 'rgba(255,255,255,0.05)';
          target.style.borderLeftColor = '#c9a55c';
          target.style.color = '#fff';

          document.querySelectorAll('.calc-pane-content').forEach(pane => pane.style.display = 'none');
          const targetId = target.getAttribute('data-target');
          if (targetId) {
            document.getElementById(targetId).style.display = 'block';
          }
        });
      });
`;

const initEnd = app.indexOf('// Global click listener to close context menu');
if (initEnd > -1) {
    app = app.substring(0, initEnd) + injection + app.substring(initEnd);
    fs.writeFileSync('app.js', app);
    console.log('Injected sub-tab logic!');
} else {
    console.log('Could not find injection point');
}
