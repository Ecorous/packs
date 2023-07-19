import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    try {
        console.log("cheesy cursing")
        let packs_dirs = await (await fetch("/data.json")).json()
        console.log("oh my life")
        var packs: any[] = []
        var paths: any[] = []
        console.log("did.you.know")
        packs_dirs.files.forEach(async (element: any) => {
            console.log("im before the curs3d")
            let req = await fetch(`/data/${element}/pack.toml`)
            console.log("im somewhere i curs3d")
            if (req.status != 200) {
                throw error(500, "src/routes/+page.ts:req.status was: " + req.status)
            }
            console.log("you see, this is issue")
            let packToml = await req.text()
            console.log("mhm")
            console.log(packToml)
            packs.push(toml.parse(packToml))
            console.log("ohno")
            paths.push(element)
            console.log(":catstair:")
        });
        return { packs, paths }
    }
    catch {
        throw error(500, "you found me :P")
    }
}