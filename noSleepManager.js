class NoSleepManager {
    constructor() {
        this.noSleep = new NoSleep();
    }

    /** Enable NoSleep to prevent screen dimming */
    enable() {
        this.noSleep.enable();
    }

    /** Disable NoSleep to allow screen dimming */
    disable() {
        this.noSleep.disable();
    }
}
