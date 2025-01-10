<script>
	import TIMER_DEFINITIONS from '$lib/timerDefinitions';
	import { onMount } from 'svelte';
	import { rootTimer, currentTimer, savedTimers as savedTimersStore } from '$lib/stores/timers';
	import { browser } from '$app/environment';

	// Populate the select box with options from liberatingStructures

	let value;

	onMount(() => {
		showSelectedTimer();
	});

	const predefinedTimers = [];
	for (const key in TIMER_DEFINITIONS) {
		predefinedTimers.push({
            ...TIMER_DEFINITIONS[key],
			prefix: '\u23F1' // Clock emoji
		});
	}

	$: savedTimers = Object.keys($savedTimersStore).map((key) => ({
		...$savedTimersStore[key],
		prefix: '\u270F' // Pencil emoji
	}));

	let combinedTimers = [];
	$: {
		combinedTimers = predefinedTimers
			.concat(savedTimers)
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((timer) => ({
				...timer,
				selected: timer.name === $currentTimer
			}));

		showSelectedTimer();
	}

	function showSelectedTimer() {
		$currentTimer = value;
		const selectedStructure = TIMER_DEFINITIONS[value] || $savedTimersStore[value];
		//const errorMessageElement = document.getElementById('errorMessage');

		try {
			if (selectedStructure && selectedStructure.timer) {
				$rootTimer = selectedStructure.timer;
			} else {
				$rootTimer = selectedStructure;
			}
			//renderTimers(rootTimer, document.getElementById('timerBuilder'));
			//errorMessageElement.innerText = ''; // Clear any previous error message
		} catch (error) {
			//errorMessageElement.innerText = 'Invalid JSON structure. Please try again. ' + error.message;
			console.error('JSON Parse Error:', error);
		}
	}
</script>

<label for="liberatingStructureSelect">Timer:</label>
<select id="liberatingStructureSelect" bind:value onchange={showSelectedTimer}>
	{#each combinedTimers as timer}
		<option value={timer.name} key={timer.name} selected={timer.selected}>
			{timer.prefix}: {timer.name}
		</option>
	{/each}
</select>

<style>
</style>
