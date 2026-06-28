import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace the incorrect wide spacing with the compact layout mapping
new_grid = """
/* Modifier Layout */
.pd-base {
  grid-column: 1;
  grid-row: 1 / span 2;
  width: 52px;
  height: 52px;
  border-radius: 4px;
  border-color: #833;
  z-index: 2;
  overflow: hidden;
  align-self: center;
}

.pd-mod-0 { grid-column: 2; grid-row: 1; z-index: 2; }
.pd-mod-1 { grid-column: 3; grid-row: 1; z-index: 2; }
.pd-mod-2 { grid-column: 4; grid-row: 1; z-index: 2; }

.pd-mod-3 { grid-column: 2; grid-row: 2; z-index: 2; margin-top: 4px; }
.pd-mod-4 { grid-column: 3; grid-row: 2; z-index: 2; margin-top: 4px; }

.pd-mod-5 { grid-column: 2; grid-row: 3; z-index: 2; margin-top: 8px; }
.pd-mod-6 { grid-column: 3; grid-row: 3; z-index: 2; margin-top: 8px; }
"""

css = re.sub(r'/\*\s*Modifier Layout\s*\*/[\s\S]*?(?=(/\*|$))', new_grid, css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS pd-mod rules fixed for compact grid.")
