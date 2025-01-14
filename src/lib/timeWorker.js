/**
 * @typedef {Object} TimerType
 * @property {string} name - The name of the timer.
 * @property {number} [duration] - The duration of the timer in seconds (optional).
 * @property {number} [repetitions] - The number of repetitions (optional).
 * @property {TimerType[]} [timers] - A list of nested timers (optional).
 * @property {string} [description] - A description of the timer (optional).
 */

class Timer {
	constructor() {
		/**
		 * Time left in milliseconds
		 * @type {number}
		 */
		this.timeLeft = 0;
		/**
		 * Tracks if the timer is running
		 * @type {boolean}
		 */
		this.isRunning = false;
		/**
		 * Tracks if the timer is paused
		 * @type {boolean}
		 */
		this.isPaused = false;
		/**
		 * Tracks the start time in milliseconds
		 * @type {number}
		 */
		this.startTime = 0;
		/**
		 * Tracks the elapsed time in milliseconds
		 * @type {number}
		 */
		this.elapsedTime = 0;

		/**
		 * Tracks the seconds for the timer
		 * @type {number}
		 */
		this.seconds = 0;
	}

	/**
	 * Helper function to create a delay
	 * @param {number} ms amount of delay in milliseconds
	 * @returns
	 */
	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Starts the timer with the specified number of seconds
	 * @param {number} seconds number of seconds to run the timer
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

	/**
	 * Adds seconds to the current timer time
	 * @param {number} seconds
	 */
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

/**
 * Sends a message to update the display with the provided details.
 * @param {Object} params - The parameters for the update.
 * @param {string | undefined} [params.name] - The name to display.
 * @param {number | undefined} [params.time] - The time to display.
 * @param {number | undefined} [params.repetitions] - The number of repetitions to display.
 * @param {string | undefined} [params.description] - The description to display.
 */
function postUpdateDisplay({
	name = undefined,
	time = undefined,
	repetitions = undefined,
	description = undefined
}) {
	postMessage({ type: 'updateDisplay', name, time, repetitions, description });
}

/**
 * @param {boolean} isPaused
 */
function postTogglePauseResume(isPaused) {
	postMessage({ type: 'togglePauseResume', isPaused });
}

/**
 * @param {string} message
 */
function postLogEvent(message) {
	const time = new Date();
	postMessage({ type: 'logEvent', message, time });
}

/**
 * @param {TimerType} timer
 * @param {boolean} rootTimer
 * @returns
 */
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

/**
 * Starts a single timer and handles display updates, logging, and notifications.
 * @param {TimerType} timer - The timer object containing name, duration, and description.
 * @returns {Promise<void>} - A promise that resolves when the timer completes.
 */
async function startSingleTimer(timer) {
	const { name, duration, description } = timer;

	postUpdateDisplay({ name, time: duration, description }); // Initial display update
	postLogEvent(`Starting '${name}' with ${duration}.`);

	// Wait for the timer to complete
	await TIMER_INSTANCE.start(duration ?? 0);
	sendNotification(`Timer '${name}' completed!`);
	postLogEvent(`Timer '${name}' completed!`);
}

/**
 * Starts a series of timers sequentially.
 * @param {TimerType} timer - The timer object containing the series information.
 * @returns {Promise<void>} A promise that resolves when all timers in the series have completed.
 */
async function startSeriesOfTimers(timer) {
	const { name, timers } = timer;
	if (timers === undefined) {
		console.error('Timers not defined for series:', name);
		return;
	}
	postLogEvent(`Starting series '${name}'.`);
	for (let i = 0; i < timers.length; i++) {
		await startTimer(timers[i]);
	}
	postLogEvent(`Series '${name}' completed!`);
}

/**
 * @param {string} message
 */
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
