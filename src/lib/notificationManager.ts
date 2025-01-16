/**
 * NotificationManager class.
 * 
 * This class is responsible for managing notifications.
 */
class NotificationManager {
	notificationEnabled: boolean;

	constructor() {
		this.notificationEnabled = false;
	}

	/**
	 * Request permission for notifications.
	 * @returns {Promise<void>}
	 */
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

	/**
	 * Send a notification.
	 * @param {string} message - The message to display in the notification
	 * @returns {void}
	 */
	sendNotification(message: string) {
		if (this.notificationEnabled && 'Notification' in window) {
			new Notification(message);
		}
	}
}

export default NotificationManager;
