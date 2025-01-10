import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

interface Timer {
    name: string;
    duration?: number;
    repetitions?: number;
    timers?: Timer[];
    description?: string;
}

export const rootTimer = writable<Timer>();
export const currentTimer = writable<string>('');
export const savedTimers = persisted('savedTimers', {});