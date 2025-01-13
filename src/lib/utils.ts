// Converts HH:mm:ss, mm:ss, or ss format to total seconds
function hmsToSeconds(hms: string | undefined): number | undefined {
	if (hms === undefined) {
		return undefined;
	}
	if (typeof hms === 'number') {
		return hms;
	}
	const parts = hms.split(':').map(Number); // Convert each part to a number
	let totalSeconds = 0;

	if (parts.length === 3) {
		// HH:mm:ss format
		const [hours, minutes, seconds] = parts;
		totalSeconds = hours * 3600 + minutes * 60 + seconds;
	} else if (parts.length === 2) {
		// MM:SS format
		const [minutes, seconds] = parts;
		totalSeconds = minutes * 60 + seconds;
	} else if (parts.length === 1) {
		// SS format
		totalSeconds = parts[0];
	}

	return totalSeconds;
}

// Converts total seconds to HH:mm:ss format
function secondsToHMS(totalSeconds: number | undefined, minified: boolean = false): string {
	if (totalSeconds === undefined) return '';
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (minified) {
		if (hours === 0) {
			if (minutes === 0) {
				return String(seconds).padStart(2, '0');
			}
			return [minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
		}
	}

	// Format each unit to be two digits
	return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
}

export { hmsToSeconds, secondsToHMS };
