import re
import json

file_path = r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\14471\content.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Gatsby often puts page data in a script tag id="gatsby-script-loader" or similar.
# Let's just find anything resembling JSON data for skills.
# Usually d4builds.gg has a massive JSON object with 'Necromancer' and skills.
matches = re.search(r'window\.pagePath=".*?";window\.___page-data=([^;]+);', content)
if matches:
    print("Found window.___page-data")
    try:
        data = json.loads(matches.group(1))
        # Save it to a file so we can inspect it easily
        with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\d4builds_data.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print("Data saved to d4builds_data.json")
    except Exception as e:
        print("Failed to parse JSON:", e)
else:
    # try another common pattern
    matches = re.search(r'<script id="gatsby-script-loader"[^>]*>/\*<!\[CDATA\[\*/window\.pagePath=".*?";window\.___page-data=(.*?);', content)
    if matches:
        print("Found gatsby script loader data")
    else:
        # Just search for a huge block of JSON
        matches = re.search(r'(\{[\s\S]*?"Necromancer"[\s\S]*?\})', content)
        if matches:
            print("Found some JSON block containing Necromancer, length:", len(matches.group(1)))
            with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\d4builds_raw.txt', 'w', encoding='utf-8') as out:
                out.write(matches.group(1)[:10000]) # write a snippet
        else:
            print("Could not find data payload.")
