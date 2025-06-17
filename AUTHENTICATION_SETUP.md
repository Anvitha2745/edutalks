
# LinguaVerse Firebase Authentication Setup

This document outlines the Firebase Authentication setup for the LinguaVerse application, covering user, instructor, and admin authentication.

## 1. Firebase Project Setup

Before the application's authentication can work, you need to set up a Firebase project and configure the necessary sign-in methods.

### Steps:

1.  **Create a Firebase Project**:
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Click on "Add project" and follow the on-screen instructions.

2.  **Add a Web App to Your Project**:
    *   In your Firebase project, go to Project Overview.
    *   Click on the Web icon (`</>`) to add a new web app.
    *   Register your app (give it a nickname). Firebase Hosting setup is optional at this stage if you are only using Authentication.
    *   After registering, Firebase will provide you with a `firebaseConfig` object. **Copy these credentials.**

3.  **Enable Sign-in Methods**:
    *   In the Firebase Console, navigate to "Authentication" (under Build).
    *   Go to the "Sign-in method" tab.
    *   **Crucially, enable the following providers**:
        *   **Email/Password**: Click on it, enable the toggle, and save. **This is required for all email/password logins (user, instructor, admin).**
        *   **Google**: Click on it, enable the toggle, provide a project support email, and save. **This is required if you want users/instructors to log in with Google.**

4.  **Configure `src/lib/firebase.ts`**:
    *   The application contains a file `src/lib/firebase.ts` for Firebase initialization.
    *   You **MUST** replace the placeholder values in this file with the `firebaseConfig` object you copied in Step 2. If you've already done this and are still facing issues like `auth/api-key-not-valid`, double-check every value.

    ```typescript
    // src/lib/firebase.ts
    // ...
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY", // Replace with your API key
      authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Auth domain
      projectId: "YOUR_PROJECT_ID", // Replace with your Project ID
      storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your Storage Bucket
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Messaging Sender ID
      appId: "YOUR_APP_ID", // Replace with your App ID
      measurementId: "YOUR_MEASUREMENT_ID" // Optional: Replace
    };
    // ...
    ```

5.  **(Optional but Recommended for Testing) Create Default Admin/Instructor Users**:
    *   The admin login page defaults to `admin@edutalks.com` / `password`.
    *   The instructor login page defaults to `instructor@edutalks.com` / `password`.
    *   If you intend to use these default credentials for testing, you **must create these users manually in your Firebase project**:
        *   Go to Firebase Console -> Authentication -> Users tab.
        *   Click "Add user".
        *   Enter the email (e.g., `admin@edutalks.com`) and password (e.g., `password`).
        *   Repeat for the instructor user if needed.
    *   If you don't create these users, login with these specific credentials will fail with "User not found" or "Invalid credentials".

## 2. Frontend Integration

The frontend application uses the Firebase SDK to interact with Firebase Authentication services.

### Key Firebase SDK Functions Used:

*   `initializeApp` (in `src/lib/firebase.ts`): Initializes the Firebase app instance.
*   `getAuth` (in `src/lib/firebase.ts`): Gets the Auth service instance.
*   `createUserWithEmailAndPassword` (in `src/components/auth/SignupForm.tsx`): For new user registration with email and password.
*   `updateProfile` (in `src/components/auth/SignupForm.tsx`): To set the user's `displayName` (full name) after signup.
*   `signInWithEmailAndPassword` (in various login forms): For signing in existing users with email and password.
*   `GoogleAuthProvider` and `signInWithPopup` (in `src/components/auth/LoginForm.tsx` and `src/app/auth/instructor/login/page.tsx`): For Google Sign-In functionality.

### User Interface:

*   The `UserNav` component (`src/components/layout/UserNav.tsx`) currently shows static user information. This will need to be updated to reflect the actual logged-in user's details once authentication state management is implemented.

## 3. Authentication Types Implemented

### a. User Authentication
*   **Location**: `src/components/auth/LoginForm.tsx` and `src/components/auth/SignupForm.tsx`.
*   **Methods**:
    *   Email/Password: Users can sign up and log in using their email and password.
    *   Google Sign-In: Users can log in or sign up using their Google accounts.
*   **Redirection**: Successful login/signup redirects to `/dashboard`.

### b. Instructor Authentication
*   **Location**: `src/app/auth/instructor/login/page.tsx`.
*   **Methods**:
    *   Email/Password: Instructors can log in using their email and password.
    *   Google Sign-In: Instructors can log in using their Google accounts.
*   **Redirection**: Successful login redirects to `/instructor`.
*   **Note**: Currently, there is no specific role verification to ensure the logged-in user is an instructor. This is a critical next step.

### c. Admin Authentication
*   **Location**: `src/app/auth/admin/login/page.tsx`.
*   **Methods**:
    *   Email/Password: Admins can log in using their email and password.
*   **Redirection**: Successful login redirects to `/admin`.
*   **Note**: Currently, there is no specific role verification to ensure the logged-in user is an admin. This is a critical next step.

## 4. Key Files Involved

*   `package.json`: Added the `firebase` dependency.
*   `src/lib/firebase.ts`: Contains Firebase app initialization and exports the `auth` service.
*   `src/components/auth/LoginForm.tsx`: Handles user login.
*   `src/components/auth/SignupForm.tsx`: Handles user registration.
*   `src/app/auth/login/page.tsx`: Page for user login.
*   `src/app/auth/signup/page.tsx`: Page for user signup.
*   `src/app/auth/instructor/login/page.tsx`: Page for instructor login.
*   `src/app/auth/admin/login/page.tsx`: Page for admin login.

## 5. Next Steps & Future Enhancements

1.  **Authentication State Management**:
    *   Implement a global authentication state (e.g., using React Context and `onAuthStateChanged` from Firebase).
    *   Update `UserNav` to display actual user data (name, avatar) and a logout button that signs the user out of Firebase.
    *   Protect routes (e.g., redirect unauthenticated users from `/dashboard` to `/auth/login`).

2.  **Role-Based Access Control (RBAC)**:
    *   Implement a system to assign and verify roles (User, Instructor, Admin). This can be done using:
        *   **Firebase Custom Claims**: Set custom claims on user tokens (requires Firebase Admin SDK, typically in a Firebase Function).
        *   **Firestore Database**: Store user roles in a Firestore collection and check them after login.
    *   Secure instructor and admin dashboards based on these roles.

3.  **Admin Panel User Management**:
    *   Update the admin panel (`/admin/users`) to fetch and display user data from Firebase Authentication (and potentially Firestore for additional details like roles).
    *   Implement functionality for admins to manage users (e.g., view details, disable accounts, assign roles).

4.  **Firestore Database Integration**:
    *   Consider storing additional user profile information (beyond what Firebase Auth stores) in Firestore, linked by the user's UID. This could include learning preferences, progress, etc.

5.  **Phone Number Authentication (for Instructors)**:
    *   If still required, integrate Firebase Phone Number Authentication. This often involves:
        *   FirebaseUI for a pre-built flow, or
        *   Custom implementation with `RecaptchaVerifier` and `signInWithPhoneNumber`. This might also require backend logic (Cloud Functions) for linking phone numbers to existing email/Google authenticated users as a verification step.

This documentation provides a snapshot of the current authentication setup. Remember to keep it updated as the system evolves.
