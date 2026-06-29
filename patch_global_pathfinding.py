import re

with open('paragon_logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will just write a small script to fix the syntax error directly since the rest of the script executed properly.
fix_search = "                    opt.textContent = Board : ;"
fix_replace = "                    opt.textContent = `Board ${i+1}: ${bName}`;"

if fix_search in js:
    js = js.replace(fix_search, fix_replace)

with open('paragon_logic.js', 'w', encoding='utf-8') as f:
    f.write(js)
