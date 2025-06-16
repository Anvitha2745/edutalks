// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';
import type { UserRecord } from 'firebase-admin/auth';

// Define a simpler user type for the API response
export interface ApiUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  disabled: boolean;
  creationTime: string;
  lastSignInTime: string;
  // Add custom claims or roles if you fetch them
  // role?: string; 
}

export async function GET(request: Request) {
  // TODO: Implement robust security checks:
  // 1. Verify Firebase ID token from the request (e.g., Authorization header).
  // 2. Check if the authenticated user has 'admin' custom claims.
  // Example (conceptual - requires a library like 'next-firebase-auth-edge' or manual token verification):
  /*
  const authorization = request.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      if (!decodedToken.admin) { // Assuming 'admin' is a custom claim
        return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
      }
      // User is an admin, proceed...
    } catch (error) {
      console.error('Error verifying token or user is not admin:', error);
      return NextResponse.json({ error: 'Unauthorized: Invalid token or insufficient permissions' }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }
  */
  // For now, this endpoint is open for diagnostic purposes if security is not yet implemented.
  // THIS IS NOT SECURE FOR PRODUCTION WITHOUT THE CHECKS ABOVE.

  try {
    const listUsersResult = await adminAuth.listUsers(100); // Fetch up to 100 users for now
    
    const users: ApiUser[] = listUsersResult.users.map((userRecord: UserRecord) => {
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        disabled: userRecord.disabled,
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: userRecord.metadata.lastSignInTime,
        // TODO: Fetch roles from Firestore or custom claims if needed
        // role: userRecord.customClaims?.role || 'User', 
      };
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error listing users:', error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Check if the error is due to Firebase Admin SDK not being initialized
    if (errorMessage.includes('initialize')) {
        errorMessage = 'Firebase Admin SDK not initialized. Check server logs and configuration.';
    }
    return NextResponse.json({ error: 'Failed to list users', details: errorMessage }, { status: 500 });
  }
}
