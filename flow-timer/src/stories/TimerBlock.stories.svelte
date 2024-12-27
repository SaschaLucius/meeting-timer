<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimerBlock from '$lib/TimerBlock.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'TimerBlock',
    component: TimerBlock,
    tags: ['autodocs']
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ }}/>

<Story name="No Child" args={{ timer: { 
  name: "Countdown",
  description: 'this is a description',
  duration: '5:00',
  repetitions: 3
} }} />

<Story name="Childs 1" args={{ timer: { 
  name: "Countdown",
  description: '',
  timers: [
                { name: 'Introduce the concept', duration: '5:00', description: 'Introduction to the concept of Wicked Questions.' },
            ]
} }} />

<Story name="Childs 2" args={{ timer: { 
  name: "Countdown",
  description: '',
  timers: [
                { name: 'Introduce the concept', duration: '5:00', description: 'Introduction to the concept of Wicked Questions.' },
                { name: 'Each participant generates pairs of paradoxes', duration: '5:00', description: 'Participants generate pairs of paradoxes.' },
            ]
} }} />

<Story name="SubChilds" args={{ timer: { 
  name: "Countdown",
  description: '',
  timers: [
                { name: 'Introduce the concept1', timers: [
                  { name: 'Introduce the concept2', duration: '5:00', description: 'Introduction to the concept of Wicked Questions.' }
                  ] 
              }
            ]
} }} />
