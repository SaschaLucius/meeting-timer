<script>
	import { getTimerDefinitions } from '$lib/timerDefinitions';
	import { onMount } from 'svelte';
	import { rootTimer, currentTimer, savedTimers as savedTimersStore } from '$lib/stores/timers';
	import { browser } from '$app/environment';

	onMount(() => {
		showSelectedTimer();
	});

	let combinedTimers = [];
	$: {
		console.log('savedTimersStore', $currentTimer);
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
		//const errorMessageElement = document.getElementById('errorMessage');

		try {
			if (selectedStructure && selectedStructure.timer) {
				$rootTimer = selectedStructure.timer;
			} else {
				$rootTimer = selectedStructure;
			}
			//errorMessageElement.innerText = ''; // Clear any previous error message
		} catch (error) {
			//errorMessageElement.innerText = 'Invalid JSON structure. Please try again. ' + error.message;
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
