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
		if (!deepEquals(arg1.timers[i], arg2.timers[i])) {
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

export function cleanUpTimer(timer: Timer): Timer {
	const cleanedTimer: Timer = { name: timer.name };

	if (timer.duration && timer.timers && timer.timers.length > 0) {
		console.log(`${timer.name} cannot have both duration and sub-timers together`);
		delete timer.duration;
	}
	if (timer.duration) cleanedTimer.duration = timer.duration;
	if (timer.repetitions && Number(timer.repetitions) > 1)
		cleanedTimer.repetitions = timer.repetitions;
	if (timer.description) cleanedTimer.description = timer.description;

	if (timer.timers && timer.timers.length > 0) {
		cleanedTimer.timers = timer.timers.map(cleanUpTimer);
	}

	return cleanedTimer;
}
