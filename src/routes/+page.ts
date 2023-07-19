import { BASE_URL } from '$lib';
import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    let packs_dirs = await (await fetch(BASE_URL + "/data.json")).json()
    var packs: any[] = []
    var paths: any[] = []
    packs_dirs.files.forEach(async (element: any) => {
        let packToml = await (await fetch(BASE_URL + "/data/" + element + "/pack.toml")).text()
        console.log(packToml)
        packs.push(toml.parse(packToml))
        paths.push(element)
    });
    return {packs, paths}
}