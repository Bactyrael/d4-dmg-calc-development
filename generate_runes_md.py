import json

with open('assets/database.js', 'r', encoding='utf-8') as f:
    text = f.read()

runes_json = text.split('window.D4_DATABASE.runes = ')[-1].strip()[:-1]
runes = json.loads(runes_json)

md = '# Diablo 4 Runes List\n\n'

conditions = [r for r in runes if r['type'] == 'Condition']
effects = [r for r in runes if r['type'] == 'Effect']

md += '## Condition Runes (' + str(len(conditions)) + ')\n\n'
for r in conditions:
    md += f"- **{r['name']}**: {r['description']} *(Offering generated: {r['offering']})*\n"

md += '\n## Effect Runes (' + str(len(effects)) + ')\n\n'
for r in effects:
    md += f"- **{r['name']}**: {r['description']} *(Offering cost: {r['offering']})*\n"

with open(r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\runes_list.md', 'w', encoding='utf-8') as f:
    f.write(md)

print("Markdown artifact generated!")
