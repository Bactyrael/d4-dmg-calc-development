const fs = require('fs');

// We can just execute a tiny bit of JS to load the window object since paragon.js relies on it
const code = "var window = {};\n" + fs.readFileSync("assets/paragon.js", "utf8") + "\nconsole.log(Object.keys(window.D4_PARAGON_DATA.paragonBoards)[0]);\nlet b = window.D4_PARAGON_DATA.paragonBoards[Object.keys(window.D4_PARAGON_DATA.paragonBoards)[0]];\nconsole.log('nodes length:', b.nodes.length);\nconsole.log(b.nodes.slice(0,10));";
fs.writeFileSync("temp_run.js", code);
