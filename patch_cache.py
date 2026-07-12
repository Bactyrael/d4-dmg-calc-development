import time
import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

new_v = str(int(time.time() * 1000))
content = re.sub(r'\?v=\d+', f'?v={new_v}', content)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
print(f"Updated cache busters to {new_v}")
