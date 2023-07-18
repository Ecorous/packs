import json
import sys
import os
import shutil
import tomli
import tomli_w
from zipfile import ZipFile

root_dir = os.path.abspath(sys.argv[0]).split("/build-scripts/mmc.py")[0]
print("root_dir: " + str(root_dir))
setup_persistent_dir = root_dir + "/.setup-persistent"
print("setup_persistent_dir: " + setup_persistent_dir)
data_dir = root_dir + "/static/data"
print("data_dir: " + data_dir)
mmc_temp_dir = root_dir + "/.mmc-temp"
print("mmc_temp_dir: " + mmc_temp_dir)
mmc_dir = root_dir + "/static/mmc"
print("mmc_dir: " + mmc_dir)
os.chdir(root_dir)
def getJson(path):
    f = open(path, "r")
    x = json.load(f)
    f.close()
    return x
def getBaseJson():
    return getJson(setup_persistent_dir + "/base/mmc-pack.json")
def getPackDataFromDir(path):
    f = open(path + "/pack.toml", "rb")
    x = tomli.load(f)
    f.close()
    return x

if os.path.isdir(mmc_temp_dir):
    shutil.rmtree(mmc_temp_dir)
os.mkdir(mmc_temp_dir)
if os.path.isdir(mmc_dir):
    shutil.rmtree(mmc_dir)
os.mkdir(mmc_dir)
os.chdir(".mmc-temp")
for pack in os.listdir(data_dir):
    pack_data = getPackDataFromDir(f"{data_dir}/{pack}")
    pack_slug = pack.split("/")[-1]
    os.mkdir(pack_slug)
    #shutil.copyfile(setup_persistent_dir + "/base/instance.cfg", pack_slug + "/instance.cfg")
    old_icfg = open(f"{setup_persistent_dir}/base/instance.cfg", "r")
    new_icfg = open(f"{pack_slug}/instance.cfg", "x")
    xold = old_icfg.read().replace("base-packwiz-pack", pack_slug)
    new_icfg.write(xold)
    shutil.copytree(setup_persistent_dir + "/base/.minecraft", pack_slug + "/.minecraft")
    mmc_pack_json = getBaseJson()
    mmc_pack_json["components"][0]["version"] = pack_data["versions"]["minecraft"]
    new_mmcpack = open(f"{pack_slug}/mmc-pack.json", "x")
    json.dump(mmc_pack_json, new_mmcpack)

    with ZipFile(f"{mmc_dir}/{pack_slug}.zip", 'x') as zip:
        zip.write(f"{pack_slug}/instance.cfg")
        zip.write(f"{pack_slug}/mmc-pack.json")
        zip.write(f"{pack_slug}/.minecraft")
shutil.rmtree(mmc_temp_dir)
print("✨ Done creating mmc packs! ✨")
#json.dump(x, ff, indent=4)