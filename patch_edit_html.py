import re
with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Hide Transfigure
transfig_pattern = r'<div class="edit-section">\s*<div class="edit-section-title">Transfigure</div>'
transfig_repl = r'<div class="edit-section" style="${slotName === \'Seal\' ? \'display:none;\' : \'\'}">\n          <div class="edit-section-title">Transfigure</div>'
content = re.sub(transfig_pattern, transfig_repl, content)

# 2. Hide Tempering
temper_pattern = r'<div class="edit-section">\s*<div class="edit-section-title">Tempering</div>'
temper_repl = r'<div class="edit-section" style="${slotName === \'Seal\' ? \'display:none;\' : \'\'}">\n          <div class="edit-section-title">Tempering</div>'
content = re.sub(temper_pattern, temper_repl, content)

# 3. Hide 4th affix row
affix4_pattern = r'\$\{renderAffixRow\(3, \'affix\'\)\}'
affix4_repl = r'${slotName === \'Seal\' ? \'\' : renderAffixRow(3, \'affix\')}'
content = re.sub(affix4_pattern, affix4_repl, content)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Patched HTML blocks.")
