<script lang="ts">
	import { secondsToHMS } from '$lib/utils';

	export let name: string = '-';
	export let time: number = 0; // in seconds
	export let repetitions: number = 0;
	export let description: string = '';

	export function resetDisplay() {
		name = '-';
		time = 0;
		repetitions = 0;
		description = '';
	}

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
		if (newName !== undefined && newName !== name) name = newName;
		if (newTime !== undefined && newTime !== time) time = newTime;
		if (newRepetions !== undefined && newRepetions !== repetitions) repetitions = newRepetions;
		if (newDescription !== undefined && newDescription !== description) description = newDescription;
	}
</script>

<div class="timer">
	<div class="timer-name"><span id="timerName">{name}</span></div>
	{#if description.length > 0}
		<div class="timer-description"><span id="timerDescription">{description}</span></div>
	{/if}
	<div class="remainingTime"><span>{secondsToHMS(time, true)}</span></div>
	{#if repetitions > 0}
		<div class="timer-info">Repetitions Left: <span id="repetitionsLeft">{repetitions}</span></div>
	{/if}
</div>

<style>
	.timer {
		margin: 10px;
		padding: 10px;
		text-align: center;
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		color: black;
	}
	.timer-name {
		font-size: 3em;
		word-wrap: break-word;
		text-align: center;
	}
	.remainingTime {
		font-size: 24vw;
		line-height: 85%;
	}
	.timer-description {
		word-wrap: break-word;
		text-align: center;
	}
	.timer-info {
		font-size: 18px;
	}
</style>
