<script>
    import goblin from '$lib/assets/goblin.gif';
    import skeli from '$lib/assets/skeli.gif';
	let randomGif = [skeli, goblin];
	let randomNumber = Math.floor(Math.random() * 2);
	export let loading = true;
</script>

{#if loading}
	<div
		class="flex flex-col w-full items-center justify-center h-screen bg-gray-900 absolute z-50 rpgui-container"
	>
		<div class="flex flex-col items-center gap-4 justify-between">
			<img src="{randomGif[randomNumber]}" class="h-auto" width="300" />
			<p>Loading ...</p>
		</div>
	</div>
{/if}
