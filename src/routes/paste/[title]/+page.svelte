<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	function nav_back() {
		if (browser) window.history.back();
	}
</script>

{#if data.fileData}
	<div class="mx-20 my-8 flex flex-col justify-start gap-7">
		<div class="flex justify-between items-end">
			<h2 class="text-2xl font-semibold">{data.fileData.title}</h2>
			<button class="btn btn-md" onclick={ () => nav_back() }>Go back</button>
		</div>
		<textarea
			bind:value={data.fileData.content}
			class="textarea textarea-bordered textarea-md h-[65vh] w-full resize-none"
			placeholder="Your file here"
			readonly
		></textarea>
	</div>
{:else}
	<p>File not found</p>
{/if}
