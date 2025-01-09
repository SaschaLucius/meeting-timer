<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import TIMER_DEFINITIONS from '$lib/timerDefinitions';
	export let timer;

	$: {
		if (browser) {
			const cleanedRoot = cleanUpTimer(timer);
			const savedTimers = JSON.parse(localStorage.getItem('savedTimers') + '') || {};
			if (savedTimers[cleanedRoot.name]) {
				if (deepCompare(savedTimers[cleanedRoot.name], cleanedRoot)) {
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
		const cleanedRoot = cleanUpTimer(timer);

		if (TIMER_DEFINITIONS[cleanedRoot.name]) {
			confirm(`Predefined Timer '${cleanedRoot.name}' already exists. Please change Name!`);
			return; // Exit if the user declines to overwrite
		}

		const savedTimers = JSON.parse(localStorage.getItem('savedTimers') + '') || {};

		if (savedTimers[cleanedRoot.name]) {
			if (!confirm(`Timer '${cleanedRoot.name}' already exists. Do you want to overwrite it?`)) {
				return; // Exit if the user declines to overwrite
			}
		}

		savedTimers[cleanedRoot.name] = cleanedRoot;
		localStorage.setItem('savedTimers', JSON.stringify(savedTimers));
		buttonLabel = 'Delete';
	}

	function deleteTimer() {
		const cleanedRoot = cleanUpTimer(timer);
		const savedTimers = JSON.parse(localStorage.getItem('savedTimers') + '') || {};

		if (savedTimers[cleanedRoot.name]) {
			delete savedTimers[cleanedRoot.name];
			localStorage.setItem('savedTimers', JSON.stringify(savedTimers));
			buttonLabel = 'Save';
		}
	}

	function cleanUpTimer(timer) {
		const cleanedTimer = { name: timer.name };

		if (timer.duration && timer.timers && timer.timers.length > 0) {
			console.log(`${timer.name} cannot have both duration and sub-timers together`);
			delete timer.duration;
		}
		if (timer.duration) cleanedTimer.duration = timer.duration;
		if (timer.repetitions && Number(timer.repetitions) > 1)
			cleanedTimer.repetitions = timer.repetitions;
		if (timer.description) cleanedTimer.description = timer.description;

		if (timer.timers && timer.timers.length > 0) {
			cleanedTimer.timers = timer.timers.map(cleanUpTimer);
		}

		return cleanedTimer;
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
