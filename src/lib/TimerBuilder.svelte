<script lang="ts">
	import SaveButton from './SaveButton.svelte';
	import TimerBlock from './TimerBlock.svelte';
	import { rootTimer } from '$lib/stores/timers';
	import type { Timer } from '$lib/types/timer';
	import { secondsToHMS } from '$lib/utils';

	export let editable = true;

	$: totalDuration = calculateTotalTime($rootTimer);

	function calculateTotalTime(timer: Timer) {
		let totalTime = 0;

		// Parse the timer's duration and convert to seconds, defaulting to 0 if empty
		const durationInSeconds = timer?.duration ? timer.duration : 0;

		// Multiply by repetitions, defaulting to 1 if repetitions is not set or invalid
		const repetitions = timer?.repetitions && timer.repetitions > 1 ? timer.repetitions : 1;
		totalTime += durationInSeconds * repetitions;

		// Recursively add time for each sub-timer
		if (Array.isArray(timer?.timers) && timer.timers.length > 0) {
			timer.timers.forEach((subTimer) => {
				totalTime += calculateTotalTime(subTimer) * repetitions;
			});
		}

		return totalTime;
	}
</script>

<div style="width: 95%">
	<TimerBlock bind:timer={$rootTimer} bind:editable />
	<div class="timer-info">
		Total Duration: <span id="totalDuration">{secondsToHMS(totalDuration)}</span>
	</div>
	<SaveButton />
	<div id="errorMessage" style="color: red; margin-top: 5px;"></div>
</div>

<style>
	.timer-info {
		font-size: 18px;
	}
</style>
