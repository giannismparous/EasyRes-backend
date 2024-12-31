const admin = require('firebase-admin');

// Decode the base64-encoded service account JSON
const base64ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!base64ServiceAccount) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}

const serviceAccount = JSON.parse(Buffer.from(base64ServiceAccount, 'base64').toString('utf-8'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://easyres-f8f31.firebaseio.com',
});

// Firestore instance
const db = admin.firestore();

module.exports = { admin, db };