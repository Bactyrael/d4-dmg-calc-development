import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

search = """            <!-- Top Controls -->
            <div class="paragon-top-controls" style="display: flex; gap: 10px; margin-bottom: 20px;">
              <div class="paragon-board-slot active" data-slot="0">
                <span class="slot-num">Start Board</span>
                <div class="slot-name" id="paragon-slot-0-name">Start</div>
              </div>
              <div class="paragon-board-slot empty" data-slot="1">
                <span class="slot-num">Board 1</span>
                <div class="slot-name" id="paragon-slot-1-name">+ Add Board</div>
              </div>
              <div class="paragon-board-slot empty" data-slot="2">
                <span class="slot-num">Board 2</span>
                <div class="slot-name" id="paragon-slot-2-name">+ Add Board</div>
              </div>
              <div class="paragon-board-slot empty" data-slot="3">
                <span class="slot-num">Board 3</span>
                <div class="slot-name" id="paragon-slot-3-name">+ Add Board</div>
              </div>
              <div class="paragon-board-slot empty" data-slot="4">
                <span class="slot-num">Board 4</span>
                <div class="slot-name" id="paragon-slot-4-name">+ Add Board</div>
              </div>
              <button id="reset-paragon-btn" class="d4-btn" style="margin-left: auto;">Reset Paragon</button>
            </div>
            
            <div class="paragon-board-main" style="flex: 1; display: flex; gap: 20px;">
              <!-- Grid container -->
              <div class="paragon-grid-wrapper" style="flex: 1; max-width: 650px;">
                <div id="paragon-connection-panel" style="display: none; background: rgba(20,20,40,0.8); padding: 10px; border: 1px solid #446; border-radius: 4px; margin-bottom: 10px; justify-content: space-between; align-items: center;">
                  <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 0.9rem; color: #aaa;">Attach to:</span>
                    <select id="paragon-attach-slot" class="d4-input" style="width: 130px; font-size: 0.9rem;">
                      <option value="">-- Board --</option>
                    </select>
                    <span style="font-size: 0.9rem; color: #aaa;">via their</span>
                    <select id="paragon-attach-gate" class="d4-input" style="width: 120px; font-size: 0.9rem;">
                      <option value="">-- Gate --</option>
                    </select>
                    <span style="font-size: 0.9rem; color: #aaa;">using my</span>
                    <select id="paragon-self-gate" class="d4-input" style="width: 120px; font-size: 0.9rem;">
                      <option value="">-- Gate --</option>
                    </select>
                  </div>
                </div>
                <div class="paragon-board-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <select id="paragon-board-select" class="d4-input" style="width: 250px; font-size: 1rem;"></select>
                    <button id="paragon-rotate-btn" class="d4-btn" style="padding: 4px 10px; font-size: 0.9rem;">Rotate</button>
                  </div>
                  <div class="board-points" style="color: #aaa; font-size: 0.9rem;">Points in Board: <span id="board-points-spent">0</span></div>
                </div>
                
                <div id="paragon-grid" class="d4-panel" style="aspect-ratio: 1; padding: 10px; background: rgba(0,0,0,0.5);">
                  <!-- 21x21 grid populated by js -->
                </div>
              </div>"""

replace = """            <!-- Top Controls -->
            <div class="paragon-top-controls" style="display: flex; gap: 10px; margin-bottom: 20px; align-items: center;">
              <div style="color: #aaa; font-size: 1.1rem;">Total Points Spent: <span id="paragon-points-spent" style="color: #c9a55c; font-weight: bold;">0</span> / 225</div>
              <button id="reset-paragon-btn" class="d4-btn" style="margin-left: auto;">Reset Paragon</button>
            </div>
            
            <div class="paragon-board-main" style="flex: 1; display: flex; gap: 20px; height: 700px;">
              <!-- Viewport container -->
              <div id="paragon-viewport" class="d4-panel" style="flex: 1; position: relative; overflow: hidden; cursor: grab; padding: 0; background: #0a0a0e; user-select: none;">
                <div id="paragon-surface" style="position: absolute; transform-origin: 0 0; width: 0px; height: 0px;">
                  <!-- Boards rendered here via JS -->
                </div>
                
                <!-- Floating Board Controls -->
                <div id="paragon-board-controls" style="display: none; position: absolute; top: 10px; left: 10px; background: rgba(20,20,40,0.9); padding: 10px; border: 1px solid #446; border-radius: 4px; z-index: 100;">
                  <div style="font-weight: bold; margin-bottom: 5px; color: #fff;" id="paragon-active-board-name">Board Details</div>
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <select id="paragon-board-select" class="d4-input" style="width: 200px; font-size: 0.9rem;"></select>
                    <button id="paragon-rotate-btn" class="d4-btn" style="padding: 4px 10px; font-size: 0.9rem;">Rotate</button>
                    <button id="paragon-remove-btn" class="d4-btn" style="padding: 4px 10px; font-size: 0.9rem; background: rgba(200, 50, 50, 0.5);">Remove</button>
                  </div>
                </div>
                
                <!-- Modal for attaching board -->
                <div id="paragon-attach-modal" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(10,10,20,0.95); padding: 20px; border: 1px solid #c9a55c; border-radius: 4px; z-index: 200; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
                  <h3 style="margin-top: 0; color: #c9a55c;">Attach New Board</h3>
                  <p style="color: #aaa; margin-bottom: 15px;">Select a board to attach to this gate.</p>
                  <select id="paragon-modal-board-select" class="d4-input" style="width: 100%; margin-bottom: 15px; font-size: 1rem;"></select>
                  <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="paragon-modal-cancel" class="d4-btn" style="background: #333;">Cancel</button>
                    <button id="paragon-modal-confirm" class="d4-btn">Attach</button>
                  </div>
                </div>
              </div>"""

if search in html:
    html = html.replace(search, replace)
    print("Found and replaced UI elements.")
else:
    print("Did not find target string in index.html")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
