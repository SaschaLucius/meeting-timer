<script>
	export let timer;

	function saveTimer() {
		const cleanedRoot = cleanUpTimer(timer);
		const savedTimers = JSON.parse(localStorage.getItem('savedTimers') + '') || {};

		if (savedTimers[cleanedRoot.name]) {
			if (!confirm(`Timer '${cleanedRoot.name}' already exists. Do you want to overwrite it?`)) {
				return; // Exit if the user declines to overwrite
			}
		}

		savedTimers[cleanedRoot.name] = cleanedRoot;
		localStorage.setItem('savedTimers', JSON.stringify(savedTimers));

		// Select the newly saved timer in the selection
		// const selectBox = document.getElementById('liberatingStructureSelect');
		// TODO selectBox.value = cleanedRoot.name;
	}

	function cleanUpTimer(timer) {
		const cleanedTimer = { name: timer.name };

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
</script>

<button onclick={() => saveTimer()}>Save</button>

<style>
	button {
		padding: 10px 20px;
		margin: 5px;
		border: none;
		background-color: #007bff;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}
	button:hover {
		background-color: #0056b3;
	}
	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
	button {
		margin: 5px;
		padding: 5px 10px;
	}
</style>
