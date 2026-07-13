import re
import codecs

def get_slots(filename, enc="utf-8"):
    try:
        with open(filename, "r", encoding=enc) as f:
            db = f.read()
    except:
        with open(filename, "r", encoding="utf-16") as f:
            db = f.read()
            
    mods = len(re.findall(r'"modifiers":\s*\[', db))
    temps = len(re.findall(r'"temper":\s*\[', db))
    temps2 = len(re.findall(r'"tempers":\s*\[', db))
    trans = len(re.findall(r'"transfigure":\s*\[', db))
    trans2 = len(re.findall(r'"transfigures":\s*\[', db))
    print(f"{filename} -> modifiers: {mods}, temper: {temps} (s:{temps2}), transfigure: {trans} (s:{trans2})")

get_slots("assets/database_backup.js")
get_slots("assets/database.js")
