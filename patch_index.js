const fs = require('fs');
let app = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

app = app.replace(
  /<input type="number" id="buff-overpower" class="calc-buff" min="0" max="8"/,
  '<input type="number" id="buff-overpower" class="calc-buff" min="0" max="14"'
);

fs.writeFileSync('index.html', app);
console.log('Patched index.html Overpower stack max');
