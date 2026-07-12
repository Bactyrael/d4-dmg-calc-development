import re
with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'(<div class="paperdoll-center">)')
match = pattern.search(content)
if match:
    replacement = """<div class="paperdoll-center">
                <!-- Hidden Seal Slot for Modifiers -->
                <div class="equipment-slot-box" data-slot="Seal" style="display: none;"></div>"""
    content = content[:match.start()] + replacement + content[match.end():]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected hidden Seal slot.")
else:
    print("Regex match failed.")
