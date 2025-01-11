<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getTimerDefinitions } from '$lib/timerDefinitions';
	import { rootTimer, currentTimer, savedTimers, defaultTimerName } from '$lib/stores/timers';

	$: buttonLabel = $savedTimers[$rootTimer.name] ? deepEquals($savedTimers[$rootTimer.name], $rootTimer)? 'Delete' : 'Overwrite' : 'Save';

	function deepEquals(arg1, arg2) {
		console.log('deepEquals', arg1, arg2);
		if (arg1.name !== arg2.name) {
			return false;
		}
		if (arg1.duration !== arg2.duration) {
			return false;
		}
		if (arg1.repetitions !== arg2.repetitions) {
			return false;
		}
		if (arg1.description !== arg2.description) {
			return false;
		}
		if (arg1.timers?.length !== arg2.timers?.length) {
			return false;
		}
		for (let i = 0; i < (arg1.timers?.length || 0); i++) {
			if (!deepEquals(arg1.timers[i], arg2.timers[i])) {
				return false;
			}
		}
		console.log('true');
		return true;
	}

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
		buttonLabel = 'Delete';
	}

	function deleteTimer() {
		if ($rootTimer && $savedTimers[$rootTimer.name]) {
			const temp = $savedTimers;
			delete temp[$rootTimer.name];
			$savedTimers = temp;
			$currentTimer = defaultTimerName;
			buttonLabel = 'Save';
		}
	}
</script>

<button
	on:click={() =>
		buttonLabel === 'Save' || buttonLabel === 'Overwrite' ? saveTimer() : deleteTimer()}
>
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
