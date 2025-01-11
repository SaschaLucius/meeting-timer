<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getTimerDefinitions } from '$lib/timerDefinitions';
	import { rootTimer, currentTimer, savedTimers, defaultTimerName } from '$lib/stores/timers';
	import { deepEquals } from '$lib/types/timer';

	$: buttonLabel = $savedTimers[$rootTimer.name]
		? deepEquals($savedTimers[$rootTimer.name], $rootTimer)
			? 'Delete'
			: 'Overwrite'
		: 'Save Copy';

	function saveTimer() {
		if (!$rootTimer) {
			return;
		}
		if ($rootTimer.name === '') {
			alert(`Timer needs to have a name. Please change Name!`);
			return;
		}
		if (getTimerDefinitions()[$rootTimer.name]) {
			alert(`Predefined Timer '${$rootTimer.name}' already exists. Please change Name!`);
			return; // Exit
		}

		if ($savedTimers[$rootTimer.name]) {
			if (!confirm(`Timer '${$rootTimer.name}' already exists. Do you want to overwrite it?`)) {
				return; // Exit if the user declines to overwrite
			}
		}

		const temp = $savedTimers;
		temp[$rootTimer.name] = $rootTimer;
		$savedTimers = temp;
		$currentTimer = $rootTimer.name;
	}

	function deleteTimer() {
		if ($rootTimer && $savedTimers[$rootTimer.name]) {
			const temp = $savedTimers;
			delete temp[$rootTimer.name];
			$savedTimers = temp;
			$currentTimer = defaultTimerName;
		}
	}
</script>

<button on:click={() => (buttonLabel === 'Delete' ? deleteTimer() : saveTimer())}>
	{buttonLabel}
</button>

<style>
	button {
		padding: 10px 20px;
		margin: 5px;
		border: none;
		background-color: #007bff;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}
	button:hover {
		background-color: #0056b3;
	}
	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
	button {
		margin: 5px;
		padding: 5px 10px;
	}
</style>
