<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Modal from '$lib/modal.svelte';
    import { alertStore } from '$lib/alertStore';

	let files: Array<{ title: string; content: string }> = [];
	let currentFileTitle: string = '';

	// Variable to control the alert visibility
	let showAlert: boolean = false;
	let alertRef: any;
	let alert: { content: string; status: 'error' | 'success'; reason?: string };


	onMount(async () => {
		const response = await fetch('/api/paste');
		files = await response.json();
	});

	function handleRowClick(title: string) {
		goto(`/paste/${title}`, { noScroll: true });
	}

	async function deletePaste(title: string) {
		console.log(showAlert)
		try {
			const response = await fetch(`/api/paste/${title}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				console.log('Paste deleted successfully');
				files = files.filter((f) => f.title !== title);
				alertStore.showAlert('File deleted successfully!', 'success', null);
			} else {
				console.error('Failed to delete paste');
				
			}
		} catch (error) {
			console.error('Error:', error);
		}
		console.log(showAlert)
	}

</script>

<div class="max-h-[90vh] overflow-y-scroll pt-3">
	<!-- {#if showAlert}
		<Alert bind:this={alertRef} content={alert.content} status={alert.status} reason={alert.reason} />
	{/if} -->
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th class="flex justify-center">Index</th>
				<th>Title</th>
				<th class="flex justify-center">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each files as file, index}
				<Modal
					id="deleteModal"
					title="Are you sure ?"
					content="You are about to delete the file : <b>{currentFileTitle}</b>.<br /><br />Are you sure you want to proceed ?"
					button={{ style: 'error', text: 'Delete', action: () => deletePaste(currentFileTitle) }}
				></Modal>
				<tr class="hover cursor-pointer" onclick={() => handleRowClick(file.title)}>
					<td class="flex justify-center">{index + 1}</td>
					<td class="font-bold">{file.title}</td>
					<td class="flex justify-center gap-3">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button class="btn btn-square btn-info btn-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
						</button>
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="btn btn-square btn-error btn-sm"
							onclick={(event) => {
								currentFileTitle = file.title; // Store the title of the file to delete
								event.stopPropagation();
								deleteModal.showModal()
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
