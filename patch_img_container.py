import re

# 1. Update app.js to use an image container
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_img_append = r"slot\.appendChild\(img\);"
new_img_append = """const imgContainer = document.createElement('div');
              imgContainer.className = 'pd-img-container';
              imgContainer.appendChild(img);
              slot.appendChild(imgContainer);"""
app = re.sub(old_img_append, new_img_append, app)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

# 2. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove overflow: hidden from the slots directly so the rank badge can spill out!
css = css.replace("overflow: hidden;\n", "")
css = css.replace("overflow: hidden;", "")

# Add the new container CSS and update img rules
new_css = """
/* Image Container to isolate overflow clipping from rank badges */
.pd-img-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.pd-img-container img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Diamond image counter-rotation */
.pd-dia .pd-img-container img {
  width: 142%;
  height: 142%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* Circle image constraint */
.pd-cir .pd-img-container img {
  width: 110%;
  height: 110%;
}

.paperdoll-rank {
  z-index: 3;
  position: absolute;
  color: #fff;
  font-family: monospace;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000;
  pointer-events: none;
}
"""

css += new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Ranks un-clipped and styled correctly!")
