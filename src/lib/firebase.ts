
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// ================================================================================================
// FIREBASE CONFIGURATION
// ================================================================================================
// The following Firebase project configuration values have been provided by the user.
// If authentication issues persist (e.g., "auth/api-key-not-valid"),
// please double-check these values against your Firebase project console:
// 1. Go to the Firebase Console (https://console.firebase.google.com/).
// 2. Select your project (linguaverse-w3nct).
// 3. Go to Project settings (click the gear icon ⚙️ near Project Overview).
// 4. In the "General" tab, scroll down to "Your apps".
// 5. Click on your web app (App ID: 1:953559003407:web:a8de73e2e1daf241c3ce7a).
// 6. Find the `firebaseConfig` object under "SDK setup and configuration".
// 7. Ensure "Email/Password" and "Google" sign-in providers are enabled in Authentication > Sign-in method.
// ================================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDEzQqFiH5j-VjEMczQdp90HY7-akwJFs4",
  authDomain: "linguaverse-w3nct.firebaseapp.com",
  databaseURL: "https://linguaverse-w3nct-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "linguaverse-w3nct",
  storageBucket: "linguaverse-w3nct.firebasestorage.app",
  messagingSenderId: "953559003407",
  appId: "1:953559003407:web:a8de73e2e1daf241c3ce7a"
  // measurementId can be added here if needed, but is often optional.
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
