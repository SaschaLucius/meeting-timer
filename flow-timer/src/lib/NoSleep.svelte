<script lang="ts">
	import NoSleep from 'nosleep.js';
    export let enabled = false;

	const noSleep = new NoSleep();

	$: {
		if (enabled) {
			noSleep.enable();
		} else {
			noSleep.disable();
		}
	}
</script>
