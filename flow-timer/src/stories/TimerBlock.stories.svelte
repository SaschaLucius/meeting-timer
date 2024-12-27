<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimerBlock from '$lib/TimerBlock.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/TimerBlock',
    component: TimerBlock,
    tags: ['autodocs']
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ }}/>

<Story name="Child 1" args={{ timer: { 
  name: "Countdown",
  description: '',
  timer: { name: 'Countdown', duration: '5:00' }
} }} />

<Story name="Childs 2" args={{ timer: { 
  name: "Countdown",
  description: '',
  timers: [
                { name: 'Introduce the concept', duration: '5:00', description: 'Introduction to the concept of Wicked Questions.' },
                { name: 'Each participant generates pairs of paradoxes', duration: '5:00', description: 'Participants generate pairs of paradoxes.' },
            ]
} }} />

<Story name="SubChild 1" args={{ timer: {} }} />

<Story name="SubChilds 2" args={{ timer: {} }} />
