//const BASE_URL = "https://packs.ecorous.org"
export const BASE_URL = "http://localhost:5173"
export function getRelativeMMCPack(pack_slug: string) {
    return "/mmc/" + pack_slug + ".zip";
}