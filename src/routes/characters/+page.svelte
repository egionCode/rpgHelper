<script lang="ts">
	import { onMount } from 'svelte';
	let characters: any = [];
	onMount(() => {
		listar();
	});
	let dialog: any;

	let selected_char: any = {
		avatar: null,
		name: null,
		type: null,
		ac: null,
		lvl: 0,
		hp: 0,
		xp: 0,
		race: null,
		class: null,
		local: null,
		abilities: null,
		obs: null
	};
	function listar() {
		fetch('/characters').then(async (res) => {
			characters = await res.json();
		});
	}
	function openChar(char: any = null) {
		if (char) selected_char = char;
		else
			selected_char = {
				avatar: null,
				name: null,
				type: null,
				ac: null,
				lvl: 0,
				hp: 0,
				xp: 0,
				race: null,
				class: null,
				local: null,
				abilities: null,
				obs: null
			};
		console.log(char);
		dialog.showModal();
	}
	async function save() {
		let res = await fetch('/characters', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(selected_char)
		});
		dialog.close();
		listar();
	}
	let fileinput;
	async function onFileSelected(fike: any) {
		let reader = new FileReader();
		reader.readAsDataURL(fike.target.files[0]);
		reader.onload = (e) => {
			selected_char.avatar = e.target!.result;
		};
	}
</script>

<div class="flex flex-row w-full justify-between">
	<a href="/" class="rpgui-button">
		<p>
			<span class="material-symbols-rounded"> chevron_left </span>
			Back
		</p>
	</a>
	<button on:click={() => openChar(null)} class="rpgui-button">
		<p>
			Novo
			<span class="material-symbols-rounded"> add </span>
		</p>
	</button>
</div>

<div class="h-full flex flex-col justify-center">
	<div class="flex flex-row w-full items-center justify-center gap-12 flex-wrap">
		{#each characters as character}
			<div
				class="flex flex-col lg:w-48 lg:h-48 w-36 h-36 rounded-full bg-slate-800 hover:opacity-80 border-4 border-yellow-900"
				on:click={() => openChar(character)}
			>
				<img src={character.avatar} alt="" class="w-full h-full object-cover rounded-full" />
			</div>
		{/each}
	</div>
</div>
<dialog bind:this={dialog}>
	<div class="w-full h-full fixed bg-black opacity-25 top-0 left-0"></div>
	<div class="flex flex-row w-full h-full items-center justify-center">
		<div
			class="flex flex-col w-full lg:w-1/2 rpgui-container framed max-h-full"
			style="overflow-y: scroll;"
		>
			<div class="flex flex-col lg:flex-row gap-5">
				<div
					class="lg:w-full rounded-lg justify-center flex lg:h-auto w-full h-36 items-center"
					on:click={() => fileinput.click()}
				>
					{#if selected_char.avatar}
						<img src={selected_char.avatar} alt="" class="object-cover rounded-lg shadow-lg" />
					{/if}
					{#if !selected_char.avatar}
						<div
							class="bg-slate-800 h-full w-full rounded-lg flex flex-col gap-4 justify-center items-center"
						>
							<span class="material-symbols-rounded" style="font-size: 2rem;"> backup </span>
							<span>Subir foto</span>
						</div>
					{/if}
					<input
						style="display:none"
						type="file"
						accept=".jpg, .jpeg, .png"
						on:change={(e) => onFileSelected(e)}
						bind:this={fileinput}
					/>
				</div>
				<div class="flex flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:w-2/3 w-full">
					<div class="flex flex-row flex-wrap lg:flex-nowrap w-full">
						<div class="flex-col flex lg:w-96 w-full px-2 py-1">
							<span>Nome</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.name}
							/>
						</div>
						<div class="flex-col flex lg:w-32 w-1/2 px-2 py-1">
							<span>HP</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.hp}
							/>
						</div>
						<div class="flex-col flex lg:w-32 py-1 px-2 w-1/2">
							<span>CA</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.ac}
							/>
						</div>
					</div>
					<div class="flex flex-row flex-wrap lg:flex-nowrap w-full">
						<div class="flex-col flex w-1/2 px-2 py-1">
							<span>XP</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.xp}
							/>
						</div>
						<div class="flex-col flex w-1/2 px-2 py-1">
							<span>Level</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.lvl}
							/>
						</div>
						<div class="flex-col flex w-full px-2 py-1">
							<span>Classe</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.class}
							/>
						</div>
					</div>
					<div class="flex flex-row flex-wrap lg:flex-nowrap w-full">
						<div class="flex-col flex lg:w-1/2 w-full px-2 py-1">
							<span>Raça</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.race}
							/>
						</div>
						<div class="flex-col flex lg:w-32 w-full px-2 py-1">
							<span>Tipo</span>
							<select class="rpgui-dropdown" bind:value={selected_char.type}>
								<option value="option1">Herói</option>
								<option value="option2">Inimigo</option>
								<option value="option2">NPC</option>
							</select>
						</div>
						<div class="flex-col flex lg:w-32 w-full px-2 py-1">
							<span>Local</span>
							<input
								type="text"
								class="border border-b-2 border-r-2 rounded"
								bind:value={selected_char.local}
							/>
						</div>
					</div>
					<div class="flex-col flex w-full px-2 py-1">
						<span>Habilidades</span>
						<textarea
							class="border w-full border-b-2 border-r-2 rounded"
							bind:value={selected_char.abilities}
						/>
					</div>
					<div class="flex-col flex w-full px-2 py-1">
						<span>Observações</span>
						<textarea
							class="border w-full border-b-2 border-r-2 rounded"
							bind:value={selected_char.obs}
						/>
					</div>
				</div>
			</div>
			<div class="w-full justify-evenly flex flex-row pt-3">
				<button class="rpgui-button" on:click={() => dialog.close()}>Cancelar</button>
				<button class="rpgui-button" on:click={save}>Salvar</button>
			</div>
		</div>
	</div>
</dialog>

<style>
	select option{
		color: white;
		background-color: #4d4a4e;
		margin: 10px;
	}
	input{
		margin-top: 3px;
	}
</style>