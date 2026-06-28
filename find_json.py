import re

file_path = r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\14471\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for Gatsby page-data
matches = re.findall(r'href="(.*?page-data\.json)"', content)
print("page-data.json links:", matches[:5])

# Look for webpack chunks that might contain the data
chunks = re.findall(r'src="(.*?\.js)"', content)
print("js chunks:", chunks[:5])

# Look for any URL ending in .json
jsons = re.findall(r'(https?://[^\s\"\'<>]+?\.json)', content)
print("json URLs:", jsons[:5])
