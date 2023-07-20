<script lang="ts">
    import { page } from "$app/stores";
    /** @type {import('./$types').PageData} */
    export let data: { toml: { name: any, author: any, version: any, index: any, versions: any}, mods: string[] };
    import { getRelativeMMCPack } from "$lib";
    console.log(data)
    console.log($page.params.pack)
    let mmc_pack_url = getRelativeMMCPack($page.params.pack)

    function getModLoaderVersion(): any {
        console.log(data.toml.versions)
        if (data.toml.versions.quilt != undefined) {
            return data.toml.versions.quilt
        } else if (data.toml.versions.fabric != undefined) {
            return data.toml.versions.fabric
        } else if (data.toml.versions.forge != undefined) {
            return data.toml.versions.forge
        }
    }

    function getModLoader(): any {
        if (data.toml.versions.quilt != undefined) {
            return "Quilt"
        } else if (data.toml.versions.fabric != undefined) {
            return "Fabric"
        } else if (data.toml.versions.forge != undefined) {
            return "Forge"
        }
    }
    console.log(getModLoader(), getModLoaderVersion())
</script>

<h1>
    {data.toml.name}
</h1>
<h2>
    by {data.toml.author}
</h2>


{getModLoader()} {getModLoaderVersion()}
<br/>
<br/>
<button class="download" on:click={() => window.open(mmc_pack_url, "_blank")}>
    Download MultiMC/PrismLauncher Pack
</button>

<details>
    <summary>Mods (click to expand)</summary>
    <div class="mods">
        <details>
            <summary>e</summary>
            {data.mods}
        </details>
        {#each data.mods as mod}
            
            <p>{mod}</p>
        {/each}
    </div>
</details>

<style>
    button.download {
        border-color: transparent;
        background-color: var(--ctp-mocha-surface0);
        border-radius: 5px;
        cursor: pointer;
        color: var(--ctp-mocha-text);
        padding: 0.3rem
    }

    div.mods {
        border-radius: 5px;
        background-color: var(--ctp-mocha-surface0);
        color: var(--ctp-mocha-text);
        padding: 0.5rem;
    }
</style>