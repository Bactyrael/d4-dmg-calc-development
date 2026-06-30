const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.node-in-radius')) {
    css += `\n
/* Paragon Glyph Radius Highlights */
.node-in-radius {
  position: relative;
}
.node-in-radius::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(231, 76, 60, 0.25);
  border: 1px solid rgba(231, 76, 60, 0.7);
  pointer-events: none;
  z-index: 10;
}
`;
    fs.writeFileSync('style.css', css);
}

// 2. Update paragon_logic.js
let logic = fs.readFileSync('paragon_logic.js', 'utf8');

const targetStr = `                  if (isActive) {`;
const insertStr = `                  // Check radius
                  let inRadius = false;
                  for (let g of glyphsActive) {
                      if (g.slotId === s) {
                          let dX = dataIdx % 21;
                          let dY = Math.floor(dataIdx / 21);
                          let dist = Math.abs(dX - g.x) + Math.abs(dY - g.y);
                          if (dist <= g.radius) {
                              inRadius = true;
                              break;
                          }
                      }
                  }
                  if (inRadius) {
                      cell.classList.add('node-in-radius');
                  }

                  if (isActive) {`;

if (!logic.includes('inRadius = true')) {
    logic = logic.replace(targetStr, insertStr);
    fs.writeFileSync('paragon_logic.js', logic);
}
