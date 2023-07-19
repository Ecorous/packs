import os
import json
import sys

root_dir = os.path.abspath(sys.argv[0]).split("/build-scripts/generate-list.py")[0]
print("root_dir: " + str(root_dir))
data_dir = root_dir + "/static/data"
print("data_dir: " + data_dir)
if os.path.isfile(f"{data_dir}.json"):
    os.remove(f"{data_dir}.json")
files = os.listdir(data_dir)
f = open(f"{data_dir}.json", "x")
json.dump({"files": files}, f, indent=4)