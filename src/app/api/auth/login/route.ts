import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection, createIndexes } from '@/lib/db';
import { LoginRequest, AuthResponse, User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    
    if (!body.phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const phoneNumber = body.phoneNumber.trim();
    
    // Simple validation - just check if it's not empty
    if (phoneNumber.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }
    
    // Ensure indexes are created
    await createIndexes();
    
    const collection = await getUsersCollection();
    
    // Check if user exists, if not create them
    let user = await collection.findOne({ phoneNumber });
    
    if (!user) {
      const newUser: User = {
        phoneNumber,
        name: `User ${phoneNumber}`,
        isVerified: true, // Auto-verify for simplicity
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      const result = await collection.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId.toString() };
    } else {
      // Update last login
      await collection.updateOne(
        { phoneNumber },
        { $set: { lastLogin: new Date() } }
      );
    }
    
    const response: AuthResponse = {
      success: true,
      user: {
        phoneNumber: user.phoneNumber,
        name: user.name || `User ${user.phoneNumber}`,
        isVerified: true,
        createdAt: user.createdAt,
        lastLogin: new Date()
      },
      message: 'Login successful!'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
