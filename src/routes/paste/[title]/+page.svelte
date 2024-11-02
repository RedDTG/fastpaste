<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.fileData}
<div class="mx-20 my-8 flex flex-col justify-start gap-7">
    <h2 class="text-2xl font-semibold">{data.fileData.title}</h2>
	<textarea bind:value={data.fileData.content} class="textarea textarea-bordered textarea-md h-[65vh] w-full resize-none" placeholder="Your file here" readonly></textarea>
</div>
{:else}
    <p>File not found</p>
{/if}
