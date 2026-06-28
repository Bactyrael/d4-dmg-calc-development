import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove all bad img rules
css = re.sub(r'img\s*\{[^}]+\}', '', css)
css = re.sub(r'\.pd-dia\s*img\s*\{[^}]+\}', '', css)
css = re.sub(r'\.pd-cir\s*img\s*\{[^}]+\}', '', css)
css = re.sub(r'\.paperdoll-slot\s*img\s*\{[^}]+\}', '', css)

# Append clean rules
clean_css = """
/* Paperdoll Image Constraints */
.paperdoll-slot img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  pointer-events: none;
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
  width: 142%;
  height: 142%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* Circle image constraint */
.pd-cir {
  overflow: hidden;
  border-radius: 50%;
}
.pd-cir img {
  border-radius: 50%;
  width: 110%;
  height: 110%;
}
"""

css += clean_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS img rules cleaned and updated.")
