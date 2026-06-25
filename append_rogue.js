const fs = require('fs');
fs.appendFileSync('style.css', '\n.paperdoll-container[data-class="Rogue"] {\n  background-image: url("assets/rogue_bg.jpg");\n  background-size: cover;\n  background-position: center top;\n  background-repeat: no-repeat;\n  box-shadow: inset 0 0 0 2000px rgba(0,0,0,0.65);\n  border-radius: 8px;\n}\n');
