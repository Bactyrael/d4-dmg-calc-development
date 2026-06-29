import json
import re

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print("Keys:", list(data.keys()))
if "paragonNodes" in data:
    nodes = data["paragonNodes"]
    samples = []
    for k in list(nodes.keys())[:10]:
        samples.append(nodes[k])
    print(json.dumps(samples, indent=2))
elif "formulas" in data:
    pass
