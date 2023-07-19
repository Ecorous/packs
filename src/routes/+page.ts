import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    try {
        let packs_dirs = await (await fetch("/data.json")).json()
        var packs: any[] = []
        var paths: any[] = []
        packs_dirs.files.forEach(async (element: any) => {
            let req = await fetch(`/data/${element}/pack.toml`)
            if (req.status != 200) {
                throw error(500, "src/routes/+page.ts:req.status was: " + req.status)
            }
            let packToml = await req.text()
            console.log(packToml)
            packs.push(toml.parse(packToml))
            paths.push(element)
        });
        return { packs, paths }
    }
    catch {
        throw error(500, "you found me :P")
    }
}