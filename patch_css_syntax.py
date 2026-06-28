import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace any occurrence of a standalone class selector that is followed immediately by a comment or another selector, 
# which indicates a dangling selector left by previous bad regexes.
# Examples of bad lines we saw:
# .paperdoll-slot.pd-mod \n .paperdoll-slot.pd-mod {
# .pd-dia \n .pd-dia .paperdoll-rank
# .pd-cir \n .pd-cir .paperdoll-rank
# .paperdoll-slot \n /* Base square
# .pd-dia \n /* Circle
# .pd-cir \n /* Ensure rank

lines = css.split('\n')
cleaned_lines = []

for line in lines:
    # If the line is exactly just a selector with no braces and no comma, it's garbage left over.
    s = line.strip()
    if s.startswith('.') and not s.endswith(',') and not s.endswith('{') and not '{' in s and not '}' in s:
        # Dangling selector, skip it!
        continue
    if s == r'\n':
        continue
    cleaned_lines.append(line)

final_css = '\n'.join(cleaned_lines)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(final_css)

print("CSS syntax errors cleaned.")
