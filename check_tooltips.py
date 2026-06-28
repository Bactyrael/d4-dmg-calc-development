import re
file_path = r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\14471\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for skill tooltips
matches = re.findall(r'<div class="skill__tooltip[^>]*>([\s\S]*?)<div class="skill__tooltip', content)
print("Tooltips found:", len(matches))
if len(matches) > 0:
    print("Example 1:", matches[0][:200])

# Just dump the first 10000 chars of the content to see if we can find Bone Spear
bone_spear = content.find("Bone Spear")
print("Bone Spear index:", bone_spear)
if bone_spear != -1:
    print(content[bone_spear-200:bone_spear+500])
