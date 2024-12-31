const admin = require('firebase-admin');

// Validate if FIREBASE_PRIVATE_KEY exists
if (!process.env.FIREBASE_PRIVATE_KEY) {
    console.error('Error: FIREBASE_PRIVATE_KEY is not defined in the environment variables.');
    process.exit(1); // Exit the process if the key is missing
}

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();

module.exports = { admin, db };
