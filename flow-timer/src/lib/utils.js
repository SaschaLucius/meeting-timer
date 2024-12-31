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

export { showAlertBox };