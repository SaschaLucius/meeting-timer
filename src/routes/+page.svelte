<script lang="ts">
	import NotificationManager from '$lib/notificationManager.js';
	import NoSleep from '$lib/NoSleep.svelte';
	import TimerBuilder from '$lib/TimerBuilder.svelte';
	import TimerDisplay from '$lib/TimerDisplay.svelte';
	import Log from '$lib/Log.svelte';
	import { onMount } from 'svelte';
	import TimerSector from '$lib/TimerSector.svelte';
	import { rootTimer } from '$lib/stores/timers';
	import { page } from '$app/state';
	import { building } from '$app/environment';
	import type { Timer } from '$lib/types/timer';

	const NOTIFICATION_MANAGER = new NotificationManager();

	let globalStartTime: number | null = null; // Global variable to store the start time
	let noSleepEnabled = false;
	let timerDisplay: TimerDisplay;
	let log: Log | undefined = undefined; // stays undefined if debugMode is false
	let hideElements = false;
	let debugMode = building ? true : page.url.searchParams.has('debug');
	let buttonText = '\u23F8\uFE0E';

	// ####### TIMER_WORKER #######

	let TIMER_WORKER: Worker;

	onMount(async () => {
		// must be "async" because of the dynamic import. see "await import" below
		if (window.Worker) {
			// "window" is available because we're in "onMount"
			// Vite dyn import: https://vitejs.dev/guide/assets.html#importing-script-as-a-worker
			const MyWorker = await import('$lib/timeWorker.js?worker');
			TIMER_WORKER = new MyWorker.default();

			TIMER_WORKER.onmessage = function (event) {
				console.log('Main: Message received from worker:', event.data);
				const { type, isPaused } = event.data;
				switch (type) {
					case 'updateDisplay':
						timerDisplay.updateDisplay(event.data);
						break;
					case 'togglePauseResume':
						buttonText = isPaused ? '\u25B6\uFE0E' : '\u23F8\uFE0E';
						break;
					case 'logEvent':
						log?.logEvent(event.data.message, event.data.time);
						break;
					default:
						console.warn('Main: Unhandled message recieved:', event.data);
				}
			};
		}
	});

	function togglePauseResume() {
		TIMER_WORKER.postMessage({ command: 'togglePauseResume' });
	}

	function cancelTimer() {
		TIMER_WORKER.postMessage({ command: 'cancel' });
	}

	function addOneMinute() {
		TIMER_WORKER.postMessage({ command: 'addTime', seconds: 60 }); // Adds 60 seconds (1 minute)
	}

	async function startTimer(timer: Timer) {
		TIMER_WORKER.postMessage({ command: 'startTimer', timer });
		// Wait for the timer to complete
		await new Promise<void>((resolve) => {
			const handleMessage = (event: MessageEvent) => {
				if (event.data.type === 'completed') {
					TIMER_WORKER.removeEventListener('message', handleMessage);
					resolve();
				}
			};
			TIMER_WORKER.addEventListener('message', handleMessage);
		});

		log?.logEvent(`Timer '${name}' completed!`);
	}

	// ####### Start Button Handler #######

	async function onclickStartTimer() {
		await NOTIFICATION_MANAGER.requestNotificationPermission();
		noSleepEnabled = true;
		hideElements = true;
		startGlobalTimer();
		await startTimer($rootTimer);
		endGlobalTimer();
		let audio = new Audio('finish.mp3');
		await new Promise<void>((res) => {
			audio.play();
			audio.onended = () => {
				res();
			};
		});
		alert(`The timer "${$rootTimer.name}" has finished!`);
		hideElements = false;
		noSleepEnabled = false;
		timerDisplay?.resetDisplay();
	}

	// ####### Global Timer Functions #######

	function startGlobalTimer() {
		globalStartTime = Date.now(); // Start the global timer
	}

	function endGlobalTimer() {
		if (globalStartTime !== null) {
			const elapsedTime = Math.floor((Date.now() - globalStartTime) / 1000); // Calculate elapsed time in seconds
			log?.logEvent(`Total time elapsed: ${elapsedTime} seconds.`);
			globalStartTime = null; // Reset the global timer
		}
	}
</script>

<NoSleep bind:enabled={noSleepEnabled} />

<div class="container">
	{#if !hideElements}
		<h1>Flow Timer</h1>

		<div class="container">
			<div>
				<TimerSector />
				<br />
				<br />
				<button
					onclick={() => onclickStartTimer()}
					style="width: 100%; height: 50px; font-size: 2em;">Start</button
				>
			</div>

			<TimerBuilder />

			<br />
		</div>
	{:else}
		<TimerDisplay bind:this={timerDisplay}></TimerDisplay>

		<div>
			<button type="button" onclick={() => togglePauseResume()}>{buttonText}</button>
			<button type="button" onclick={() => cancelTimer()}>{'\u23ED'}</button>
			<button type="button" onclick={() => addOneMinute()}>+1:00</button>
		</div>
	{/if}

	{#if debugMode}
		<h2>Log</h2>
		<Log bind:this={log}></Log>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 1024px;
		min-width: 360px;
		min-height: 300px;
		margin: auto;
	}
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
