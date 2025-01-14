export interface Timer {
	name: string;
	duration?: number;
	repetitions?: number;
	timers?: Timer[];
	description?: string;
}

export function deepEquals(arg1:Timer, arg2:Timer) {
	if (arg1.name !== arg2.name) {
		return false;
	}
	if (arg1.duration !== arg2.duration) {
		return false;
	}
	if (arg1.repetitions !== arg2.repetitions) {
		return false;
	}
	if (arg1.description !== arg2.description) {
		return false;
	}
	if (arg1.timers?.length !== arg2.timers?.length) {
		return false;
	}
	for (let i = 0; i < (arg1.timers?.length || 0); i++) {
		if (!deepEquals((arg1.timers ?? [])[i] ?? [], (arg2.timers ?? [])[i])) {
			return false;
		}
	}
	return true;
}

export function getDefaultTimer() {
	return {
		name: '',
		duration: undefined,
		repetitions: undefined,
		timers: [],
		description: undefined
	};
}

export function getSubTimer(duration: number | undefined = undefined): Timer {
	return {
		name: '',
		duration: duration,
		repetitions: undefined,
		timers: [],
		description: undefined
	};
}
