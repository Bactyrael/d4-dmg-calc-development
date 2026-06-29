import re

with open("assets/paragon.js", "r", encoding="utf-8") as f:
    js = f.read()

cult_leader_idx = js.find('"Necromancer_CultLeader":')
if cult_leader_idx != -1:
    nodes_str = js[cult_leader_idx:cult_leader_idx+20000]
    nodes_match = re.search(r'"nodes":\s*\[(.*?)\]', nodes_str, re.DOTALL)
    if nodes_match:
        nodes = nodes_match.group(1).split(',')
        nodes = [n.strip().strip('"') for n in nodes]
        print("Index 10:", nodes[10] if len(nodes) > 10 else "N/A")
        print("Index 210:", nodes[210] if len(nodes) > 210 else "N/A")
        print("Index 230:", nodes[230] if len(nodes) > 230 else "N/A")
        print("Index 430:", nodes[430] if len(nodes) > 430 else "N/A")
