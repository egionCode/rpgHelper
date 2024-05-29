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
	<div class="rpgui-container framed w-full h-full lg:w-2/3 lg:h-2/3">
		<div class="flex flex-row">
			<div class="flex flex-col w-full">
				<span>Rodadas</span>
				<div class="flex flex-col">
					<div class="flex flex-row justify-center items-center gap-20">
						<button class="rpgui-button" on:click={prevLog}>
							<i class="material-symbols-rounded"> chevron_left </i>
						</button>
						<span>Rodada {rodada}</span>
						<button class="rpgui-button" on:click={nextLog}>
							<i class="material-symbols-rounded"> chevron_right </i>
						</button>
					</div>
					<table>
						{#each logs as log}
							<tr>
								<td>
									<input
										type="text"
										placeholder="nome"
										bind:value={log.name}
										on:keyup={handleKeyup}
										use:init
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
								<td>
									<input
										type="text"
										placeholder="Dano Recebido"
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
								<td>
									<input
										type="text"
										placeholder="Dano Causado"
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
								<td>
									<input
										type="text"
										placeholder="Cura Recebida"
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
								<td>
									<input
										type="text"
										placeholder="Cura Realizada"
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
								<td>
									<input
										type="text"
										bind:value={log.vida}
										placeholder="Vida"
										class="border border-b-2 border-r-2 rounded"
									/>
								</td>
							</tr>
						{/each}
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
