<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimerBlock from '$lib/TimerBlock.svelte';
  import { fn } from '@storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/TimerBlock',
    component: TimerBlock,
    tags: ['autodocs'],
    argTypes: {
      backgroundColor: { control: 'color' },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
      },
    },
    args: {
      onClick: fn(),
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ primary: true, label: 'TimerBlock' }} />

<Story name="Secondary" args={{ label: 'TimerBlock' }} />

<Story name="Large" args={{ size: 'large', label: 'TimerBlock' }} />

<Story name="Small" args={{ size: 'small', label: 'TimerBlock' }} />
