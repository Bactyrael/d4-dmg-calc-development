import json

with open("assets/paragon.js", "r", encoding="utf-8") as f:
    js = f.read()

start = js.find('"paragonBoards": {')
end = js.find('}, "paragonNodes"', start)
boards_json = js[start+17:end+1]
try:
    boards = json.loads("{" + boards_json + "}")
    b = list(boards.keys())[0]
    board = boards[b]
    print(f"Board {b} node count:", len(board.get("nodes", [])))
    print("First 10 nodes:", board.get("nodes", [])[:10])
except Exception as e:
    print(e)
