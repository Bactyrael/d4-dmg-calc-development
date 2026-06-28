import urllib.request, re, sys
try:
    req = urllib.request.Request('https://maxroll.gg/d4/planner/', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    js_files = re.findall(r'src="([^"]+\.js)"', html)
    found = set()
    for js in js_files:
        if not js.startswith('http'):
            js = 'https://maxroll.gg' + js if js.startswith('/') else 'https://maxroll.gg/d4/planner/' + js
        js_req = urllib.request.Request(js, headers={'User-Agent': 'Mozilla/5.0'})
        js_text = urllib.request.urlopen(js_req).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'(https://assets\.maxroll\.gg/d4/[a-zA-Z0-9_/-]+\.(?:png_webp))', js_text)
        found.update(matches)
    for url in sorted(found):
        if 'slot' in url.lower() or 'icon' in url.lower() or 'placeholder' in url.lower() or 'ui' in url.lower():
            print(url)
except Exception as e:
    print('Error:', e)