import { NextRequest, NextResponse } from 'next/server';
import { getMessagesCollection, createIndexes } from '@/lib/db';
import { WhatsAppWebhookPayload, ProcessedMessage } from '@/types';

// Business phone number for comparison
const BUSINESS_PHONE = process.env.WHATSAPP_BUSINESS_PHONE || '918329446654';

export async function POST(request: NextRequest) {
  try {
    const payload: WhatsAppWebhookPayload = await request.json();
    
    if (!payload || payload.payload_type !== 'whatsapp_webhook') {
      return NextResponse.json(
        { success: false, error: 'Invalid payload type' },
        { status: 400 }
      );
    }

    const collection = await getMessagesCollection();
    
    // Ensure indexes are created
    await createIndexes();

    for (const entry of payload.metaData.entry) {
      for (const change of entry.changes) {
        const { value } = change;

        // Process messages
        if (value.messages) {
          for (const message of value.messages) {
            if (message.type === 'text' && message.text) {
              // Find contact info
              const contact = value.contacts?.find(c => c.wa_id === message.from);
              const contactName = contact?.profile?.name || message.from;

              const processedMessage: ProcessedMessage = {
                messageId: message.id,
                wa_id: message.from,
                contactName,
                from: message.from,
                to: value.metadata.display_phone_number,
                text: message.text.body,
                type: message.type,
                timestamp: new Date(parseInt(message.timestamp) * 1000),
                status: 'delivered', // Default status for incoming messages
                direction: message.from === BUSINESS_PHONE ? 'outgoing' : 'incoming',
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              // Upsert message (update if exists, insert if new)
              await collection.replaceOne(
                { messageId: message.id },
                processedMessage,
                { upsert: true }
              );
            }
          }
        }

        // Process status updates
        if (value.statuses) {
          for (const status of value.statuses) {
            // Update message status using either id or meta_msg_id
            const messageId = status.meta_msg_id || status.id;
            
            await collection.updateOne(
              { messageId },
              {
                $set: {
                  status: status.status,
                  updatedAt: new Date(),
                }
              }
            );
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
