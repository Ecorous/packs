import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import * as toml from 'toml';
/** @type {import('./$types').PageServerLoad} */

export async function load({ params }) {
    const packDir = "static/data/" + params.pack;
    const packTomlPath = packDir + "/pack.toml"
    var tomlData = "DEFAULT_VALUE";
    if (!fs.existsSync("static/data/" + params.pack)) { throw error(404, 'Pack not found'); }
    else {
        let packToml = await fs.readFileSync(packTomlPath, 'utf8')
        tomlData = toml.parse(packToml)
    }
    return { toml: tomlData }
}