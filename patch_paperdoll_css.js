const fs = require('fs');

const css = `
/* Paperdoll Layout */
.skill-paperdoll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  position: relative;
}

.skill-paperdoll-title {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skill-paperdoll {
  display: grid;
  grid-template-columns: repeat(5, 44px);
  grid-template-rows: repeat(4, 44px);
  gap: 15px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.paperdoll-slot {
  width: 44px;
  height: 44px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  border: 1px solid #444;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}

.paperdoll-slot:hover {
  border-color: #888;
  transform: scale(1.1);
  z-index: 3;
}

.paperdoll-slot.active {
  border-color: #d33;
  box-shadow: 0 0 12px rgba(200, 50, 50, 0.6);
}

.paperdoll-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.paperdoll-base {
  grid-column: 3;
  grid-row: 4;
  width: 52px;
  height: 52px;
  border-radius: 4px;
  border-width: 2px;
}

.paperdoll-mod {
  transform: rotate(45deg);
}

.paperdoll-mod img {
  transform: rotate(-45deg) scale(1.25); /* Scale up slightly to fill the diamond */
}

/* Modifiers layout */
.paperdoll-mod-0 { grid-column: 2; grid-row: 1; }
.paperdoll-mod-1 { grid-column: 3; grid-row: 1; }
.paperdoll-mod-2 { grid-column: 4; grid-row: 1; }
.paperdoll-mod-3 { grid-column: 1; grid-row: 2; }
.paperdoll-mod-4 { grid-column: 5; grid-row: 2; }
.paperdoll-mod-5 { grid-column: 2; grid-row: 3; }
.paperdoll-mod-6 { grid-column: 4; grid-row: 3; }

.paperdoll-rank {
  position: absolute;
  background: #000;
  border: 1px solid #555;
  color: #fff;
  font-size: 11px;
  padding: 1px 4px;
  border-radius: 4px;
  font-weight: bold;
  pointer-events: none;
  z-index: 10;
}

/* Bottom right for base */
.paperdoll-base .paperdoll-rank {
  bottom: -4px;
  right: -4px;
}

/* Bottom right (visually) for diamonds */
.paperdoll-mod .paperdoll-rank {
  transform: rotate(-45deg);
  bottom: -10px;
  right: -10px;
}

/* CSS Drawn Lines connecting Base to Row 3, Row 3 to Row 2, etc. */
.paperdoll-lines {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 1;
}

/* Just simple straight red lines behind the grid! */
`;

fs.appendFileSync('style.css', css, 'utf8');
console.log("Added paperdoll CSS.");
