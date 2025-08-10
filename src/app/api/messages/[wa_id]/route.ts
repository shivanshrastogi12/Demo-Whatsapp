import { NextRequest, NextResponse } from 'next/server';
import { getMessagesCollection } from '@/lib/db';
import { MessagesResponse } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wa_id: string }> }
) {
  try {
    const { wa_id } = await params;
    
    if (!wa_id) {
      return NextResponse.json(
        { success: false, error: 'wa_id is required' },
        { status: 400 }
      );
    }

    const collection = await getMessagesCollection();

    // Get all messages for this contact, sorted by timestamp
    const messages = await collection
      .find({ wa_id })
      .sort({ timestamp: 1 })
      .toArray();

    const response: MessagesResponse = {
      messages: messages.map(msg => ({
        ...msg,
        _id: msg._id?.toString(),
      })),
      total: messages.length
    };

    // Mark messages as read (simulate reading the chat)
    await collection.updateMany(
      { 
        wa_id,
        direction: 'incoming',
        status: { $ne: 'read' }
      },
      {
        $set: {
          status: 'read',
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error(`Error fetching messages:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
