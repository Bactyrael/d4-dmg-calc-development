with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

target = """                <div class="equipment-slot-box" data-slot="Two-Handed Weapon">
                  <div class="equipment-slot-label">Two-Handed Weapon</div>
                  <div class="equipment-slot-value empty">Empty</div>
                </div>
              </div>
            </div>
            
            <div id="tab-paragon" class="tab-content" style="display:none;">"""

replacement = """                <div class="equipment-slot-box" data-slot="Two-Handed Weapon">
                  <div class="equipment-slot-label">Two-Handed Weapon</div>
                  <div class="equipment-slot-value empty">Empty</div>
                </div>
                
                <!-- Hidden Seal Slot for Modifiers -->
                <div class="equipment-slot-box" data-slot="Seal" style="display: none;">
                  <div class="equipment-slot-label">Seal</div>
                  <div class="equipment-slot-value empty">Empty</div>
                </div>
              </div>
            </div>
            
            <div id="tab-paragon" class="tab-content" style="display:none;">"""

if target in content:
    content = content.replace(target, replacement)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Added hidden Seal slot to index.html.")
else:
    print("Target not found in index.html.")
