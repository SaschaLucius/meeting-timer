// ####### Custom Timer Creator #######
let rootTimer = {
    name: "",
    duration: "00:00:00",
    timers: []
};

function addTimer(parent = rootTimer) {
    const timer = {
        name: "",
        duration: "",
        repetitions: "",
        timers: []
    };
    parent.duration = "";
    if(parent.timers){
        parent.timers.push(timer);
    }else{
        parent.timers = [timer];
    }
    
    renderTimers(rootTimer, document.getElementById("timerBuilder"));
}

function addSubTimer(timer) {
    const subTimer = {
        name: "",
        duration: "",
        repetitions: "",
        timers: []
    };
    timer.duration = "";
    if(timer.timers){
        timer.timers.push(subTimer);
    }else{
        timer.timers = [subTimer];
    }
    renderTimers(rootTimer, document.getElementById("timerBuilder"));
    updateTotalDuration();
}

function deleteTimer(parent, timerIndex) {
    parent.timers.splice(timerIndex, 1);
    renderTimers(rootTimer, document.getElementById("timerBuilder"));
    updateTotalDuration();
}

function renderTimers(timer, container, parent = null, index = null) {
    container.innerHTML = "";
    const mainDiv = document.createElement("div");
    mainDiv.className = "timer-block";

    // "×" delete button for each timer
    if (parent !== null && index !== null) {
        const deleteButton = document.createElement("span");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "×";
        deleteButton.onclick = () => deleteTimer(parent, index);
        mainDiv.appendChild(deleteButton);
    }

    // Timer name input
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Name";
    nameInput.value = timer.name || "";
    nameInput.required = true;
    nameInput.oninput = (e) => (timer.name = e.target.value);

    // Duration input
    const durationInput = document.createElement("input");
    durationInput.placeholder = "Duration HH:MM:SS";
    durationInput.value = timer.duration || "";
    durationInput.oninput = (e) => (timer.duration = e.target.value);
    durationInput.disabled = timer.timers && timer.timers.length > 0;
    durationInput.onchange = (e) => updateTotalDuration();

    // Repetitions input
    const repetitionsInput = document.createElement("input");
    repetitionsInput.placeholder = "Repetitions";
    repetitionsInput.type = "number";
    repetitionsInput.value = timer.repetitions || "";
    repetitionsInput.min = 2;
    repetitionsInput.oninput = (e) => (timer.repetitions = e.target.value);
    repetitionsInput.onchange = (e) => updateTotalDuration();

    mainDiv.append(nameInput, durationInput, repetitionsInput);

    // List of sub-timers
    const timerList = document.createElement("div");
    timerList.className = "timer-list";
    if (timer.timers) {
        timer.timers.forEach((subTimer, subIndex) => {
            const subTimerContainer = document.createElement("div");
            subTimerContainer.className = "sub-timer";
            renderTimers(subTimer, subTimerContainer, timer, subIndex);
            timerList.appendChild(subTimerContainer);
        });
    }
    mainDiv.appendChild(timerList);

    // Add sub-timer button
    const addSubTimerButton = document.createElement("button");
    addSubTimerButton.innerText = "+";
    addSubTimerButton.onclick = () => timer !== rootTimer ? addSubTimer(timer) : addTimer();
    mainDiv.appendChild(addSubTimerButton);

    if (timer.timers && timer.timers.length > 0) {
        // Collapse/Expand button for sub-timers
        const toggleButton = document.createElement("button");
        toggleButton.innerText = "Hide";
        toggleButton.onclick = () => {
            timerList.style.display = timerList.style.display === "none" ? "block" : "none";
            toggleButton.innerText = timerList.style.display === "none" ? "Show" : "Hide";
        };
        mainDiv.appendChild(toggleButton);
    }

    container.appendChild(mainDiv);
}

function cleanUpTimer(timer) {
    const cleanedTimer = { name: timer.name };

    if (timer.duration && timer.timers && timer.timers.length > 0) {
        console.log(`${timer.name} cannot have both duration and sub-timers together`);
        delete timer.duration;
    }
    if (timer.duration) cleanedTimer.duration = timer.duration;
    if (timer.repetitions && timer.repetitions > 1) cleanedTimer.repetitions = timer.repetitions;

    if (timer.timers && timer.timers.length > 0) {
        cleanedTimer.timers = timer.timers.map(cleanUpTimer);
    }

    return cleanedTimer;
}
