import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Find the function definition
func_pattern = r"function renderToughnessDashboard\(compiledStats\) \{.*?\}"
func_match = re.search(func_pattern, app_code, re.DOTALL)

if func_match:
    func_text = func_match.group(0)
    
    # Remove it from the end
    app_code = app_code.replace("\n\n" + func_text, "")
    app_code = app_code.replace("\n" + func_text, "")
    app_code = app_code.replace(func_text, "")
    
    # Insert it right before })();
    app_code = app_code.replace("})();", func_text + "\n\n})();")

    with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
        f.write(app_code)
    print("Fixed renderToughnessDashboard position")
else:
    print("Could not find renderToughnessDashboard")
