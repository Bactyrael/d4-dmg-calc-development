const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const imageConstraints = `
/* Paperdoll Image Constraints */
.paperdoll-slot img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none; /* Let clicks pass through to the slot */
  z-index: 1;
}

/* Base square constraint */
.pd-base {
  overflow: hidden;
}

/* Diamond image counter-rotation */
.pd-dia {
  overflow: hidden;
}
.pd-dia img {
  transform: rotate(-45deg) scale(1.42);
}

/* Circle image constraint */
.pd-cir {
  overflow: hidden;
  border-radius: 50%;
}
.pd-cir img {
  border-radius: 50%;
}

/* Ensure rank displays above images */
.paperdoll-rank {
  z-index: 2;
}
`;

if (!css.includes('/* Paperdoll Image Constraints */')) {
    fs.appendFileSync('style.css', '\\n' + imageConstraints, 'utf8');
    console.log("Added paperdoll image constraints to CSS");
} else {
    console.log("CSS already contains constraints");
}
