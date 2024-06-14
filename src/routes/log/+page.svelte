<script lang="ts">
	import { onMount } from 'svelte';
	import { type Log } from '$lib/db/model/log';
	import { type Character } from '$lib/db/model/character';
	var rodada = 0;
	var loading = false;
	var combat_log: Log = {
		status: false,
		combat: '',
		date: new Date(),
		turns: [[{}]]
	} as Log;
	var characters = [] as Character[];
	var log: any = {};
	var total = {
		max_damage: 0,
		damage_given: 0,
		heal_given: 0
	};
	function resetCombatLog() {
		let newCombat = {
			status: false,
			combat: '',
			date: new Date(),
			turns: [[{}]]
		} as Log;
		if (characters.length > 0) {
			newCombat.turns[0] = characters.map((c) => {
				return {
					name: c.name,
					hp: c.hp
				};
			});
		}
		return newCombat;
	}
	function newLogEntry() {
		let newLog: any = [];
		combat_log.turns[rodada].forEach((log: any) => {
			let n = { ...log };
			n.damage_given = 0;
			n.damage_taken = 0;
			n.heal_given = 0;
			n.heal_taken = 0;
			newLog.push(n);
		});
		return newLog;
	}
	//handle keys inside logs
	function handleKeyup($e, index) {
		if ($e.key == 'Enter') {
			if (index == combat_log.turns[rodada].length - 1) {
				combat_log.turns[rodada].push({
					name: ''
				});
				combat_log.turns[rodada].sort((a: any, b: any) => Number(b.init) - Number(a.init));
			}
			combat_log = combat_log;
		}
	}

	function handleBlur($e, index) {
		console.log('ues');
		console.log();
	}
	async function nextLog() {
		if (!combat_log.turns[rodada + 1]) combat_log.turns.push(newLogEntry());
		rodada++;
		await save();
	}
	function prevLog() {
		if (rodada > 0) rodada--;
		combat_log = combat_log;
	}
	async function endCombat() {
		combat_log.status = true;
		await save();
		rodada = 0;
		combat_log = resetCombatLog();
	}
	function removeLog(i) {
		combat_log.turns[rodada].splice(i, 1);
		save();
	}
	function init(el) {
		el.focus();
	}
	async function save() {
		let res = await fetch('/log', {
			method: 'POST',
			body: JSON.stringify(combat_log)
		});
		res = await res.json();
		if (combat_log.status == false) combat_log._id = res._id;
		return;
	}
	onMount(async () => {
		loading = true;
		characters = await (await fetch('/characters?type=hero')).json();

		let log = await fetch('/log?status=false', {
			method: 'GET'
		});
		log = await log.json();
		if (log.length) {
			combat_log = log[0];
			rodada = combat_log.turns.length - 1;
		} else {
			//new combat
			combat_log = resetCombatLog();
		}
	});
</script>

<div class="flex flex-col h-screen justify-center items-center">
	<div class="rpgui-container framed w-full h-full overflow-auto justify-around">
		<div class="flex flex-row w-full justify-between">
			<div class="w-1/3">
				<a href="/" class="rpgui-button">
					<p>
						<span class="material-symbols-rounded"> chevron_left </span>
						Back
					</p>
				</a>
			</div>
			<div class="flex flex-row justify-start items-center gap-10 w-1/3">
				<button class="rpgui-button" style="min-width: 0;" on:click={prevLog}>
					<i class="material-symbols-rounded"> chevron_left </i>
				</button>
				<span>Rodada {rodada + 1}</span>
				<button class="rpgui-button" style="min-width: 0;" on:click={nextLog}>
					<i class="material-symbols-rounded"> chevron_right </i>
				</button>
			</div>
			<div class="flex flex-row h-fit items-center w-1/3 justify-end">
				<button class="rpgui-button" on:click={() => endCombat()}>
					<p>Finish</p>
				</button>
			</div>
		</div>
		<div class="flex flex-row py-5 px-10 items-center gap-4 w-full">
			<div class="flex flex-col">
				<label for="">Combate</label>
				<input
					type="text"
					bind:value={combat_log.combat}
					class="border border-b-2 border-r-2 rounded"
				/>
			</div>

			<div class="flex flex-col justify-center">
				<p>Data</p>
				<input
					type="date"
					bind:value={combat_log.date}
					class="border border-b-2 border-r-2 rounded"
				/>
			</div>

			<div class="w-1/2 flex flex-row justify-end gap-6">
				<div class="flex flex-col justify-center">
					<p>Turnos</p>
					<span>{combat_log?.turns?.length}</span>
				</div>
				<div class="flex flex-col justify-center">
					<p>Dano Total</p>
					<span>{total.damage_given}</span>
				</div>
				<div class="flex flex-col justify-center">
					<p>Cura Total</p>
					<span>{total.heal_given}</span>
				</div>
				<div class="flex flex-col justify-center">
					<p>Maior Dano</p>
					<span>{total.max_damage}</span>
				</div>
			</div>
		</div>
		<hr />
		<div class="flex flex-row">
			<div class="flex flex-col w-full">
				<div class="flex flex-col mt-4 overflow-x-auto">
					{#if combat_log.turns}
						{#each combat_log.turns[rodada] as l, i}
							<div class="w-max flex flex-row gap-3 px-1 pb-3 items-center justify-center">
								<span class="mr-2">{i + 1}°</span>
								<button
									on:click={() => removeLog(i)}
									class=" bg-red-500 p-4 h-full rounded-lg flex flex-col items-center mr-2 pt-6 w-16"
								>
									<i class="material-symbols-rounded text-white">close</i>
								</button>
								<button
									on:click={() => (l.enemy = !l.enemy)}
									class="{l.enemy
										? 'bg-red-600'
										: 'bg-slate-800'} rounded-lg p-2 text-white h-full w-16"
								>
									<i class="ra {l.enemy ? ' ra-monster-skull' : 'ra-player'} ra-lg"></i>
								</button>
								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-cycle ra-2x text-green-500"></i>
									</label>
									<input
										type="text"
										bind:value={l.init}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>
								<div class="flex flex-col w-56 pl-3 gap-3">
									<label for=""> Nome </label>
									<input
										type="text"
										placeholder="Nome"
										bind:value={l.name}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										use:init
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>

								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-sword ra-2x text-green-500"></i>
									</label>
									<input
										type="text"
										bind:value={l.damage_given}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>

								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-sword ra-2x text-red-500"></i>
									</label>
									<input
										type="text"
										bind:value={l.damage_taken}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>
								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-level-three-advanced ra-2x text-green-500"></i>
									</label>
									<input
										type="text"
										bind:value={l.heal_given}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>
								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-health-increase ra-2x text-green-500"></i>
									</label>
									<input
										type="text"
										bind:value={l.heal_taken}
										on:blur={($e) => handleBlur($e, i)}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>
								<div class="flex flex-col w-14 text-center gap-2">
									<label for="">
										<i class="ra ra-health ra-2x"></i>
									</label>
									<input
										type="text"
										bind:value={l.hp}
										on:keyup={($e) => handleKeyup($e, i)}
										class="border border-b-2 border-r-2 rounded"
									/>
								</div>
							</div>

							<hr class="my-2" />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
