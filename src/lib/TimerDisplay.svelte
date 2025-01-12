<script lang="ts">
	export let name: string = '-';
	export let time: number = 0; // in seconds
	export let repetitions: number = 0;
	export let description: string = '-';

	export function resetDisplay(){
		name = '-';
		time = 0;
		repetitions = 0;
		description = '-';
	};

	export function updateDisplay({
		name: newName,
		time: newTime,
		repetitions: newRepetions,
		description: newDescription
	}: {
		name: string;
		time: number;
		repetitions: number;
		description: string;
	}) {
		if (newName !== undefined) name = newName;
		if (newTime !== undefined) time = newTime;
		if (newRepetions !== undefined) repetitions = newRepetions;
		if (newDescription !== undefined) description = newDescription;
	}

	// Converts total seconds to HH:mm:ss format
	function secondsToHMS(totalSeconds: number | undefined): string {
		if (totalSeconds === undefined) return '';
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		// Format each unit to be two digits
		return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
	}
</script>

<div class="timer">
	<div class="timer-name"><span id="timerName">{name}</span></div>
	<div class="timer-description"><span id="timerDescription">{description}</span></div>
	<div class="timer-info">Remaining Time: <span id="remainingTime">{secondsToHMS(time)}</span></div>
	<div class="timer-info">Repetitions Left: <span id="repetitionsLeft">{repetitions}</span></div>
</div>

<style>
	.timer {
		margin-bottom: 20px;
		padding: 20px;
		text-align: center;
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.timer-name {
		font-size: 24px;
		word-wrap: break-word;
		text-align: center;
	}
	.timer-description {
		word-wrap: break-word;
		text-align: center;
	}
	.timer-info {
		font-size: 18px;
	}
</style>
