const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Add your JSON file here

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to send silent push notification

const sendSilencePush = async (deviceToken, data) => {
    try {
        const message = {
            token: deviceToken,
            android: {
                priority: 'high',
            },
            apns: {
                headers: {
                    'apns-priority': '10',
                },
                payload: {
                    aps: {
                        'content-available': 1,
                    },
                },
            },
            data: {
                silent: 'true',
                externalVideoUri: "http://49.50.247.169:33025/video",
                internalVideoUri: "http://10.10.13.4:8080/video"
            },
        };

        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

const sendNormalPush = async (token, notification, data) => {
    const message = {
        token: token,
        notification: {
            title: notification.title,
            body: notification.body,
        },
        data: data,  // Optional: you can add extra data for navigation or other logic
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Normal push sent successfully:', response);
    } catch (error) {
        console.error('Error sending normal push:', error);
    }
};


// Replace with a valid device token
const token = 'exwJ4CiSRR-UgQxaNK90Gy:APA91bGk9g_eNS4qEjjA8d1V66qdYrghCDy-1jcMHpptbEOyJgyZkvPpr6HzCSThQSIGphIpcGKgb-4PJ9Pl0qrZKi4-AOXS54u3LIbQI62vw-U2p9sosso'
// sendSilentPushNotification(false, token);


// Sending silent push (for background processing, like a VoIP call)
const silentData = {
    externalVideoUri: "http://49.50.247.169:33025/video",
    internalVideoUri: "http://10.10.13.4:8080/video"
};

sendSilencePush(token, silentData);

// Sending normal push (for showing notifications)
const normalNotification = {
    // title: 'New Message',
    // body: 'You have a new message!',
};
const normalData = {
    title: 'New Message',
    body: 'You have a new message!',
    message: 'You have a new message!',
};

sendNormalPush(token, normalNotification, normalData);
