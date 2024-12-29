<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NoSleep from '$lib/NoSleep.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'NoSleep',
    component: NoSleep,
    tags: ['autodocs']
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ enabled: false}}/>
