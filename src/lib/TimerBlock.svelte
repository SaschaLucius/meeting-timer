<script lang="ts">
	import Self from './TimerBlock.svelte';
	import type { Timer } from '$lib/types/timer';
	import { getSubTimer } from '$lib/types/timer';
	import { hmsToSeconds, secondsToHMS } from '$lib/utils';

	export let timer: Timer;

	let isHidden = false;

	export let editable = true;

	function addSubTimer() {
		timer.duration = undefined;
		if (timer.timers) {
			timer.timers.push(getSubTimer(timer.duration));
		} else {
			timer.timers = [getSubTimer(timer.duration)];
		}
	}

	export let deleteMyself = () => {};
</script>

<div class="timer-block">
	{#if timer}
		{#if editable}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span
				class="delete-button"
				title={timer?.timers?.length ? 'Delete Block and all Child Blocks' : 'Delete Block'}
				onclick={deleteMyself}>×</span
			>
		{/if}
		<input placeholder="Name" bind:value={timer.name} required style="width: 25%;" />
		<input
			placeholder="Duration in HH:mm:ss"
			title={secondsToHMS(timer?.duration)}
			value={secondsToHMS(timer?.duration)}
			onblur={(event) => (timer.duration = hmsToSeconds((event.target as HTMLInputElement)?.value))}
			disabled={timer?.timers !== undefined && timer.timers.length > 0}
			style="width: 25%;"
		/>
		<input
			placeholder="Repetitions"
			type="number"
			min="1"
			title={timer.repetitions ? timer.repetitions + '' : ''}
			bind:value={timer.repetitions}
			style="width: 25%;"
		/>
		<input
			placeholder="Description"
			title={timer.description ? timer.description + '' : ''}
			bind:value={timer.description}
			style="width: calc(75% + 60px);"
		/>
		<div class="timer-list">
			<!-- Sub-timers will be nested here -->
			{#if !isHidden && timer !== undefined && timer.timers !== undefined && timer.timers.length > 0}
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
			<button title="Add Child Block" onclick={addSubTimer}>+</button>
		{/if}
		<button
			onclick={() => (isHidden = !isHidden)}
			disabled={timer?.timers === undefined || timer.timers.length === 0}
		>
			{isHidden ? `Show (${timer.timers?.length || 0})` : 'Hide'}
		</button>
	{/if}
</div>

<style>
	.timer-block {
		border: 1px solid #ccc;
		padding: 8px;
		margin: 16px 0;
		border-radius: 8px;
		background-color: #f9f9f9;
		width: 95%;
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
	.timer-block button:disabled {
		background-color: #ccc;
		border-color: #ccc;
		cursor: not-allowed;
	}
	.timer-block button:hover:not(:disabled) {
		background-color: #0056b3;
	}
</style>
