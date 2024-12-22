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

            postTogglePauseResume(this.isPaused);
        } else {
            postTogglePauseResume(false);
        }
    }
}

const TIMER_INSTANCE = new Timer();

// Converts HH:MM:SS, MM:SS, or SS format to total seconds
function hmsToSeconds(hms) {
    if (typeof hms === 'number') {
        return hms;
    }
    const parts = hms.split(':').map(Number); // Convert each part to a number
    let totalSeconds = 0;

    if (parts.length === 3) {
        // HH:MM:SS format
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

function postUpdateDisplay({ name, time, repetitions, description }) {
    postMessage({ type: 'updateDisplay', name, time, repetitions, description });
}

function postTogglePauseResume(isPaused) {
    postMessage({ type: 'togglePauseResume', isPaused });
}

function postLogEvent(message) {
    const time = new Date().toLocaleTimeString();
    postMessage({ type: 'logEvent', message, time});
}

async function startTimer(timer, rootTimer = false) {
    const { name, repetitions, timers} = timer;
    try {
        if(repetitions > 1){
            postLogEvent(`Starting '${name}' (${repetitions} repetitions).`);
            for (let currentRep = repetitions; currentRep > 0; currentRep--) {
                postUpdateDisplay({ repetitions: currentRep });
                await startTimer({...timer, repetitions: undefined, name:`${name} (${repetitions-currentRep+1}/${repetitions})`});
            }
            return;
        }

        if(timers){
            await startSeriesOfTimers(timer)
        } else {
            await startSingleTimer(timer)
        }
        if(rootTimer){
            postMessage({ type: 'completed' }); // Send completed message
        }
    } catch (error) {
        console.error("JSON Parse Error:", error);
    }
}

async function startSingleTimer(timer) {
    const { name, duration, description } = timer;
    console.log("Starting timer:", description);

    let remainingTime = hmsToSeconds(duration); // Corrected to start at full duration

    postUpdateDisplay({ name, time: remainingTime, description }); // Initial display update
    postLogEvent(`Starting '${name}' with ${duration}.`);
    

    // Wait for the timer to complete
    await TIMER_INSTANCE.start(remainingTime);

    postLogEvent(`Timer '${name}' completed!`);
}

async function startSeriesOfTimers(timer) {
    const { name, timers} = timer;
    postLogEvent(`Starting series '${name}'.`);
    for (let i = 0; i < timers.length; i++) {
        await startTimer(timers[i]);
    }
    postLogEvent(`Series '${name}' completed!`);
}

onmessage = function(event) {
    console.log('Worker: Command received from Main:', event.data);
    const { command, seconds, timer } = event.data;
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
        case 'startTimer':
                startTimer(timer, true);
                break;
        default:
            console.error('Worker: Unhandled command received:', command);
            break;
    }
};
