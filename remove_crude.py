import json
import re

with open('assets/database.js', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to find window.D4_DATABASE
# We know it's a large object. Instead of parsing the whole file,
# maybe we can just use regex to remove Crude gems if they are in the JSON.
# Wait, gems are in "gems": [ ... ]
# Let's extract the whole D4_DATABASE object by doing:
prefix = 'window.D4_DATABASE = '
if prefix in text:
    split_parts = text.split(prefix)
    db_json = split_parts[-1].strip()
    if db_json.endswith(';'):
        db_json = db_json[:-1]
    
    # Wait, the end of database.js has window.D4_DATABASE.runes appended!
    # So split_parts[-1] is NOT just a single JSON.
    pass
