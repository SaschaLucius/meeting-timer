<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Log from '$lib/Log.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Log',
		component: Log,
		tags: ['autodocs']
	});

	let log = undefined;
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{}} />

<Story name="With Interactions" id="interactions">
	<Log bind:this={log} />

	<hr />
	<button on:click={() => log.logEvent('Test')}>Log event</button>
	<button on:click={() => log.logEvent('Test', new Date('2024-01-01'))}>Log event with time</button>
	<button on:click={() => log.clearLog()}>Clear</button>
</Story>
