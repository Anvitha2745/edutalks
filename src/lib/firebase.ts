// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// ================================================================================================
// IMPORTANT: FIREBASE CONFIGURATION
// ================================================================================================
// You MUST replace the placeholder values below with the actual Firebase project
// configuration values from your Firebase project console.
//
// To get your Firebase project config:
// 1. Go to the Firebase Console (https://console.firebase.google.com/).
// 2. Select your project.
// 3. Go to Project settings (click the gear icon ⚙️ near Project Overview).
// 4. In the "General" tab, scroll down to "Your apps".
// 5. If you haven't added a web app, do so.
// 6. Click on your web app, and you'll find the `firebaseConfig` object.
//    (It might be labeled as "SDK setup and configuration" with a "Config" option).
// 7. Copy these values and paste them below, replacing the "YOUR_..." placeholders.
//
// Failure to do this will result in authentication errors like "auth/api-key-not-valid".
// ================================================================================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your API key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Auth domain (e.g., project-id.firebaseapp.com)
  projectId: "YOUR_PROJECT_ID", // Replace with your Project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your Storage Bucket (e.g., project-id.appspot.com)
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Messaging Sender ID
  appId: "YOUR_APP_ID", // Replace with your App ID
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: Replace with your Measurement ID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
// const db = getFirestore(app); // Uncomment if you need Firestore
// const storage = getStorage(app); // Uncomment if you need Cloud Storage

export { app, auth /*, db, storage */ };
