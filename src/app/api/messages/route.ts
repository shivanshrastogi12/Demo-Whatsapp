import { NextResponse } from 'next/server';
import { getMessagesCollection } from '@/lib/db';
import { Chat, ChatsResponse } from '@/types';

export async function GET() {
  try {
    const collection = await getMessagesCollection();

    // Aggregate to get latest message and unread count for each contact
    const pipeline = [
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$wa_id',
          contactName: { $first: '$contactName' },
          lastMessage: { $first: '$text' },
          lastMessageTime: { $first: '$timestamp' },
          totalMessages: { $sum: 1 },
          // Count unread messages (for demo purposes, we'll assume messages with status 'delivered' are unread)
          unreadCount: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $eq: ['$direction', 'incoming'] },
                    { $ne: ['$status', 'read'] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          wa_id: '$_id',
          contactName: 1,
          lastMessage: 1,
          lastMessageTime: 1,
          unreadCount: 1,
          _id: 0
        }
      },
      {
        $sort: { lastMessageTime: -1 }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();

    const chats: Chat[] = result.map(chat => ({
      wa_id: chat.wa_id,
      contactName: chat.contactName,
      lastMessage: chat.lastMessage,
      lastMessageTime: chat.lastMessageTime,
      unreadCount: chat.unreadCount,
    }));

    const response: ChatsResponse = {
      chats,
      total: chats.length
    };

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
