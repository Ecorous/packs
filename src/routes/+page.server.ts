import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import * as toml from 'toml';
/** @type {import('./$types').PageServerLoad} */

export async function load({ params }) {
    let packs_dirs = fs.readdirSync("static/data")
    var packs: any[] = []
    var paths: any[] = []
    packs_dirs.forEach(async (element: any) => {
        let packToml = await fs.readFileSync("static/data/" + element + "/pack.toml", 'utf8')
        packs.push(toml.parse(packToml))
        paths.push(element)
    });
    return {packs, paths}
}