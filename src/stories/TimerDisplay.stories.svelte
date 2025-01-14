<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TimerDisplay from '$lib/TimerDisplay.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'TimerDisplay',
		component: TimerDisplay,
		tags: ['autodocs']
	});
</script>

<script>
	let interval;
	let seconds = 0;

	const startInterval = () => {
		clearInterval(interval);
		interval = setInterval(() => {
			seconds++;
		}, 5);
	};
	const stopInterval = () => {
		clearInterval(interval);
		interval = undefined;
	};
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{}} />

<Story name="With Timer">
	<TimerDisplay name="Countdown" description="is is a description" time={seconds} repetitions="3" />
	<button on:click={interval ? stopInterval : startInterval}>Start</button>
</Story>

<Story
	name="With Values"
	args={{
		name: 'Countdown',
		description: 'is is a description',
		time: 300,
		repetitions: 3
	}}
/>

<Story
	name="With Long Text Values"
	args={{
		name: 'CountdownCountdownCountdownCountdownCountdownCountdownCountdownCountdown',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		time: 300,
		repetitions: 3
	}}
/>
