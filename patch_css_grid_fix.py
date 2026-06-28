import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove old pd-mod-* rules
css = re.sub(r'\.pd-mod-\d[^{]*\{[^}]+\}', '', css)
# Remove old pd-base grid coordinates
css = re.sub(r'\.pd-base\s*\{[^}]+\}', '', css)

# Add correct spacing
grid_rules = """
/* Modifier Layout */
.pd-base {
  grid-column: 1;
  grid-row: 1;
  width: 52px;
  height: 52px;
  border-radius: 4px;
  border-color: #833;
  z-index: 2;
  overflow: hidden;
}

.pd-mod-0 { grid-column: 3; grid-row: 1; z-index: 2; margin-top: 10px; }
.pd-mod-1 { grid-column: 4; grid-row: 1; z-index: 2; margin-top: 10px; }
.pd-mod-2 { grid-column: 5; grid-row: 1; z-index: 2; margin-top: 10px; }

.pd-mod-3 { grid-column: 3; grid-row: 3; z-index: 2; margin-top: 4px; }
.pd-mod-4 { grid-column: 4; grid-row: 3; z-index: 2; margin-top: 4px; }

.pd-mod-5 { grid-column: 3; grid-row: 4; z-index: 2; margin-top: 8px; }
.pd-mod-6 { grid-column: 4; grid-row: 4; z-index: 2; margin-top: 8px; }
"""

css += grid_rules

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS pd-mod rules fixed with proper column/row spacing.")
