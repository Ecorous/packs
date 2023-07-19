import { error } from '@sveltejs/kit';
import * as toml from 'toml';
/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    try {
        let packs_dirs = await (await fetch("/data.json")).json()
        var packs: any[] = []
        var paths: any[] = []
        packs_dirs.files.forEach((element: any) => {
            let req = fetch(`/data/${element}/pack.toml`).then(
                (nreq) => {
                    if (nreq.status != 200) {
                        throw error(500, "src/routes/+page.ts:req.status was: " + nreq.status)
                    }
                    let packToml = nreq.text().then(
                        (npackToml) => {
                            let nextToml = toml.parse(npackToml)
                            packs.push(nextToml)
                            console.log("nextToml: " + JSON.stringify(nextToml))
                            paths.push(element)
                            console.log("element: ", element)
                        }
                    )

                }
            )

        });
        console.log("+page.ts:packs: " + packs)
        console.log("+page.ts:paths: " + paths)
        return { packs, paths }
    }
    catch {
        throw error(500, "you found me :P")
    }
}