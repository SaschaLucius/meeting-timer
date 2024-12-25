<script lang="ts">
    interface Timer {
        name: string,
        duration?: string,
        repetitions?: string,
        timers?: Timer[],
        description?: string
    }

    // ####### Custom Timer Creator #######
    let rootTimer : Timer = {
        name: "",
        duration: "00:00:00",
        timers: [],
        description: ""
    };

    function addSubTimer(timer:Timer = rootTimer) {
        const subTimer = {
            name: "",
            duration: "",
            repetitions: "",
            timers: [],
            description: ""
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

    function deleteTimer(parent:Timer, timerIndex:number) {
        parent.timers?.splice(timerIndex, 1);
        renderTimers(rootTimer, document.getElementById("timerBuilder"));
        updateTotalDuration();
    }

    function renderTimers(timer:Timer, container:any, parent : Timer | null = null, index: null | number = null) {
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
        nameInput.style.width = "25%";
        nameInput.oninput = (e) => (timer.name = e.target.value);

        // Duration input
        const durationInput = document.createElement("input");
        durationInput.placeholder = "Duration HH:MM:SS";
        durationInput.value = timer.duration || "";
        durationInput.oninput = (e) => (timer.duration = e.target.value);
        durationInput.disabled = timer.timers !== undefined && timer.timers.length > 0;
        durationInput.style.width = "25%";
        durationInput.onchange = (e) => updateTotalDuration();

        // Repetitions input
        const repetitionsInput = document.createElement("input");
        repetitionsInput.placeholder = "Repetitions";
        repetitionsInput.type = "number";
        repetitionsInput.value = timer.repetitions || "";
        repetitionsInput.min = "2";
        repetitionsInput.style.width = "25%";
        repetitionsInput.oninput = (e) => (timer.repetitions = e.target.value);
        repetitionsInput.onchange = (e) => updateTotalDuration();

        mainDiv.append(nameInput, durationInput, repetitionsInput);

        // Description input
        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";
        descriptionInput.value = timer.description || "";
        descriptionInput.oninput = (e) => (timer.description = e.target.value);
        descriptionInput.style.width = "calc(75% + 48px)";

        mainDiv.appendChild(descriptionInput);

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
        addSubTimerButton.onclick = () => addSubTimer(timer);
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

    function cleanUpTimer(timer:Timer) : Timer {
        const cleanedTimer : Timer = { name: timer.name };

        if (timer.duration && timer.timers && timer.timers.length > 0) {
            console.log(`${timer.name} cannot have both duration and sub-timers together`);
            delete timer.duration;
        }
        if (timer.duration) cleanedTimer.duration = timer.duration;
        if (timer.repetitions && Number(timer.repetitions) > 1) cleanedTimer.repetitions = timer.repetitions;
        if (timer.description) cleanedTimer.description = timer.description;

        if (timer.timers && timer.timers.length > 0) {
            cleanedTimer.timers = timer.timers.map(cleanUpTimer);
        }

        return cleanedTimer;
    }

    let totalDuration = "00:00:00";

    function updateTotalDuration() {
        const totalSeconds = calculateTotalTime(rootTimer);
        totalDuration = secondsToHMS(totalSeconds);
    }

</script>

<div>
    <div id="timerBuilder"></div>
    <div class="timer-info">Total Duration: <span id="totalDuration">{totalDuration}</span></div>
    <!-- TODO button onclick={() => saveTimer()}>Save</button-->
    <div id="errorMessage" style="color: red; margin-top: 5px;"></div>
</div>

<style>
    .timer-block { position: relative; margin: 10px 0; padding: 10px; border: 1px solid #ccc; }
    .timer-list { padding-left: 20px; }
    .sub-timer { margin-top: 5px; padding-left: 15px; border-left: 1px dotted #ccc; }
    .delete-button { position: absolute; top: 5px; right: 5px; cursor: pointer; color: red; font-weight: bold; }
    input { margin: 5px; padding: 5px; }
</style>