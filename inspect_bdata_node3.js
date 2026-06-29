const fs = require('fs');

const code = "var window = {};\n" + fs.readFileSync("assets/paragon.js", "utf8") + "\nlet p = window.D4_PARAGON_DATA.paragonNodes;\nconsole.log(p['Generic_Normal_Str']);\nconsole.log(p['Generic_Normal_Dex']);\nconsole.log(p['Generic_Gate']);";
fs.writeFileSync("temp_run.js", code);
