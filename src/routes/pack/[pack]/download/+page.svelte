<script lang="ts">
    import { page } from "$app/stores";
    import { getRelativeMMCPack } from "$lib";
    let mmc_pack_url = getRelativeMMCPack($page.params.pack)
    window.location.href = mmc_pack_url
</script>
Downloading...
If your file has not download, <a href={mmc_pack_url}>click here</a>