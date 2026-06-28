const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const shapeCSS = `
/* CSS Shapes for the compact grid */
.paperdoll-slot {
  background: #1a1a24;
  border: 1px solid #555;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
}
.paperdoll-slot:hover {
  background: #2a2a35;
  border-color: #888;
}
.paperdoll-slot.active {
  background: #3a2a2a;
  border-color: #a33;
  box-shadow: inset 0 0 15px rgba(200, 50, 50, 0.4), 0 0 8px rgba(200, 50, 50, 0.6);
}
.pd-base {
  border-width: 2px;
}
.pd-dia {
  border: 1px solid #555;
}
.pd-cir {
  border: 1px solid #555;
}
`;

fs.appendFileSync('style.css', shapeCSS, 'utf8');
console.log("Updated shape CSS");
