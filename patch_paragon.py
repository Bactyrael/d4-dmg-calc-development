import sys

def patch_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    if 'paragon_logic.js' not in html:
        html = html.replace('<script src="assets/paragon.js"></script>', '<script src="assets/paragon.js"></script>\n    <script src="paragon_logic.js?v=1"></script>')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print('Updated index.html')

def patch_app():
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    start_idx = app_js.find('function initParagonUI()')
    if start_idx != -1:
        end_idx = app_js.find("document.addEventListener('DOMContentLoaded'", start_idx)
        if end_idx != -1:
            app_js = app_js[:start_idx] + app_js[end_idx:]
            with open('app.js', 'w', encoding='utf-8') as f:
                f.write(app_js)
            print('Patched app.js to remove paragon functions')

if __name__ == '__main__':
    patch_index()
    patch_app()
