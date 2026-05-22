# Firebase FCM Service Account Key Setup

This guide explains how to create a `serviceAccountKey.json` file for sending push notifications using Firebase Cloud Messaging (FCM).

---

# 1. Open Firebase Console

Go to:

https://console.firebase.google.com

Select your Firebase project.

---

# 2. Open Project Settings

In the left sidebar:

- Click the gear icon ⚙️
- Select **Project settings**

---

# 3. Open Service Accounts Tab

At the top tabs:

- General
- Cloud Messaging
- Integrations
- Service accounts ← choose this

---

# 4. Generate Private Key

Inside **Service accounts**:

- Select **Firebase Admin SDK**
- Click **Generate new private key**
- Click **Generate key**

A JSON file will automatically download.

Example filename:

```bash
my-project-firebase-adminsdk.json
```

Rename it to:

```bash
serviceAccountKey.json
```

---

# 5. Store the File Securely

Recommended structure:

```bash
project-root/
├── server/
│   ├── serviceAccountKey.json
│   └── index.js
```

Add it to `.gitignore`:

```gitignore
serviceAccountKey.json
```

Never commit this file to Git.

---

# 6. Example Node.js Usage

Install Firebase Admin SDK:

```bash
npm install firebase-admin
```

Initialize Firebase:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

---

# 7. Send FCM Push Example

```javascript
const message = {
  notification: {
    title: 'Hello',
    body: 'FCM test notification',
  },
  token: '<FCM_DEVICE_TOKEN>',
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent:', response);
  })
  .catch((error) => {
    console.error('Error sending:', error);
  });
```

---

# 8. Important Security Notes

Do NOT:

- Upload `serviceAccountKey.json` to GitHub
- Share it in Slack/Teams/email
- Put it inside mobile apps

Recommended:

- Store in server environment only
- Use secret managers in production
- Rotate keys periodically

---

# 9. Optional: Use Environment Variable Instead

Instead of storing JSON file physically:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

Then initialize:

```javascript
admin.initializeApp();
```

---

# 10. Verify FCM API Enabled

Open Google Cloud Console:

https://console.cloud.google.com

Ensure these APIs are enabled:

- Firebase Cloud Messaging API
- Firebase Management API
