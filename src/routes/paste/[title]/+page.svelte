<script>

    let file = {}
    
    export async function load({ params }) {
        const { title } = params;
        
        const response = await fetch(`/get-pasted/${title}`); 
		file = await response.json();
        return { file };
    }

</script>

<textarea class="textarea" placeholder="Bio" bind:value={file.content} disabled></textarea>