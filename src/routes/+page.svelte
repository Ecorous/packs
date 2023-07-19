<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data: any;
    console.log("ohhhh myyyy dataaaa: " + data)
</script>
<p>this is site is by ecorous</p>
<p>it was very crappily made</p>
<p>have fun!</p>
<br/>
list of packwiz packs (click the name to go to it's page)
<!--<p style="display:none">{data.packs[0].name}</p>-->
{#each data.packs as pack, i}
    <h3><a href={"/pack/" + data.paths[i]}>{pack.name} (id: {data.paths[i]})</a></h3>
{/each}

<style>
    a {
        color: var(--ctp-mocha-text);
        text-decoration: none;
    }
</style>