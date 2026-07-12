import urllib.request
import re

url = "https://tools.infinitybuilds.gg/en/database/talismans"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Find all image tags or standard URL patterns
    imgs = re.findall(r'<img[^>]+src="([^">]+)"', html)
    print("Found img tags:", len(imgs))
    for i in imgs[:20]:
        print(i)
        
    print("\nLooking for specific D4 image patterns:")
    d4_imgs = re.findall(r'https?://[^"\'\s]+\.(?:png|jpg|webp)', html)
    # filter unique
    unique_d4 = list(set(d4_imgs))
    print("Found total image URLs:", len(unique_d4))
    for i in unique_d4[:20]:
        print(i)
except Exception as e:
    print("Error:", e)
