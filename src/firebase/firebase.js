const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://easyres-f8f31.firebaseio.com',
});

// Firestore instance
const db = admin.firestore();

module.exports = { admin, db };
