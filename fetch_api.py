import urllib.request
import re

url = "https://tools.infinitybuilds.gg/en/database/talismans"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract javascript file URLs
    scripts = re.findall(r'<script[^>]+src="([^">]+)"', html)
    print("Scripts:", scripts)
    
    # Extract any inline JSON data that might look like Next.js or Nuxt data
    next_data = re.search(r'__NEXT_DATA__.*?>(.*?)</script>', html, re.DOTALL)
    if next_data:
        print("Found Next.js data block! Length:", len(next_data.group(1)))
        
    nuxt_data = re.search(r'__NUXT__.*?>(.*?)</script>', html, re.DOTALL)
    if nuxt_data:
        print("Found Nuxt data block! Length:", len(nuxt_data.group(1)))
        
except Exception as e:
    print("Error:", e)
