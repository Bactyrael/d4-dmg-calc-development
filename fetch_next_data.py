import urllib.request
import re
import json

url = "https://tools.infinitybuilds.gg/en/database/talismans"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract build ID
    build_id_match = re.search(r'"buildId":"([^"]+)"', html)
    if build_id_match:
        build_id = build_id_match.group(1)
        print("Build ID:", build_id)
        
        # Next.js 13+ App Router uses RSC payloads, not _next/data/ JSON.
        # But let's check for RSC payloads (fetching the URL with a special header)
        req2 = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0',
            'RSC': '1'
        })
        rsc_data = urllib.request.urlopen(req2).read().decode('utf-8')
        print("Fetched RSC data, length:", len(rsc_data))
        
        # Search for .png or .webp in the RSC payload
        imgs = re.findall(r'[^"\'\s\[\]\{\}\(\)]+\.(?:png|webp|jpg)', rsc_data)
        unique_imgs = list(set(imgs))
        print("Found image references in data:", len(unique_imgs))
        for i in unique_imgs[:30]:
            print(i)
    else:
        print("Could not find Next.js Build ID. Might be pure app router with no buildId exposed.")
        # Try fetching with RSC header anyway
        req2 = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0',
            'RSC': '1'
        })
        rsc_data = urllib.request.urlopen(req2).read().decode('utf-8')
        print("Fetched RSC data, length:", len(rsc_data))
        imgs = re.findall(r'[^"\'\s\[\]\{\}\(\)\\:]+\.(?:png|webp|jpg)', rsc_data)
        unique_imgs = list(set(imgs))
        print("Found image references in data:", len(unique_imgs))
        for i in unique_imgs[:30]:
            print(i)
            
except Exception as e:
    print("Error:", e)
