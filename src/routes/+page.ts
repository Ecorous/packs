import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
        console.log("zz")
        let packs_dirs = await (await fetch("/data.json")).json()
        var packs: any[] = []
        var paths: any[] = []
        for (const element of packs_dirs.files) {
            let req = await fetch(`/data/${element}/pack.toml`)
            console.log("a")
            if (req.status != 200) {
                throw error(500, "src/routes/+page.ts:req.status was: " + req.status)
            }
            console.log("b")
            let packToml = await req.text()
            console.log("c")
            let nextToml = toml.parse(packToml)
            console.log("d")
            packs.push(nextToml)
            console.log("e")
            console.log("nextToml: " + JSON.stringify(nextToml))
            paths.push(element)
            console.log("element: ", element)
        }
        console.log("+page.ts:packs: " + packs)
        console.log("+page.ts:paths: " + paths)
        return { packs, paths }
}