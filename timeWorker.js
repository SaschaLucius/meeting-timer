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
    }

    /**
     * Helper function to create a delay
     * @param {*} ms amount of delay in milliseconds
     * @returns 
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Starts the timer with the specified number of seconds
     * @param {*} seconds number of seconds to run the timer
     * @returns 
     */
    async start(seconds) {
        if (this.isRunning) return;   // Prevent starting multiple intervals
        this.timeLeft = seconds * 1000;
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = Date.now(); // Adjust start time if resumed

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
            this.timeLeft = seconds * 1000 - (Date.now() - this.startTime);

            // Calculate time for the next update based on the remaining time
            const nextUpdateTime = Math.min(1000, this.timeLeft); // Update in 1s increments or less if close to 0
                
            postMessage({ type: 'updateDisplay', time: Math.ceil(this.timeLeft / 1000) }); // Update the display
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
        postMessage({ type: 'updateDisplay', time: 0 });
        postMessage({ type: 'completed' }); // Send completed message
    }

    // Cancels the timer and resets the time
    cancel() {
        this.isRunning = false;
        this.isPaused = false;
        this.timeLeft = 0;
        this.elapsedTime = 0;
        postMessage({ type: 'updateDisplay', time: 0 });
        postMessage({ type: 'togglePauseResume', isPaused: false });
    }

    // Adds seconds to the current timer time
    addTime(seconds) {
        this.startTime += seconds * 1000; // Adjust start time to account for added time
        this.elapsedTime = currentTime - this.startTime;
        this.timeLeft = seconds * 1000 - this.elapsedTime;
        postMessage({ type: 'updateDisplay', time: Math.ceil(this.timeLeft / 1000) }); // Update the display
    }

    // Toggles the pause/resume state and sends the updated state back to the main thread
    togglePauseResume() {
        console.log('Timer', this.isRunning, this.isPaused);
        if (this.isRunning) {
            if(this.isPaused) {
                this.startTime = Date.now() - this.elapsedTime; // Adjust start time when resuming
                this.elapsedTime = 0; // Reset elapsed time after manipulation of start time
                this.isPaused = false;
            } else {
                this.elapsedTime = Date.now() - this.startTime;
                this.isPaused = true;
            }

            postMessage({ type: 'togglePauseResume', isPaused: this.isPaused });
        } else {
            postMessage({ type: 'togglePauseResume', isPaused: false });
        }
    }
}

const TIMER_INSTANCE = new Timer();

onmessage = function(event) {
    console.log('Worker: Command received from Main:', event.data);
    const { command, seconds } = event.data;
    switch (command) {
        case 'start':
            TIMER_INSTANCE.start(seconds);
            break;
        case 'cancel':
            TIMER_INSTANCE.cancel();
            break;
        case 'addTime':
            TIMER_INSTANCE.addTime(seconds);
            break;
        case 'togglePauseResume':
            TIMER_INSTANCE.togglePauseResume();
            break;
        default:
            console.error('Worker: Unhandled command received:', command);
            break;
    }
};
