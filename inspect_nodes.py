import re
import json

with open("assets/paragon.js", "r", encoding="utf-8") as f:
    js = f.read()

# Extract just a few nodes from D4_PARAGON_DATA.paragonNodes
start = js.find('"paragonNodes": {')
if start != -1:
    end = js.find('}}', start)
    nodes_json = js[start+16:end+1]
    # parse the json to get some samples
    try:
        nodes = json.loads("{" + nodes_json + "}")
        samples = []
        for key in list(nodes.keys())[:20]:
            if "attributes" in nodes[key] and nodes[key]["attributes"]:
                samples.append(nodes[key])
        print(json.dumps(samples[:3], indent=2))
    except Exception as e:
        print("Parse error:", e)
