<script>
	import NotificationManager from '$lib/notificationManager.js';
	import NoSleep from '$lib/NoSleep.svelte';
	import TimerBuilder from '$lib/TimerBuilder.svelte';
	import TimerDisplay from '$lib/TimerDisplay.svelte';
	import Log from '$lib/Log.svelte';
	import { onMount } from 'svelte';
	import { showAlertBox } from '$lib/utils';
	import Bell from '$lib/Bell.svelte';
	import TimerSector from '$lib/TimerSector.svelte';
	import { rootTimer } from '$lib/stores/timers';

	const NOTIFICATION_MANAGER = new NotificationManager();

	let globalStartTime = null; // Global variable to store the start time
	let noSleepEnabled = false;
	let timerDisplay = undefined;
	let log = undefined;
	let bell = undefined;

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
						document.getElementById('pauseResumeButton').innerText = isPaused ? 'Resume' : 'Pause';
						break;
					case 'logEvent':
						log.logEvent(event.data.message, event.data.time);
						break;
					default:
						console.error('Main: Unhandled message recieved:', event.data);
				}
			};
		}
	});

	// ####### Helper Functions ########

	function toggleButtons(disable) {
		document.querySelectorAll('button').forEach((btn) => {
			const hasKeepEnabled = btn.hasAttribute('keepEnabled');
			if (!hasKeepEnabled) {
				btn.disabled = disable;
			}
		});
	}

	// ####### Button Handler #######

	async function onclickStartTimer() {
		await NOTIFICATION_MANAGER.requestNotificationPermission();
		startGlobalTimer();
		await startTimer($rootTimer);
		endGlobalTimer();
		showAlertBox($rootTimer.name);
		bell.play();
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

	function clearLog() {
		const logContent = document.getElementById('logContent');
		logContent.innerHTML = '';
	}

	// ####### Timer Functions #######

	function startGlobalTimer() {
		globalStartTime = Date.now(); // Start the global timer

		const hide = document.getElementById('toHide');
		hide.style.display = 'none';
		noSleepEnabled = true;

		toggleButtons(true); // Disable buttons at the start
		document.getElementById('timerControls').style.display = 'block'; // Show timer controls
	}

	function endGlobalTimer() {
		if (globalStartTime !== null) {
			const elapsedTime = Math.floor((Date.now() - globalStartTime) / 1000); // Calculate elapsed time in seconds
			log.logEvent(`Total time elapsed: ${elapsedTime} seconds.`);
			globalStartTime = null; // Reset the global timer

			const hide = document.getElementById('toHide');
			hide.style.display = 'flex';
			noSleepEnabled = false;

			toggleButtons(false); // Enable buttons at the end
			document.getElementById('timerControls').style.display = 'none'; // Hide timer controls
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

		log.logEvent(`Timer '${name}' completed!`);
	}

	// Initialize root timer UI
	//renderTimers(rootTimer, document.getElementById('timerBuilder'));
</script>

<NoSleep bind:enabled={noSleepEnabled} />
<Bell bind:this={bell} />

<div class="container">
	<h1>Flow Timer</h1>
	<TimerDisplay bind:this={timerDisplay}></TimerDisplay>

	<div class="container" id="toHide">
		<div>
			<TimerSector/>
			<button onclick={() => onclickStartTimer()}>Start</button>
		</div>

		<br />

		<TimerBuilder/>

		<br />
	</div>

	<div id="timerControls" style="display: none;">
		<button
			type="button"
			keepEnabled
			style="width: 80px;"
			id="pauseResumeButton"
			onclick={() => togglePauseResume()}>Pause</button
		>
		<button type="button" keepEnabled onclick={() => cancelTimer()}>Next</button>
		<button type="button" keepEnabled onclick={() => addOneMinute()}>Add 1 Minute</button>
	</div>

	<h2>Log</h2>
	<Log bind:this={log}></Log>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 720px;
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
