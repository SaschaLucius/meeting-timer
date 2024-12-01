class Timer {
    constructor() {
        this.timeLeft = 0;            // Time left in milliseconds
        this.isRunning = false;       // Tracks if the timer is running
        this.isPaused = false;        // Tracks if the timer is paused
    }

    // Helper function to create a delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Starts the timer with the specified number of seconds
    async start(seconds) {
        if (this.isRunning) return;   // Prevent starting multiple intervals
        this.timeLeft = seconds * 1000;
        this.isRunning = true;
        this.isPaused = false;

        while (this.timeLeft > 0 && this.isRunning) {
            // Check if the timer is paused and wait until it's unpaused
            while (this.isPaused) {
                await this.delay(100); // Small delay to avoid tight loop
            }

            // Calculate time for the next update based on the remaining time
            const nextUpdateTime = Math.min(1000, this.timeLeft); // Update in 1s increments or less if close to 0
                
            postMessage({ type: 'updateDisplay', time: Math.ceil(this.timeLeft / 1000) }); // Update the display
            await this.delay(nextUpdateTime); // Wait for delay

            // Reduce the remaining time only if not paused
            if (!this.isPaused) {
                this.timeLeft -= nextUpdateTime;
            }
        }

        if (this.timeLeft <= 0) {
            postMessage({ type: 'updateDisplay', time: 0 });
            postMessage({ type: 'completed' }); // Send completed message
            this.isRunning = false;
        }
    }

    // Cancels the timer and resets the time
    cancel() {
        this.isRunning = false;
        this.isPaused = false;
        this.timeLeft = 0;
        postMessage({ type: 'updateDisplay', time: 0 });
    }

    // Adds seconds to the current timer time
    addTime(seconds) {
        this.timeLeft += seconds * 1000;
    }

    // Toggles the pause/resume state and sends the updated state back to the main thread
    togglePauseResume() {
        if (this.isRunning){
            this.isPaused = !this.isPaused;
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
