/**
 * Attempts to show a push notification
 * @param text The text to be shown
 * @param data Additional notification data
 */
export function showNotification(text: string, data: {image?: string}) {
    const {image} = data;
    if (Notification?.permission == "granted") {
        new Notification(text, {
            image,
        });
    } else {
        Notification.requestPermission(status => {
            if (status == "granted") {
                showNotification(text, data);
            }
        });
    }
}
