import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';
import { OTPRequest, AuthResponse, User } from '@/types';
import { validateOTP, formatPhoneNumber, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body: OTPRequest = await request.json();
    
    if (!body.phoneNumber || !body.otp) {
      return NextResponse.json(
        { success: false, error: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP
    if (!validateOTP(body.otp)) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(body.phoneNumber);
    const collection = await getUsersCollection();
    
    // Find user
    const user = await collection.findOne({ phoneNumber: formattedPhone });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user as verified and set last login
    await collection.updateOne(
      { phoneNumber: formattedPhone },
      { 
        $set: { 
          isVerified: true,
          lastLogin: new Date()
        }
      }
    );

    const updatedUser: User = {
      ...user,
      _id: user._id?.toString(),
      isVerified: true,
      lastLogin: new Date()
    };

    // Generate JWT token
    const token = generateToken(updatedUser);

    const response: AuthResponse = {
      success: true,
      token,
      user: updatedUser,
      message: 'OTP verified successfully',
    };

    // Set HTTP-only cookie for additional security
    const responseObj = NextResponse.json(response);
    responseObj.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return responseObj;

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
