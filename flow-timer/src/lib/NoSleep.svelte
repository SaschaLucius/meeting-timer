<script lang="ts">
    import NoSleep from '$lib/NoSleep.js';
    const noSleep = new NoSleep();

    /** Enable NoSleep to prevent screen dimming */
    export function enable() {
        noSleep.enable();
    }

    /** Disable NoSleep to allow screen dimming */
    export function disable() {
        noSleep.disable();
    }
</script>