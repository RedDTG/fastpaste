<!-- <script lang="ts">
	import { onMount } from 'svelte'; // Import Svelte's lifecycle function

	let icon: string;
	let showAlert: boolean;

	export let content: string; // Main alert message
	export let status: 'success' | 'error' | 'info' | 'warning';
	export let reason: string | null = null; // Optional reason for additional context

	let isVisible = true; // Control the visibility of the alert

	// Function to hide the alert with a fade-out transition
	function hideAlert() {
		isVisible = false; // Set visibility to false
		showAlert = false;
	}

    // Automatically hide the alert after a set timeout
    onMount(() => {
        const timeout = setTimeout(hideAlert, 3000); // 3 seconds
        
        return () => clearTimeout(timeout); // Clean up timeout on component destroy
    });

	// Set CSS class based on the alert status
	let alertClass = '';
	switch (status) {
		case 'success':
			alertClass = 'alert-success bg-green-400';
			icon = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`;
			break;
		case 'error':
			alertClass = 'alert-error';
			icon = `<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				    </svg>`;
			break;
		case 'info':
			alertClass = 'alert-info';
			break;
		case 'warning':
			alertClass = 'alert-warning';
			break;
	}
</script>

<div
	role="alert"
    class:opacity-0={!isVisible} 
    class:opacity-100={isVisible}
	class="alert {alertClass} absolute left-2/4 w-1/4 -translate-x-1/2 opacity-0 transition-opacity duration-500 ease-in-out"
>
	{@html icon}
	<div class="flex flex-col">
		<span>{content}</span>
		{#if reason}
			<p class="text-sm text-black">{reason}</p>
		{/if}
	</div>
</div> -->

<script lang="ts">
    import { alertStore } from './alertStore';
    import { onDestroy } from 'svelte';

    // Subscription to alertStore
    let alert: any;
	let icon: string;

    const unsubscribe = alertStore.subscribe(value => {
        alert = value;
    });

    onDestroy(unsubscribe);

	// Set CSS class based on the alert status
	let alertClass = '';
	switch (alert.status) {
		case 'success':
			alertClass = 'alert-success bg-green-400';
			icon = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`;
			break;
		case 'error':
			alertClass = 'alert-error';
			icon = `<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				    </svg>`;
			break;
		case 'info':
			alertClass = 'alert-info';
			break;
		case 'warning':
			alertClass = 'alert-warning';
			break;
	}

</script>

{#if alert.visible}
    <div role="alert"
	class="alert {alertClass} absolute left-2/4 w-1/4 -translate-x-1/2 opacity-100 transition-opacity duration-500 ease-in-out">
        <span>{alert.message}</span>
        {#if alert.reason}
            <span class="reason">{alert.reason}</span>
        {/if}
    </div>
{/if}
