import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# First, remove ALL .pd-mod-* rules
css = re.sub(r'\.pd-mod-\d[^{]*\{[^}]+\}', '', css)

# Now, add exactly the rules we want for the grid layout
grid_rules = """
/* Modifier Layout */
.pd-mod-0 { grid-column: 2; grid-row: 1; z-index: 2; }
.pd-mod-1 { grid-column: 3; grid-row: 1; z-index: 2; }
.pd-mod-2 { grid-column: 4; grid-row: 1; z-index: 2; }
.pd-mod-3 { grid-column: 2; grid-row: 2; z-index: 2; }
.pd-mod-4 { grid-column: 3; grid-row: 2; z-index: 2; }
.pd-mod-5 { grid-column: 2; grid-row: 3; z-index: 2; }
.pd-mod-6 { grid-column: 3; grid-row: 3; z-index: 2; }
"""

css += grid_rules

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS pd-mod rules cleaned up.")
