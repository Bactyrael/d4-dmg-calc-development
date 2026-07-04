const fs = require('fs');
let app = fs.readFileSync('assets/database.js', 'utf8').replace(/\r\n/g, '\n');

const target = `    {
      "name": "Tidal Aspect",
      "desc": "Blood Wave fires two additional waves, each dealing [40 - 25]% less damage than the previous.",
      "category": "FILTER_Legendary_Offensive",`;
      
// Note: Since I didn't see the exact desc in my view_file (wait, I saw "Your Maximum Overpower is increased by [2 - 4] while you are Fortified"??)
// Let me just replace the specific line in the exact object.
// I'll parse JSON, modify, and stringify. But database.js starts with `window.D4_DATABASE = {`
// Let's use Regex to find it and replace it.

app = app.replace(
  /"name":\s*"Tidal Aspect",\s*\n\s*"desc":\s*"([^"]+)",\s*\n\s*"category":\s*"FILTER_Legendary_Offensive"/,
  '"name": "Tidal Aspect",\n      "desc": "$1",\n      "category": "FILTER_Legendary_Utility"'
);

fs.writeFileSync('assets/database.js', app);
console.log('Patched Tidal Aspect to Utility');
