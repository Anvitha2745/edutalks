// src/lib/firebaseAdmin.ts
import admin from 'firebase-admin';

// IMPORTANT: Service Account Key
// For local development, you might set the GOOGLE_APPLICATION_CREDENTIALS environment variable
// to the path of your service account key JSON file.
// Example: export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/serviceAccountKey.json"
//
// In Firebase App Hosting or Google Cloud environments, the Admin SDK can often
// auto-initialize if the runtime service account has the necessary IAM permissions.
//
// Alternatively, you can explicitly initialize with credentials, for example, from environment variables:
/*
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Ensure newlines are correctly formatted
      }),
      // databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com` // if using Realtime Database
    });
    console.log('Firebase Admin SDK initialized explicitly.');
  } catch (error) {
    console.error('Firebase Admin SDK explicit initialization error:', error);
  }
}
*/

// Attempt to initialize with default credentials (suitable for App Hosting/GCP environments)
if (!admin.apps.length) {
  try {
    admin.initializeApp();
    console.log('Firebase Admin SDK initialized with default credentials.');
  } catch (error) {
    console.error('Firebase Admin SDK default initialization error:', error);
    // Fallback or further error handling can be added here
    // For local development without GOOGLE_APPLICATION_CREDENTIALS set, this will likely fail.
    // Consider using the explicit initialization above with environment variables for local dev.
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore(); // If you plan to use Firestore for roles etc.
export default admin;
