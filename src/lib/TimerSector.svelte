<script lang="ts">
	import { getTimerDefinitions } from '$lib/timerDefinitions';
	import { onMount } from 'svelte';
	import { rootTimer, currentTimer, savedTimers as savedTimersStore } from '$lib/stores/timers';
	import type { Timer } from '$lib/types/timer';

	onMount(() => {
		showSelectedTimer();
	});

	let combinedTimers: (Timer & { prefix: string })[] = [];
	$: {
		const TIMER_DEFINITIONS = getTimerDefinitions();
		combinedTimers = Object.keys(TIMER_DEFINITIONS)
			.map((key) => ({
				...TIMER_DEFINITIONS[key],
				prefix: '\u23F1' // Clock emoji
			}))
			.concat(
				Object.keys($savedTimersStore).map((key) => ({
					...$savedTimersStore[key],
					prefix: '\u270F' // Pencil emoji
				}))
			)
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((timer) => ({
				...timer
			}));

		showSelectedTimer();
	}

	function showSelectedTimer() {
		const selectedStructure =
			getTimerDefinitions()[$currentTimer] || $savedTimersStore[$currentTimer];

		try {
			if (selectedStructure) {
				$rootTimer = structuredClone(selectedStructure);
			}
		} catch (error) {
			console.error('JSON Parse Error:', error);
		}
	}
</script>

<label for="select">Timer:</label>
<select id="select" bind:value={$currentTimer} onchange={showSelectedTimer}>
	{#each combinedTimers as timer}
		<option value={timer.name}>
			{timer.prefix}: {timer.name}
		</option>
	{/each}
</select>

<style>
</style>
