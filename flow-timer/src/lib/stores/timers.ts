import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'
import type { Timer } from '$lib/types/timer';
import  { getDefaultTimer } from '$lib/types/timer';

export const rootTimer = writable<Timer>(getDefaultTimer());
export const defaultTimerName = '1-2-4-All';
export const currentTimer = writable<string>(defaultTimerName);
export const savedTimers = persisted('savedTimers', {});