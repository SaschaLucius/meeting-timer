<script lang="ts">
	let logItems: { time: Date; message: string }[] = [];
	let logContent: HTMLDivElement;

	export function logEvent(message: string, time: Date = new Date()) {
		try {
			logItems = [...logItems, { time, message }];
			logContent.scrollTop = logContent.scrollHeight;
			console.log(message);
		} catch (error) {
			console.error('Log event failed:', error);
		}
	}

	export function clearLog() {
		logItems = [];
	}
</script>

<button type="button" onclick={() => clearLog()}>Clear</button>
<div class="logContent" id="logContent" bind:this={logContent}>
	{#each logItems as logItem}
		<div class="log-item">{`[${logItem.time.toLocaleTimeString()}] ${logItem.message}`}</div>
	{/each}
</div>

<style>
	.logContent {
		margin-top: 10px;
		max-height: 200px;
		overflow-y: scroll;
		border: 1px solid #ccc;
		padding: 10px;
		width: 100%;
		background-color: #f9f9f9;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.log-item {
		margin-bottom: 5px;
		font-size: 14px;
		color: #555;
	}
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
