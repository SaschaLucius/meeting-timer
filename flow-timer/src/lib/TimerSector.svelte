<script>
	import TIMER_DEFINITIONS from '$lib/timerDefinitions';
	import { onMount } from 'svelte';

	// Populate the select box with options from liberatingStructures

	export let rootTimer = {};
    let selectElement;

	onMount(() => {
		updatePredefinedTimers();
        showSelectedTimer();
	});

	function showSelectedTimer() {
		const selectedStructureKey = selectElement.value;
		const selectedStructure =
			TIMER_DEFINITIONS[selectedStructureKey] ||
			JSON.parse(localStorage.getItem('savedTimers'))[selectedStructureKey];
		const errorMessageElement = document.getElementById('errorMessage');

		try {
			if (selectedStructure && selectedStructure.timer) {
				rootTimer = selectedStructure.timer;
			} else {
				rootTimer = selectedStructure;
			}
			//renderTimers(rootTimer, document.getElementById('timerBuilder'));
			errorMessageElement.innerText = ''; // Clear any previous error message
		} catch (error) {
			errorMessageElement.innerText = 'Invalid JSON structure. Please try again. ' + error.message;
			console.error('JSON Parse Error:', error);
		}
	}

	// ####### Timer Selection #######

	function updatePredefinedTimers() {
		selectElement.innerHTML = ''; // Clear existing options

        // Combine predefined timers and saved timers into one array
        const combinedTimers = [];

        // Add predefined timers from TIMER_DEFINITIONS
        for (const key in TIMER_DEFINITIONS) {
            combinedTimers.push({
                key,
                name: TIMER_DEFINITIONS[key].name,
                prefix: '\u23F1' // Clock emoji
            });
        }

        // Add saved timers from local storage
        const savedTimers = JSON.parse(localStorage.getItem('savedTimers')) || {};
        for (const key in savedTimers) {
            combinedTimers.push({
                key,
                name: savedTimers[key].name,
                prefix: '\u270F' // Pencil emoji
            });
        }

        // Sort combined timers by key
        combinedTimers.sort((a, b) => a.key.localeCompare(b.key));

        // Add sorted timers to selectElement
        for (const timer of combinedTimers) {
            const option = document.createElement('option');
            option.value = timer.key;
            option.textContent = `${timer.prefix}: ${timer.name}`;
            selectElement.appendChild(option);
        }
	}
</script>

<label for="liberatingStructureSelect">Timer:</label>
<select id="liberatingStructureSelect" bind:this={selectElement} onchange={showSelectedTimer}> </select>

<style>
</style>
