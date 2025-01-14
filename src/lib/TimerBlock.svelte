<script lang="ts">
	import Self from './TimerBlock.svelte';
	import type { Timer } from '$lib/types/timer';
	import { getSubTimer } from '$lib/types/timer';
	import { hmsToSeconds, secondsToHMS } from '$lib/utils';

	export let timer: Timer;
	export let depth = 0;
	export let editable = true;

	let isHidden = false;

	export let deleteMyself = () => {
		timer.name = '';
		timer.duration = undefined;
		timer.repetitions = undefined;
		timer.description = '';
		timer.timers = [];
	};

	function addSubTimer() {
		if (timer.timers) {
			timer.timers.push(getSubTimer(timer.duration));
		} else {
			timer.timers = [getSubTimer(timer.duration)];
		}
		timer.duration = undefined;
	}

	function calculateBackgroundColor(depth: number): string {
		const startColor = [249, 249, 249]; // RGB for #f9f9f9
		const endColor = [149, 149, 149]; // RGB for a darker shade

		const factor = Math.min(depth / 5, 1); // Ensure factor doesn't exceed 1

		const newColor = startColor.map((start, index) => {
			const end = endColor[index];
			return Math.round(start + factor * (end - start));
		});

		return `rgb(${newColor.join(', ')})`;
	}
</script>

<div class="timer-block" style="background-color: {calculateBackgroundColor(depth)};">
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
		{#if timer?.timers === undefined || timer.timers.length === 0}
			<input
				placeholder="Duration in HH:mm:ss"
				title={secondsToHMS(timer?.duration)}
				value={secondsToHMS(timer?.duration)}
				onblur={(event) =>
					(timer.duration = hmsToSeconds((event.target as HTMLInputElement)?.value))}
				style="width: 25%;"
			/>
		{/if}
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
							depth={depth + 1}
							deleteMyself={() => {
								const deleted = timer.timers?.splice(i, 1);
								timer.timers = timer.timers;
								if (timer.timers?.length === 0 && deleted !== undefined && deleted.length > 0) {
									timer.duration = deleted[0].duration;
								}
							}}
							{editable}
						></Self>
					</div>
				{/each}
			{/if}
		</div>
		{#if editable && !isHidden}
			<button title="Add Child Block" onclick={addSubTimer}>+</button>
		{/if}
		{#if timer?.timers !== undefined && timer.timers.length > 0}
			<button onclick={() => (isHidden = !isHidden)}>
				{isHidden ? `Show (${timer.timers?.length || 0})` : 'Hide'}
			</button>
		{/if}
	{/if}
</div>

<style>
	.timer-block {
		border: 1px solid #ccc;
		padding: 8px;
		margin: 2px 0;
		border-radius: 8px;
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
		margin: 4px 4px;
		padding: 8px;
		border: 1px solid rgb(204, 204, 204);
		border-radius: 4px;
		font-size: 14px;
	}
	.timer-block .timer-list {
		margin-top: 8px;
		padding-left: 24px;
		border-left: 2px solid rgb(221, 221, 221);
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
