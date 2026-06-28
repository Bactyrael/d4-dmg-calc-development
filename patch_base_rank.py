import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Append specific positioning for pd-base rank
new_css = """
.pd-base .paperdoll-rank {
  top: -4px;
  left: -22px;
}
"""

css += new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Base rank position added.")
