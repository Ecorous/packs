import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    try {
        let packs_dirs = await (await fetch("/data.json")).json()
        var packs: any[] = []
        var paths: any[] = []
        for (const element of packs_dirs.files) {
            let req = await fetch(`/data/${element}/pack.toml`)
            if (req.status != 200) {
                throw error(500, "src/routes/+page.ts:req.status was: " + req.status)
            }
            let packToml = await req.text()
            let nextToml = toml.parse(packToml)
            packs.push(nextToml)
            console.log("nextToml: " + JSON.stringify(nextToml))
            paths.push(element)
            console.log("element: ", element)
        }
        console.log("+page.ts:packs: " + packs)
        console.log("+page.ts:paths: " + paths)
        return { packs, paths }

    }
    catch {
        throw error(500, "you found me :P")
    }
}