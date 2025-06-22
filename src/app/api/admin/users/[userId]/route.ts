import { NextResponse, type NextRequest } from 'next/server';
import type { UserRecord } from 'firebase-admin/auth';
import { adminAuth } from '@/lib/firebaseAdmin';

interface UpdateUserPayload {
  disabled?: boolean;
  // Extend this with more fields as needed (e.g., customClaims)
}

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

function mapUserRecordToApiUser(user: UserRecord): ApiUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: user.disabled,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    customClaims: user.customClaims,
  };
}

export async function PATCH(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const payload: UpdateUserPayload = await request.json();

    if (typeof payload.disabled === 'undefined') {
      return NextResponse.json(
        { error: 'Payload must include "disabled" property (true or false)' },
        { status: 400 }
      );
    }

    const updatedUser = await adminAuth.updateUser(userId, {
      disabled: payload.disabled,
    });

    const apiUser = mapUserRecordToApiUser(updatedUser);

    return NextResponse.json(apiUser, { status: 200 });

  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    let message = 'Internal Server Error';
    let status = 500;

    if (error instanceof Error) {
      if (error.message.includes('USER_NOT_FOUND')) {
        message = 'User not found.';
        status = 404;
      } else if (error.message.includes('initialize')) {
        message = 'Firebase Admin SDK not initialized.';
        status = 500;
      } else if (error.message.includes('PERMISSION_DENIED')) {
        message = 'Permission denied. Service account may lack privileges.';
        status = 403;
      } else {
        message = error.message;
      }
    }

    return NextResponse.json(
      { error: 'Failed to update user', details: message },
      { status }
    );
  }
}
