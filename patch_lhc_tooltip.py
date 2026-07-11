import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# We need to replace the two blocks where lhc components and formula are rendered.

def build_new_formula(prefix):
    return f"""                                            ${{({prefix}.lhcComponents || []).map((comp, idx) => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">&#9500;&#9472;</span> ${{comp.name}}: ${{idx === 0 ? '' : '+'}}${{Number(comp.value.toFixed(1))}}%</div>`).join('')}}
                                          </div>
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                            <span style="color: #555;">&#9500;&#9472;</span> Formula: ${{Number({prefix}.lhcComponents[0].value.toFixed(1))}}% * (100% + ${{Number({prefix}.lhcBonus.toFixed(1))}}%)${{{prefix}.lhcComponents.some(c => c.name.includes('[x]')) ? ' * ' + {prefix}.lhcComponents.filter(c => c.name.includes('[x]')).map(c => '(100% + ' + Number(c.value.toFixed(1)) + '%)').join(' * ') : ''}}
                                          </div>"""

target_b = """                                            ${(b.lhcComponents || []).map((comp, idx) => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">+-</span> ${comp.name}: ${idx === 0 ? '' : '+'}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                          </div>
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                            <span style="color: #555;">+-</span> Formula: ${Number(b.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b.lhcBonus.toFixed(1))}%)
                                          </div>"""

target_b2 = """                                              ${(b2.lhcComponents || []).map((comp, idx) => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">+-</span> ${comp.name}: ${idx === 0 ? '' : '+'}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                            </div>
                                            <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                              <span style="color: #555;">+-</span> Formula: ${Number(b2.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b2.lhcBonus.toFixed(1))}%)
                                            </div>"""

content = content.replace(target_b, build_new_formula('b'))
content = content.replace(target_b2, build_new_formula('b2').replace('                                            ', '                                              '))

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated LHC UI")
