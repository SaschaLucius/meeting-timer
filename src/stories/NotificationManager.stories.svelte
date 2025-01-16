<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
  import NotificationManager from '$lib/notificationManager';

	const { Story } = defineMeta({
		title: 'NotificationManager',
		component: NotificationManager,
		tags: ['autodocs']
	});

	let notificationManager = new NotificationManager();

	async function requestPermission() {
		await notificationManager.requestNotificationPermission();
	}

	function sendTestNotification() {
		notificationManager.sendNotification('Test Notification');
	}
</script>

<Story name="Request Permission">
	<button on:click={requestPermission}>Request Notification Permission</button>
</Story>

<Story name="Send Notification">
	<button on:click={sendTestNotification}>Send Test Notification</button>
</Story>
