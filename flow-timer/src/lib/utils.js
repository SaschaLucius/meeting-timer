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

function calculateTotalTime(timer) {
    let totalTime = 0;

    // Parse the timer's duration and convert to seconds, defaulting to 0 if empty
    const durationInSeconds = timer.duration ? hmsToSeconds(timer.duration) : 0;
    
    // Multiply by repetitions, defaulting to 1 if repetitions is not set or invalid
    const repetitions = timer.repetitions && timer.repetitions > 1 ? timer.repetitions : 1;
    totalTime += durationInSeconds * repetitions;

    // Recursively add time for each sub-timer
    if (Array.isArray(timer.timers) && timer.timers.length > 0) {
        timer.timers.forEach(subTimer => {
            totalTime += calculateTotalTime(subTimer) * repetitions;
        });
    }

    return totalTime;
}

function showAlertBox(timerName) {
    // Remove any existing alert box
    const existingAlert = document.getElementById("customAlertBox");
    if (existingAlert) existingAlert.remove();

    // Create overlay for background dim
    const overlay = document.createElement("div");
    overlay.id = "alertOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    // Create the alert box container
    const alertBox = document.createElement("div");
    alertBox.id = "customAlertBox";
    alertBox.style.backgroundColor = "#fff";
    alertBox.style.padding = "20px";
    alertBox.style.width = "300px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    alertBox.style.textAlign = "center";

    // Message content
    const message = document.createElement("p");
    message.innerText = `The timer "${timerName}" has finished!`;
    message.style.fontSize = "16px";
    message.style.marginBottom = "20px";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.padding = "10px 20px";
    closeButton.style.margin = "5px";
    closeButton.style.border = "none";
    closeButton.style.backgroundColor = "#007bff";
    closeButton.style.color = "#fff";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = () => {
        document.body.removeChild(overlay);
    };

    // Clean button
    const cleanButton = document.createElement("button");
    cleanButton.innerText = "Clean";
    cleanButton.style.padding = "10px 20px";
    cleanButton.style.margin = "5px";
    cleanButton.style.border = "none";
    cleanButton.style.backgroundColor = "#ff4d4d";
    cleanButton.style.color = "#fff";
    cleanButton.style.borderRadius = "5px";
    cleanButton.style.cursor = "pointer";
    cleanButton.onclick = () => {
        clearLog(); // Assumes clearLog() is defined elsewhere to clear the timer log
        updateDisplay({name:'-',time:0,repetitions:0})
        document.body.removeChild(overlay);
    };

    // Append elements to alert box and overlay
    alertBox.appendChild(message);
    alertBox.appendChild(closeButton);
    alertBox.appendChild(cleanButton);
    overlay.appendChild(alertBox);

    // Add overlay to the body
    document.body.appendChild(overlay);
}

export { hmsToSeconds, secondsToHMS, calculateTotalTime, showAlertBox };