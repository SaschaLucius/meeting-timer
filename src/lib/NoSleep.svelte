<script lang="ts">
	import NoSleep from 'nosleep.js';
	import { onMount } from 'svelte';
	export let enabled = false;

	let noSleep: NoSleep;

	onMount(() => {
		noSleep = new NoSleep();
	});

	$: {
		if (noSleep !== undefined) {
			if (enabled) {
				noSleep.enable();
			} else {
				noSleep.disable();
			}
		}
	}
</script>
