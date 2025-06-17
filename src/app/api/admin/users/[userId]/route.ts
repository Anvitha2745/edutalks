
// src/app/api/admin/users/[userId]/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';
import type { UserRecord } from 'firebase-admin/auth';

interface UpdateUserPayload {
  disabled?: boolean;
  // We can add other updatable fields here later, like customClaims for roles
  // customClaims?: { [key: string]: any };
}

// Helper function to map UserRecord to ApiUser
interface ApiUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  disabled: boolean;
  creationTime: string;
  lastSignInTime: string;
  customClaims?: { [key: string]: any };
}

function mapUserRecordToApiUser(userRecord: UserRecord): ApiUser {
  return {
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    photoURL: userRecord.photoURL,
    disabled: userRecord.disabled,
    creationTime: userRecord.metadata.creationTime,
    lastSignInTime: userRecord.metadata.lastSignInTime,
    customClaims: userRecord.customClaims,
  };
}


export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  // TODO: Implement robust security checks:
  // 1. Verify Firebase ID token from the request (e.g., Authorization header).
  // 2. Check if the authenticated user has 'admin' custom claims.
  // Example (conceptual):
  /*
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken.admin) { // Assuming 'admin' is a custom claim
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }
    // User is an admin, proceed...
  } catch (error) {
    console.error('Error verifying token or user is not admin:', error);
    return NextResponse.json({ error: 'Forbidden: Invalid token or insufficient permissions' }, { status: 403 });
  }
  */
  // For now, this endpoint is open for diagnostic purposes if security is not yet implemented.
  // THIS IS NOT SECURE FOR PRODUCTION WITHOUT THE CHECKS ABOVE.

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const payload: UpdateUserPayload = await request.json();

    if (typeof payload.disabled === 'undefined') {
        return NextResponse.json({ error: 'Payload must include "disabled" property (true or false)' }, { status: 400 });
    }
    
    // Optional: Prevent admin from disabling themselves or other admins
    // const targetUser = await adminAuth.getUser(userId);
    // if (targetUser.customClaims?.admin) {
    //   // Potentially check if the requesting admin is trying to disable themselves
    //   // const requestingAdminUid = decodedToken.uid; // from verified ID token
    //   // if (requestingAdminUid === userId) {
    //   //   return NextResponse.json({ error: 'Admins cannot disable themselves.' }, { status: 403 });
    //   // }
    //   // return NextResponse.json({ error: 'Cannot modify another admin account through this action.' }, { status: 403 });
    // }


    const updatedUserRecord = await adminAuth.updateUser(userId, {
      disabled: payload.disabled,
      // If setting custom claims:
      // customClaims: payload.customClaims (ensure payload structure and validation)
    });

    const apiUser = mapUserRecordToApiUser(updatedUserRecord);
    return NextResponse.json(apiUser, { status: 200 });

  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    let errorMessage = 'Internal Server Error';
    let statusCode = 500;

    if (error instanceof Error) {
        errorMessage = error.message;
        if (error.message.includes('USER_NOT_FOUND')) {
            errorMessage = 'User not found.';
            statusCode = 404;
        } else if (error.message.includes('INTERNAL_ERROR') && error.message.includes('initialize')) {
            errorMessage = 'Firebase Admin SDK not initialized. Check server logs and configuration.';
            statusCode = 500;
        } else if (error.message.includes('PERMISSION_DENIED')) {
            errorMessage = 'Permission denied. The service account may not have sufficient privileges.';
            statusCode = 403;
        }
    }
    
    return NextResponse.json({ error: 'Failed to update user', details: errorMessage }, { status: statusCode });
  }
}

// We can add a DELETE handler here later for deleting users
/*
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  // ... similar security checks ...
  const userId = params.userId;
  try {
    // Optional: Prevent deleting admin accounts
    // const targetUser = await adminAuth.getUser(userId);
    // if (targetUser.customClaims?.admin) {
    //    return NextResponse.json({ error: 'Cannot delete admin accounts.' }, { status: 403 });
    // }
    await adminAuth.deleteUser(userId);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    // ... error handling ...
    return NextResponse.json({ error: 'Failed to delete user', details: errorMessage }, { status: statusCode });
  }
}
*/
