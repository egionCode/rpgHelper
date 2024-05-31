<script lang="ts">
	var rodadas = [
		[
			{
				name: 'arthas',
				vida: 10
			}
		],
		[{ name: 'arthas', vida: 12 }]
	];
	var logs = rodadas[0];
	var rodada = 0;
	function handleKeyup($e: any) {
		console.log($e);
		if ($e.key === 'Enter') {
			logs.push({});
			logs = logs;
		}
	}
	function nextLog() {
		if (rodada + 2 > rodadas.length) rodadas.push([{}]);
		rodada++;
		logs.push();
		logs = rodadas[rodada];
	}
	function prevLog() {
		if (rodada > 0) {
			rodada--;
			logs = rodadas[rodada];
		}
	}
	function init(el: any) {
		el.focus();
	}
</script>

<div class="flex flex-col h-screen justify-center items-center">
	<div class="rpgui-container framed w-full h-full overflow-auto">
		<div class="flex flex-row w-full gap-40">
			<div class="w-52">
				<a href="/" class="rpgui-button">
					<p>
						<span class="material-symbols-rounded"> chevron_left </span>
						Back
					</p>
				</a>
			</div>
			<div class="flex flex-row justify-start w-full items-center gap-20">
				<button class="rpgui-button" on:click={prevLog}>
					<i class="material-symbols-rounded"> chevron_left </i>
				</button>
				<span>Rodada {rodada}</span>
				<button class="rpgui-button" on:click={nextLog}>
					<i class="material-symbols-rounded"> chevron_right </i>
				</button>
			</div>
		</div>
		<div class="flex flex-row">
			<div class="flex flex-col w-full">
				<span>Rodadas</span>
				<div class="flex flex-col">
					{#each logs as log}
						<div class="w-full flex flex-row gap-2 px-1">
							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>

							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>

							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>

							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>

							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>

							<div class="flex flex-col">
								<label for="">Nome</label>
								<input
									type="text"
									placeholder="nome"
									bind:value={log.name}
									on:keyup={handleKeyup}
									use:init
									class="border border-b-2 border-r-2 rounded"
								/>
							</div>
						</div>

						<hr class="my-2" />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
