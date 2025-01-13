<script>
	import NotificationManager from '$lib/notificationManager.js';
	import NoSleep from '$lib/NoSleep.svelte';
	import TimerBuilder from '$lib/TimerBuilder.svelte';
	import TimerDisplay from '$lib/TimerDisplay.svelte';
	import Log from '$lib/Log.svelte';
	import { onMount } from 'svelte';
	import TimerSector from '$lib/TimerSector.svelte';
	import { rootTimer } from '$lib/stores/timers';
	import { page } from '$app/stores';
	import { building } from '$app/environment';

	const NOTIFICATION_MANAGER = new NotificationManager();

	let globalStartTime = null; // Global variable to store the start time
	let noSleepEnabled = false;
	let timerDisplay = undefined;
	let log = undefined;
	let hideElements = false;
	let debugMode = building ? true : $page.url.searchParams.has('debug');

	let TIMER_WORKER;
	onMount(async () => {
		// must be "async" because of the dynamic import. see "await import" below
		if (window.Worker) {
			// "window" is available because we're in "onMount"
			// Vite dyn import: https://vitejs.dev/guide/assets.html#importing-script-as-a-worker
			const MyWorker = await import('$lib/timeWorker.js?worker');
			TIMER_WORKER = new MyWorker.default();

			TIMER_WORKER.onmessage = function (event) {
				console.log('Main: Message received from worker:', event.data);
				const { type, time, isPaused } = event.data;
				switch (type) {
					case 'updateDisplay':
						timerDisplay.updateDisplay(event.data);
						break;
					case 'togglePauseResume':
						document.getElementById('pauseResumeButton').innerText = isPaused ? '\u23F5' : '\u23F8';
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

	// ####### Button Handler #######

	async function onclickStartTimer() {
		await NOTIFICATION_MANAGER.requestNotificationPermission();
		noSleepEnabled = true;
		hideElements = true;
		startGlobalTimer();
		await startTimer($rootTimer);
		endGlobalTimer();
		let audio = new Audio("finish.mp3")
		await new Promise(res=>{
			audio.play()
			audio.onended = () => {
				res();
			};
		});
		alert(`The timer "${$rootTimer.name}" has finished!`);
		hideElements = false;
		noSleepEnabled = false;
		timerDisplay.resetDisplay();
	}

	function togglePauseResume() {
		TIMER_WORKER.postMessage({ command: 'togglePauseResume' });
	}

	function cancelTimer() {
		TIMER_WORKER.postMessage({ command: 'cancel' });
	}

	function addOneMinute() {
		TIMER_WORKER.postMessage({ command: 'addTime', seconds: 60 }); // Adds 60 seconds (1 minute)
	}

	// ####### Timer Functions #######

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

	async function startTimer(timer) {
		TIMER_WORKER.postMessage({ command: 'startTimer', timer });
		// Wait for the timer to complete
		await new Promise((resolve) => {
			const handleMessage = (event) => {
				if (event.data.type === 'completed') {
					TIMER_WORKER.removeEventListener('message', handleMessage);
					resolve();
				}
			};
			TIMER_WORKER.addEventListener('message', handleMessage);
		});

		log?.logEvent(`Timer '${name}' completed!`);
	}

	// Initialize root timer UI
	//renderTimers(rootTimer, document.getElementById('timerBuilder'));
</script>

<NoSleep bind:enabled={noSleepEnabled} />

<div class="container">
	{#if !hideElements}
		<h1>Flow Timer</h1>

		<div class="container">
			<div>
				<TimerSector />
				<button onclick={() => onclickStartTimer()}>Start</button>
			</div>

			<br />

			<TimerBuilder />

			<br />
		</div>
	{:else}
		<TimerDisplay bind:this={timerDisplay}></TimerDisplay>

		<div>
			<button type="button" keepEnabled id="pauseResumeButton" onclick={() => togglePauseResume()}
				>{'\u23F8'}</button
			>
			<button type="button" keepEnabled onclick={() => cancelTimer()}>{'\u23ED'}</button>
			<button type="button" keepEnabled onclick={() => addOneMinute()}>+1:00</button>
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
