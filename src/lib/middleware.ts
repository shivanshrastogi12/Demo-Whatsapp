import { NextRequest } from 'next/server';
import { verifyToken } from './auth';
import { getUsersCollection } from './db';
import { User } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export async function authenticateToken(request: NextRequest): Promise<User | null> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    // Verify JWT token
    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    // Get user from database
    const collection = await getUsersCollection();
    const user = await collection.findOne({ phoneNumber: payload.phoneNumber });

    if (!user || !user.isVerified) {
      return null;
    }

    return {
      ...user,
      _id: user._id?.toString(),
    };

  } catch (error) {
    console.error('Token authentication error:', error);
    return null;
  }
}
