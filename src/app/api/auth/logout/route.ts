import { NextResponse } from 'next/server';
import { AuthResponse } from '@/types';

export async function POST() {
  try {
    const response: AuthResponse = {
      success: true,
      message: 'Logged out successfully',
    };

    // Clear the auth cookie
    const responseObj = NextResponse.json(response);
    responseObj.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
    });

    return responseObj;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
