import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update currentBuild
content = content.replace(
"""let currentBuild = {
    class: 'Barbarian',
    level: 100,""",
"""let currentBuild = {
    class: 'Barbarian',
    level: 100,
    talisman: { seal: null, charms: [null, null, null, null, null, null] },""")

# 2. Update createDefaultBuild
content = content.replace(
"""function createDefaultBuild(className) {
    return {
        class: className,
        level: 100,""",
"""function createDefaultBuild(className) {
    return {
        class: className,
        level: 100,
        talisman: { seal: null, charms: [null, null, null, null, null, null] },""")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Added talisman object to currentBuild")
