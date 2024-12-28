<script lang="ts">
	import Self from './TimerBlock.svelte';

	interface Timer {
		name: string;
		duration?: number;
		repetitions?: number;
		timers?: Timer[] | undefined;
		description?: string;
	}
	export let timer: Timer = {
		name: '',
		duration: undefined,
		repetitions: undefined,
		timers: [],
		description: ''
	};

	export let editable = true;

	// Converts HH:mm:ss, mm:ss, or ss format to total seconds
	function hmsToSeconds(hms: string | undefined): number | undefined {
		if (hms === undefined) {
			return undefined;
		}
		if (typeof hms === 'number') {
			return hms;
		}
		const parts = hms.split(':').map(Number); // Convert each part to a number
		let totalSeconds = 0;

		if (parts.length === 3) {
			// HH:mm:ss format
			const [hours, minutes, seconds] = parts;
			totalSeconds = hours * 3600 + minutes * 60 + seconds;
		} else if (parts.length === 2) {
			// MM:SS format
			const [minutes, seconds] = parts;
			totalSeconds = minutes * 60 + seconds;
		} else if (parts.length === 1) {
			// SS format
			totalSeconds = parts[0];
		}

		return totalSeconds;
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

	function addSubTimer() {
		const subTimer = {
			name: '',
			duration: timer.duration,
			repetitions: undefined,
			timers: [],
			description: ''
		};
		timer.duration = undefined;
		if (timer.timers) {
			timer.timers.push(subTimer);
		} else {
			timer.timers = [subTimer];
		}
	}

	export let deleteMyself = () => {};
</script>

<div class="timer-block">
	{#if editable}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span class="delete-button" onclick={deleteMyself}>×</span>
	{/if}
	<input placeholder="Name" bind:value={timer.name} required style="width: 25%;" />
	<input
		placeholder="Duration in HH:mm:ss"
		value={secondsToHMS(timer.duration)}
		onblur={(event) => (timer.duration = hmsToSeconds((event.target as HTMLInputElement)?.value))}
		disabled={timer.timers !== undefined && timer.timers.length > 0}
		style="width: 25%;"
	/>
	<input
		placeholder="Repetitions"
		type="number"
		min="1"
		bind:value={timer.repetitions}
		style="width: 25%;"
	/>
	<input
		placeholder="Description"
		bind:value={timer.description}
		style="width: calc(75% + 48px);"
	/>
	<div class="timer-list">
		<!-- Sub-timers will be nested here -->
		{#if timer.timers !== undefined && timer.timers.length > 0}
			{#each timer.timers as item, i}
				<div class="sub-timer">
					<Self
						bind:timer={timer.timers[i]}
						deleteMyself={() => {
							timer.timers?.splice(i, 1);
							timer.timers = timer.timers;
						}}
						{editable}
					></Self>
				</div>
			{/each}
		{/if}
	</div>
	{#if editable}
		<button onclick={addSubTimer}>+</button>
	{/if}
	<button>Hide</button>
</div>

<style>
	.timer-block {
		border: 1px solid #ccc;
		padding: 16px;
		margin: 16px 0;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	.delete-button {
		color: red;
		font-weight: bold;
		cursor: pointer;
		float: right;
		margin-left: 8px;
	}

	.timer-block input {
		display: inline-block;
		margin: 8px 4px;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
	}

	.timer-block .timer-list {
		margin-top: 16px;
		padding-left: 16px;
		border-left: 2px solid #ddd;
	}

	.timer-block .sub-timer {
		margin-bottom: 16px;
	}

	.timer-block button {
		margin: 8px 4px;
		padding: 8px 12px;
		font-size: 14px;
		border: 1px solid #007bff;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
	}

	.timer-block button:hover {
		background-color: #0056b3;
	}
</style>
