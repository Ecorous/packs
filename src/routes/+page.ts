import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    let packsData = await (await fetch("/data.json")).json()
    var packs: any[] = []
    var paths: any[] = []
    for (let i = 0; i < packsData.files.length; i++) {
        const pack = packsData.files[i];
        let packToml = await (await fetch(`/data/${pack}/pack.toml`)).text()
        let outToml = toml.parse(packToml)
        packs.push(outToml)
        paths.push(pack)
    }
    return {packs, paths}
}