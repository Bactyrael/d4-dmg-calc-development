import urllib.request
import re

url = "https://data.infinitybuilds.gg/_next/static/chunks/app/%5Blocale%5D/(site)/database/talismans/page-a8460528c9be8af2.js?dpl=dpl_9KEvPmSD7Xr1uXxmbSHZ1YdTtmzg"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    js = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract any URL-like strings
    urls = re.findall(r'https?://[^"\'\s]+', js)
    print("Found URLs in JS:", len(urls))
    for u in urls[:20]:
        print(u)
        
    print("\nExtracting .png or .webp references:")
    imgs = re.findall(r'[^"\'\s]+\.(?:png|webp|jpg)', js)
    unique_imgs = list(set(imgs))
    for i in unique_imgs[:30]:
        print(i)
except Exception as e:
    print("Error:", e)
