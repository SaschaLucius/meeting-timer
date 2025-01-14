class Timer {
	constructor() {
		/**
		 * Time left in milliseconds
		 */
		this.timeLeft = 0;
		/**
		 * Tracks if the timer is running
		 */
		this.isRunning = false;
		/**
		 * Tracks if the timer is paused
		 */
		this.isPaused = false;
		/**
		 * Tracks the start time in milliseconds
		 */
		this.startTime = null;
		/**
		 * Tracks the elapsed time in milliseconds
		 */
		this.elapsedTime = 0;

		/**
		 * Tracks the seconds for the timer
		 */
		this.seconds = 0;
	}

	/**
	 * Helper function to create a delay
	 * @param {*} ms amount of delay in milliseconds
	 * @returns
	 */
	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Starts the timer with the specified number of seconds
	 * @param {*} seconds number of seconds to run the timer
	 * @returns
	 */
	async start(seconds) {
		if (this.isRunning) return; // Prevent starting multiple intervals
		this.timeLeft = seconds * 1000;
		this.isRunning = true;
		this.isPaused = false;
		this.startTime = Date.now(); // Adjust start time if resumed
		this.seconds = seconds;

		while (this.timeLeft > 0 && this.isRunning) {
			// Check if the timer is paused and wait until it's unpaused
			while (this.isPaused) {
				await this.delay(100); // Small delay to avoid tight loop
				if (this.timeLeft <= 0) {
					this.completeTimer();
					return;
				}
			}

			// Calculate remaining time
			this.timeLeft = this.seconds * 1000 - (Date.now() - this.startTime);

			// Calculate time for the next update based on the remaining time
			const nextUpdateTime = Math.min(1000, this.timeLeft); // Update in 1s increments or less if close to 0

			postUpdateDisplay({ time: Math.ceil(this.timeLeft / 1000) }); // Update the display
			await this.delay(nextUpdateTime); // Wait for delay
		}

		if (this.timeLeft <= 0) {
			this.completeTimer();
		}
	}

	// Handles natural timer completion
	completeTimer() {
		this.isRunning = false;
		this.elapsedTime = 0;
		postMessage({ type: 'stepCompleted' }); // Send completed message
		postUpdateDisplay({ time: 0 });
	}

	// Cancels the timer and resets the time
	cancel() {
		this.isRunning = false;
		this.isPaused = false;
		this.timeLeft = 0;
		this.elapsedTime = 0;
		postUpdateDisplay({ time: 0 });
		postTogglePauseResume(false);
	}

	// Adds seconds to the current timer time
	addTime(seconds) {
		if (this.isRunning) {
			this.seconds += seconds;
			this.timeLeft += seconds * 1000;
			postUpdateDisplay({ time: Math.ceil(this.timeLeft / 1000) }); // Update the display
		}
	}

	// Toggles the pause/resume state and sends the updated state back to the main thread
	togglePauseResume() {
		if (this.isRunning) {
			if (this.isPaused) {
				this.startTime = Date.now() - this.elapsedTime; // Adjust start time when resuming
				this.elapsedTime = 0; // Reset elapsed time after manipulation of start time
				this.isPaused = false;
			} else {
				this.elapsedTime = Date.now() - this.startTime;
				this.isPaused = true;
			}

			postTogglePauseResume(this.isPaused);
		} else {
			postTogglePauseResume(false);
		}
	}
}

const TIMER_INSTANCE = new Timer();

function postUpdateDisplay({ name, time, repetitions, description }) {
	postMessage({ type: 'updateDisplay', name, time, repetitions, description });
}

function postTogglePauseResume(isPaused) {
	postMessage({ type: 'togglePauseResume', isPaused });
}

function postLogEvent(message) {
	const time = new Date();
	postMessage({ type: 'logEvent', message, time });
}

async function startTimer(timer, rootTimer = false) {
	const { name, repetitions, timers, duration } = timer;
	try {
		if (repetitions !== undefined && repetitions > 1) {
			postLogEvent(`Starting '${name}' (${repetitions} repetitions).`);
			for (let currentRep = repetitions; currentRep > 0; currentRep--) {
				postUpdateDisplay({ repetitions: currentRep - 1 });
				await startTimer({
					...timer,
					repetitions: undefined,
					name: `${name} (${repetitions - currentRep + 1}/${repetitions})`
				});
			}
			if (rootTimer) {
				postMessage({ type: 'completed' }); // Send completed message
				sendNotification(`All Timer for '${name}' completed!`);
			}
			return;
		}

		if (timers !== undefined && timers.length > 0) {
			await startSeriesOfTimers(timer);
		} else {
			if (duration) {
				await startSingleTimer(timer);
			} else {
				console.error('Timer without duration defined.');
			}
		}

		if (rootTimer) {
			postMessage({ type: 'completed' }); // Send completed message
			sendNotification(`All Timer for '${name}' completed!`);
		}
	} catch (error) {
		console.error('JSON Parse Error:', error);
	}
}

async function startSingleTimer(timer) {
	const { name, duration, description } = timer;

	postUpdateDisplay({ name, time: duration, description }); // Initial display update
	postLogEvent(`Starting '${name}' with ${duration}.`);

	// Wait for the timer to complete
	await TIMER_INSTANCE.start(duration);
	sendNotification(`Timer '${name}' completed!`);
	postLogEvent(`Timer '${name}' completed!`);
}

async function startSeriesOfTimers(timer) {
	const { name, timers } = timer;
	postLogEvent(`Starting series '${name}'.`);
	for (let i = 0; i < timers.length; i++) {
		await startTimer(timers[i]);
	}
	postLogEvent(`Series '${name}' completed!`);
}

function sendNotification(message) {
	if (Notification.permission === 'granted') {
		new Notification(message);
	}
}

onmessage = function (event) {
	console.log('Worker: Command received from Main:', event.data);
	const { command, seconds, timer } = event.data;
	switch (command) {
		case 'cancel':
			TIMER_INSTANCE.cancel();
			break;
		case 'addTime':
			TIMER_INSTANCE.addTime(seconds);
			break;
		case 'togglePauseResume':
			TIMER_INSTANCE.togglePauseResume();
			break;
		case 'startTimer':
			startTimer(timer, true);
			break;
		default:
			console.warn('Worker: Unhandled command received:', command);
			break;
	}
};
