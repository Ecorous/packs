import os
import json
import sys
import shutil
import tomli

r = sys.argv[0]
if os.name == "nt":
    root_dir = os.path.abspath(r).split("\\build-scripts\\generate-list.py")[0]
else:
    root_dir = os.path.abspath(sys.argv[0]).split("/build-scripts/generate-list.py")[0]
# root_dir = os.path.abspath(sys.argv[0]).split("/build-scripts/generate-list.py")[0]
print("root_dir: " + str(root_dir))
data_dir = root_dir + "/static/data"
print("data_dir: " + data_dir)
if os.path.isfile(f"{data_dir}.json"):
    os.remove(f"{data_dir}.json")
files = os.listdir(data_dir)
f = open(f"{data_dir}.json", "x")
json.dump({"files": files}, f, indent=4)

if os.path.isdir(f"{data_dir}_mods"):
    shutil.rmtree(f"{data_dir}_mods")
os.mkdir(f"{data_dir}_mods")
for x in files:
    mods_pack = []
    for m in os.listdir(f"{data_dir}/{x}/mods"):
        if m.endswith("pw.toml"):
            with open(f"{data_dir}/{x}/mods/{m}", "rb") as f:
                mods_pack.append(tomli.load(f)["name"])
        else:
            mods_pack.append(m)
    output_file = open(f"{data_dir}_mods/{x}.json", "x")
    json.dump({"mods": mods_pack}, output_file, indent=4)
    
