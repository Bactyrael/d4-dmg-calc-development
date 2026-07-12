with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

target = """                <div class="charm-wheel-container">"""

replacement = """                <!-- Hidden Seal Slot for Modifiers -->
                <div class="equipment-slot-box" data-slot="Seal" style="display: none;"></div>
                <div class="charm-wheel-container">"""

if target in content:
    content = content.replace(target, replacement)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Added hidden Seal slot to index.html center.")
else:
    print("Target not found.")
