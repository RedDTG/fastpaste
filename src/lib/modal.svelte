<script lang="ts">
	export let id: string;
	export let title: string;
	export let content: string;
	export let button: { style: 'success' | 'error' | 'info' | 'warning'; text: string, action: any};
</script>

<dialog {id} class="modal z-50">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{@html content}</p>
		<div class="modal-action">
            <form method="dialog" class="w-full">
                <div class="flex justify-between w-full">
					<button class="btn">Go back</button>
					<button class="btn btn-{button.style}" onclick={() => button.action()}>{button.text}</button>
				</div>
			</form>
		</div>
	</div>
</dialog>
