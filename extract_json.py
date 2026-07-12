import re
import json

filepath = "C:/Users/rcmil/.gemini/antigravity/brain/e9ba5248-40c8-430f-83af-373090de2b22/.system_generated/steps/15/output.txt"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the JSON array
match = re.search(r'\[\s*\{.*?\}\s*\]', content, re.DOTALL)
if match:
    json_data = match.group(0)
    # Validate JSON
    try:
        parsed = json.loads(json_data)
        print("Successfully parsed JSON with", len(parsed), "items")
        with open("assets/talisman_images.json", "w", encoding="utf-8") as out_f:
            json.dump(parsed, out_f, indent=2)
        
        # print first few
        for i in range(2):
            print(parsed[i])
            
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
else:
    print("Could not find JSON array in file")
