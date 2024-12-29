<script lang="ts">
	let audio: HTMLAudioElement;

	export let enabled = true;

	export function play() {
		if (enabled) {
			audio.play();
		}
	}
</script>

<!-- TODO select file -->
<audio id="audio" src="finish.mp3" preload="auto" bind:this={audio}></audio>

<style>
</style>
