class NotificationManager {
	constructor() {
		this.notificationEnabled = false;
	}

	async requestNotificationPermission() {
		if (!('Notification' in window)) {
			console.log('This browser does not support notifications.');
			return;
		}
		if (Notification.permission === 'granted') {
			this.notificationEnabled = true;
		} else if (Notification.permission !== 'denied') {
			const permission = await Notification.requestPermission();
			this.notificationEnabled = permission === 'granted';
		}
	}

	sendNotification(message) {
		if (this.notificationEnabled && 'Notification' in window) {
			new Notification(message);
		}
	}
}

export default NotificationManager;
