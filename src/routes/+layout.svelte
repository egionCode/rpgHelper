<script>
	import '../app.css';
	import '$lib/assets/rpg_ui/rpgui.min.css';
    import "../../node_modules/rpg-awesome/css/rpg-awesome.min.css";

</script>

<div class="h-screen bg-zinc-800 rpgui-content">
	<slot />
</div>

<style>
	:global(.rpgui-button p) {
		margin: 20px 0 !important;
	}
	:global(.material-symbols-rounded) {
		font-family: 'Material Symbols Rounded' !important;
	}
</style>
