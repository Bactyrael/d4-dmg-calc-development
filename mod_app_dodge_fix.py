import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Add getDynamicValues calls
fix = """        // Dodge Calculation
        getDynamicValues(dom.dodgeAddBody, 'dodgeAdd');
        getDynamicValues(dom.dodgeMultBody, 'dodgeMult');
        
        const dodgeAddValues = currentBuild.dodgeAdd || [];"""

app_code = app_code.replace("""        // Dodge Calculation
        const dodgeAddValues = currentBuild.dodgeAdd || [];""", fix)

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done fixing dodge calculation DOM parsing")
