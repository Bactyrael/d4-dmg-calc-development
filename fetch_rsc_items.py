import urllib.request
import re

url = "https://tools.infinitybuilds.gg/en/database/talismans"
try:
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0',
        'RSC': '1'
    })
    rsc_data = urllib.request.urlopen(req).read().decode('utf-8')
    
    if "Rathma" in rsc_data:
        print("Found 'Rathma' in RSC payload!")
        # Find context around it
        matches = re.finditer(r'.{0,100}Rathma.{0,100}', rsc_data)
        for i, m in enumerate(matches):
            if i > 5: break
            print(m.group(0))
            
    if "webp" in rsc_data:
        print("Found webp!")
        
except Exception as e:
    print("Error:", e)
