<script lang="ts">
	import Alert from "$lib/alert.svelte";

	let pasteContent = ''; // variable for textarea content
	let pasteTitle = ''; // variable for textarea title

	// Variable to control the alert visibility
	let showAlert: boolean = false;
	let alert: { content: string, status: 'error' | 'success', reason?: string };
	let responseJson: { reason: string };

	async function savePaste(): Promise<void> {
		if (pasteContent) {
			try {
				const response = await fetch('/api/paste', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ content: pasteContent, title: pasteTitle })
				});

				if (response.ok) {
					console.log('Paste saved successfully');
					pasteContent = ''; // Clear textarea after saving
					pasteTitle = ''; // Clear textarea after saving
					alert = { content: 'Your paste has been saved !', status: 'success' }
					showAlert = true;
				} else {
					console.error('Failed to save paste');
					responseJson = await response.json();
					alert = { content: 'Failed to save the paste !', status: 'error', reason: responseJson.reason }
					showAlert = true;
				}
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}

</script>

<div class="mx-20 my-5 flex flex-col justify-start gap-5">
	{#if showAlert}
		<Alert content={alert.content} status={alert.status} reason={alert.reason}/>
	{/if}

	<div class="mt-5 flex h-min w-full flex-row items-center justify-between gap-7">
		<input
			bind:value={pasteTitle}
			type="text"
			placeholder="Name your paste ! (optionnal)"
			class="input input-md input-bordered w-full max-w-xs"
		/>
	</div>

	<div class="flex h-full w-full flex-col gap-3">
		<textarea
			bind:value={pasteContent}
			class="textarea textarea-bordered textarea-md h-[50vh] w-full resize-none"
			placeholder="Paste something !"
		></textarea>
		<div class="flex w-full justify-end gap-5">
			<button on:click={savePaste} class="btn w-28 bg-base-300">Send</button>
		</div>
	</div>
</div>
