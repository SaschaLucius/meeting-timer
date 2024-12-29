<script lang="ts">
	import TimerBlock from './TimerBlock.svelte';

    interface Timer {
		name: string;
		duration?: number;
		repetitions?: number;
		timers?: Timer[];
		description?: string;
	}

    export let editable = true;

    export let timer: Timer = { name: 'Timer', timers: [] };

	$: totalDuration = calculateTotalTime(timer);

	// Converts total seconds to HH:mm:ss format
	function secondsToHMS(totalSeconds: number | undefined): string {
		if (totalSeconds === undefined) return '';
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		// Format each unit to be two digits
		return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
	}

	function calculateTotalTime(timer: Timer) {
		let totalTime = 0;

		// Parse the timer's duration and convert to seconds, defaulting to 0 if empty
		const durationInSeconds = timer.duration ? timer.duration : 0;

		// Multiply by repetitions, defaulting to 1 if repetitions is not set or invalid
		const repetitions = timer.repetitions && timer.repetitions > 1 ? timer.repetitions : 1;
		totalTime += durationInSeconds * repetitions;

		// Recursively add time for each sub-timer
		if (Array.isArray(timer.timers) && timer.timers.length > 0) {
			timer.timers.forEach((subTimer) => {
				totalTime += calculateTotalTime(subTimer) * repetitions;
			});
		}

		return totalTime;
	}

	function saveTimer() {
		const cleanedRoot = cleanUpTimer(timer);
		const savedTimers = JSON.parse(localStorage.getItem('savedTimers') + '') || {};

		if (savedTimers[cleanedRoot.name]) {
			if (!confirm(`Timer '${cleanedRoot.name}' already exists. Do you want to overwrite it?`)) {
				return; // Exit if the user declines to overwrite
			}
		}

		savedTimers[cleanedRoot.name] = cleanedRoot;
		localStorage.setItem('savedTimers', JSON.stringify(savedTimers));

		// Select the newly saved timer in the selection
		// const selectBox = document.getElementById('liberatingStructureSelect');
		// TODO selectBox.value = cleanedRoot.name;
	}

	function cleanUpTimer(timer: Timer): Timer {
		const cleanedTimer: Timer = { name: timer.name };

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

<div>
	<TimerBlock bind:timer bind:editable={editable} />
	<div class="timer-info">
		Total Duration: <span id="totalDuration">{secondsToHMS(totalDuration)}</span>
	</div>
	<button onclick={() => saveTimer()}>Save</button>
	<div id="errorMessage" style="color: red; margin-top: 5px;"></div>
</div>

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
	.timer-info {
		font-size: 18px;
	}
</style>
