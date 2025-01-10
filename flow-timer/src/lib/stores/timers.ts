import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

interface Timer {
    name: string;
    duration?: number;
    repetitions?: number;
    timers?: Timer[];
    description?: string;
}

export const rootTimer = writable<Timer>({
    name: '',
    duration: undefined,
    repetitions: undefined,
    timers: [],
    description: ''
});
export const currentTimer = writable<string>('1-2-4-All');
export const savedTimers = persisted('savedTimers', {});