import time
import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Add meta referrer
if '<meta name="referrer" content="no-referrer">' not in content:
    content = content.replace('<head>', '<head>\n  <meta name="referrer" content="no-referrer">')

new_v = str(int(time.time() * 1000))
content = re.sub(r'\?v=\d+', f'?v={new_v}', content)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
print(f"Added meta referrer and updated cache to {new_v}")
