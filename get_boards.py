import json
with open("assets/paragon.js", "r", encoding="utf-8") as f:
    text = f.read()
    # Find window.D4_PARAGON_DATA = {
    start = text.find("{")
    data_str = text[start:]
    # This is a bit fragile if there are trailing statements, but let's try
    try:
        data = json.loads(data_str.strip().rstrip(';'))
        for bid, bd in data.get("paragonBoards", {}).items():
            if "start" in bd.get("name", "").lower() or "base" in bd.get("name", "").lower():
                print(bid, bd.get("name"))
    except Exception as e:
        import re
        boards = re.findall(r'"(ParagonBoard_[^"]+)":\s*\{[^}]*"name":\s*"([^"]+)"', text)
        for b in boards:
            if "start" in b[1].lower() or "base" in b[1].lower():
                print(b[0], b[1])
