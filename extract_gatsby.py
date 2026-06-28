import json
import os

file_path = r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\14502\content.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The read_url_content tool formats it as markdown. Let's find the first { and last }
start = content.find('{')
end = content.rfind('}')
if start != -1 and end != -1:
    json_str = content[start:end+1]
    try:
        data = json.loads(json_str)
        # Often Gatsby data is in data.result.data or data.result.pageContext
        with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\d4builds_page_data.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print("Successfully extracted page-data.json to d4builds_page_data.json")
    except Exception as e:
        print("JSON decode error:", e)
else:
    print("Could not find JSON structure in content.")
