import json
import re

with open("assets/paragon.js", "r", encoding="utf-8") as f:
    js = f.read()

start = js.find('"paragonNodes": {')
if start != -1:
    end = js.find('}}', start)
    nodes_json = js[start+16:end+1]
    
    # regex extract all "formula": "..." strings
    formulas = re.findall(r'"formula":\s*"([^"]+)"', nodes_json)
    unique_formulas = sorted(list(set(formulas)))
    print("Found", len(unique_formulas), "unique formulas.")
    print(unique_formulas[:10])
