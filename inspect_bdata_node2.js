const fs = require('fs');

const code = "var window = {};\n" + fs.readFileSync("assets/paragon.js", "utf8") + "\nlet b = window.D4_PARAGON_DATA.paragonBoards[Object.keys(window.D4_PARAGON_DATA.paragonBoards)[0]];\nconsole.log(b.nodes.filter(n => n !== null).slice(0, 10));";
fs.writeFileSync("temp_run.js", code);
