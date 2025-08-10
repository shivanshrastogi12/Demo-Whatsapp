import { NextRequest, NextResponse } from 'next/server';
import { getMessagesCollection } from '@/lib/db';
import { ProcessedMessage, SendMessageRequest } from '@/types';

const BUSINESS_PHONE = process.env.WHATSAPP_BUSINESS_PHONE || '918329446654';

export async function POST(request: NextRequest) {
  try {
    const body: SendMessageRequest = await request.json();
    
    if (!body.wa_id || !body.text) {
      return NextResponse.json(
        { success: false, error: 'wa_id and text are required' },
        { status: 400 }
      );
    }

    const collection = await getMessagesCollection();

    // Find the contact name from existing messages
    const existingMessage = await collection.findOne(
      { wa_id: body.wa_id },
      { projection: { contactName: 1 } }
    );

    const contactName = existingMessage?.contactName || body.wa_id;

    // Generate a unique message ID (in real implementation, this would come from WhatsApp API)
    const messageId = `wamid.${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const message: ProcessedMessage = {
      messageId,
      wa_id: body.wa_id,
      contactName,
      from: BUSINESS_PHONE,
      to: body.wa_id,
      text: body.text,
      type: body.type || 'text',
      timestamp: new Date(),
      status: 'sent',
      direction: 'outgoing',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new message
    await collection.insertOne(message);

    // Simulate status updates after a delay (in real implementation, these would come via webhook)
    setTimeout(async () => {
      try {
        // Update to delivered after 1 second
        await collection.updateOne(
          { messageId },
          { 
            $set: { 
              status: 'delivered',
              updatedAt: new Date()
            }
          }
        );

        // Update to read after 5 seconds
        setTimeout(async () => {
          try {
            await collection.updateOne(
              { messageId },
              { 
                $set: { 
                  status: 'read',
                  updatedAt: new Date()
                }
              }
            );
          } catch (error) {
            console.error('Error updating message to read:', error);
          }
        }, 4000);
      } catch (error) {
        console.error('Error updating message to delivered:', error);
      }
    }, 1000);

    return NextResponse.json({
      success: true,
      data: {
        messageId: message.messageId,
        message: 'Message sent successfully'
      }
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
