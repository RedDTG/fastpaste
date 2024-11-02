<script lang="ts">
	let pasteContent = ''; // variable for textarea content
	let pasteTitle = ''; // variable for textarea title

	// Variable to control the alert visibility
	let showAlert = false;
	let showErrorAlert = false;
	let fadeOut = false;
	let responseJson = {};

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
					toggleAlert();
				} else {
					console.error('Failed to save paste');
					responseJson = await response.json();
					toggleErrorAlert();
				}
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}

	// Function to toggle the alert visibility
	function toggleAlert(): void {
		showAlert = true;
		fadeOut = false;
		setTimeout(() => {
			fadeOut = true;
			setTimeout(() => (showAlert = false), 500); // Délai pour la transition fade-out
		}, 2000); // Délai avant le début de fade-out
	}

	// Function to toggle the alert visibility
	function toggleErrorAlert(): void {
		showErrorAlert = true;
		fadeOut = false;
		setTimeout(() => {
			fadeOut = true;
			setTimeout(() => (showAlert = false), 500); // Délai pour la transition fade-out
		}, 2000); // Délai avant le début de fade-out
	}
</script>

<div class="mx-20 my-10 flex flex-col justify-start gap-5">
	<div class="flex h-min w-full flex-row items-center justify-between gap-7">
		<input
			bind:value={pasteTitle}
			type="text"
			placeholder="Name your paste ! (optionnal)"
			class="input input-md input-bordered w-full max-w-xs"
		/>
		{#if showAlert}
			<div
				role="alert"
				class="alert alert-success absolute left-3/4 w-min bg-green-400 opacity-0 transition-opacity duration-500 ease-in-out
            {fadeOut ? 'opacity-0' : 'opacity-100'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="whitespace-nowrap">Your paste has been saved!</span>
			</div>
		{/if}
		{#if showErrorAlert}
			<div
				role="alert"
				class="alert alert-error absolute left-3/4 w-min opacity-0 transition-opacity duration-500 ease-in-out
            {fadeOut ? 'opacity-0' : 'opacity-100'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="whitespace-nowrap">{responseJson.reason}</span>
			</div>
		{/if}
	</div>

	<div class="flex h-full w-full flex-col gap-3">
		<textarea
			bind:value={pasteContent}
			class="textarea textarea-bordered textarea-md h-[40vh] w-full resize-none"
			placeholder="Paste something !"
		></textarea>
		<div class="flex w-full justify-end gap-5">
			<button on:click={savePaste} class="btn w-28 bg-base-300">Send</button>
		</div>
	</div>
</div>
