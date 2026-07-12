with open("app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

start = -1
for i, line in enumerate(lines):
    if "function loadBuildToUI(" in line:
        start = i
        break

if start != -1:
    end = start
    braces = 0
    found_first = False
    for i in range(start, len(lines)):
        braces += lines[i].count('{')
        braces -= lines[i].count('}')
        if '{' in lines[i]:
            found_first = True
        if found_first and braces == 0:
            end = i
            break
    print("".join(lines[end-25:end+1]))
