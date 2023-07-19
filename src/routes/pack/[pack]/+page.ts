import { error } from '@sveltejs/kit';
import * as toml_lib from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    var req = await fetch("/data/" + params.pack + "/pack.toml")
    if (req.status == 404) {
        throw error(404, 'Pack not found')
    }
    var toml = "DEFAULT_VALUE";
    let packToml = await req.text()
    toml = toml_lib.parse(packToml)
    return { toml, }
}