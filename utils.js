// Converts HH:MM:SS, MM:SS, or SS format to total seconds
function hmsToSeconds(hms) {
    if (typeof hms === 'number') {
        return hms;
    }
    const parts = hms.split(':').map(Number); // Convert each part to a number
    let totalSeconds = 0;

    if (parts.length === 3) {
        // HH:MM:SS format
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

// Converts total seconds to HH:MM:SS format
function secondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format each unit to be two digits
    return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
}
