import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { phone } = await request.json();
        if (!phone || typeof phone !== 'string') {
            return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
        }
        const users = await getUsersCollection();
        let user = await users.findOne({ phoneNumber: phone });
        if (!user) {
            const newUser = { phoneNumber: phone, isVerified: false, createdAt: new Date() };
            await users.insertOne(newUser);
            user = await users.findOne({ phoneNumber: phone });
        }
        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
