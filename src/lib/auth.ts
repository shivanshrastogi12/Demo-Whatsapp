import jwt from 'jsonwebtoken';
import { User } from '@/types';

// Only check JWT_SECRET on server-side
function getJWTSecret(): string {
  if (typeof window !== 'undefined') {
    throw new Error('JWT operations should only be performed on the server-side');
  }
  
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return secret;
}

export interface JWTPayload {
  userId: string;
  phoneNumber: string;
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user._id!,
    phoneNumber: user.phoneNumber,
  };

  return jwt.sign(payload, getJWTSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, getJWTSecret()) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if missing (assuming India +91)
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  
  // Remove leading + or 0
  return cleaned.replace(/^(\+|0)/, '');
}

export function validatePhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  // Check if it's a valid Indian mobile number (91 + 10 digits)
  return /^91[6-9]\d{9}$/.test(formatted);
}

export function validateOTP(otp: string): boolean {
  // For demo purposes, we accept 123456 as valid OTP
  // In production, this would be validated against a stored OTP
  return otp === '123456';
}
