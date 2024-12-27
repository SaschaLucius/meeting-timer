<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Log from '$lib/Log.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Log',
    component: Log,
    tags: ['autodocs']
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ }}/>
