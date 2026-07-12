import json

with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

for img in images:
    if "Seal" in img.get("name", ""):
        print(f"Name: {img.get('name')}")
        print(f"Type: {img.get('type')}")
        print(f"Position: {img.get('background_position')}")
        print(f"Size: {img.get('background_size')}")
        print(f"URL: {img.get('image_url')}")
        print("---")
