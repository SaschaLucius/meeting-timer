<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {getTimerDefinitions} from '$lib/timerDefinitions';
    import { rootTimer, currentTimer, savedTimers, defaultTimerName } from '$lib/stores/timers';

	$: {
		if (browser && $rootTimer) {
			if ($savedTimers[$rootTimer.name]) {
				if (deepCompare($savedTimers[$rootTimer.name], $rootTimer)) {
					buttonLabel = 'Delete';
				} else {
					buttonLabel = 'Overwrite';
				}
			} else {
				buttonLabel = 'Save';
			}
		}
	}

	function deepCompare(arg1, arg2) {
		// false if not equals otherwise true
		if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)) {
			if (
				Object.prototype.toString.call(arg1) === '[object Object]' ||
				Object.prototype.toString.call(arg1) === '[object Array]'
			) {
				if (Object.keys(arg1).length !== Object.keys(arg2).length) {
					return false;
				}
				return Object.keys(arg1).every(function (key) {
					return deepCompare(arg1[key], arg2[key]);
				});
			}
			return arg1 === arg2;
		}
		return false;
	}

	let buttonLabel = 'Save';

	function saveTimer() {
        if(!$rootTimer){
            return;
        }
        if (getTimerDefinitions()[$rootTimer.name]) {
			confirm(`Predefined Timer '${$rootTimer.name}' already exists. Please change Name!`);
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
