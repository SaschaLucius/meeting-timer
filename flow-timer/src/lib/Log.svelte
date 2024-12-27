<script lang="ts">
	let logItems: { time: string; message: string }[] = [];
	let logContent: HTMLDivElement;

	export function logEvent(message: string, time: string = new Date().toLocaleTimeString()) {
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
		<div class="log-item">{`[${logItem.time}] ${logItem.message}`}</div>
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
</style>
