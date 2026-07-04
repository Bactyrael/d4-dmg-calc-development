const fs = require('fs');
let app = fs.readFileSync('assets/database.js', 'utf8').replace(/\r\n/g, '\n');

app = app.replace(
  /"desc":\s*"Your Maximum Overpower is increased by \[2 - 4\] while you are Fortified.",\n\s*"category":\s*"FILTER_Legendary_Utility",\n\s*"classes":\s*\[\n\s*0,\n\s*1,\n\s*1,\n\s*1,\n\s*1,\n\s*0,\n\s*1,\n\s*1\n\s*\],\n\s*"maxValue":\s*"4"/,
  `"desc": "Your Maximum Overpower is increased by [1 - 3] while you are Fortified.",
      "category": "FILTER_Legendary_Utility",
      "classes": [
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1
      ],
      "maxValue": "3"`
);

fs.writeFileSync('assets/database.js', app);
console.log('Patched Tidal Aspect values');
