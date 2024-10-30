<script>
    let pasteContent = ''; // variable for textarea content
    let pasteTitle = ''; // variable for textarea title

    async function savePaste() {
        if (pasteContent) {
            try {
                const response = await fetch('/save-paste', {
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
                } else {
                    console.error('Failed to save paste');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    }
</script>

<div class="mx-20 my-10 flex flex-col justify-start gap-5">
	<div class="flex flex-row gap-7 w-full items-center">
		<!-- <h3 class="text-2xl font-semibold">Title</h3> -->
		<input bind:value={pasteTitle} type="text" placeholder="Name your paste ! (optionnal)" class="input input-md input-bordered w-full max-w-xs"/>
	</div>

	<div class="flex flex-col gap-3 h-full w-full">
		<!-- <h3 class="text-xl font-semibold">Content</h3> -->
		<textarea bind:value={pasteContent} class="textarea textarea-bordered textarea-md h-[40vh] w-full resize-none" placeholder="Paste something !"></textarea>
		<div class="flex w-full justify-end">
			<button on:click={savePaste} class="btn bg-base-300 w-28">Send</button>
		</div>
	</div>
</div>
