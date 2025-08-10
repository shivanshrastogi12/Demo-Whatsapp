import { promises as fs } from 'fs';
import path from 'path';
import { getMessagesCollection, createIndexes } from './db';
import { WhatsAppWebhookPayload, ProcessedMessage } from '@/types';

const BUSINESS_PHONE = '918329446654';

export async function seedDatabaseFromPreloader() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Create indexes first
    await createIndexes();
    
    const collection = await getMessagesCollection();
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Read all JSON files from preloader folder
    const preloaderPath = path.join(process.cwd(), 'src', 'preloader');
    const files = await fs.readdir(preloaderPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`📂 Found ${jsonFiles.length} JSON files to process`);
    
    for (const file of jsonFiles) {
      const filePath = path.join(preloaderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const payload: WhatsAppWebhookPayload = JSON.parse(fileContent);
      
      console.log(`📄 Processing ${file}...`);
      
      // Process each entry in the payload
      for (const entry of payload.metaData.entry) {
        for (const change of entry.changes) {
          const { value } = change;
          
          // Process messages
          if (value.messages) {
            for (const message of value.messages) {
              if (message.type === 'text' && message.text) {
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
                  status: 'delivered',
                  direction: message.from === BUSINESS_PHONE ? 'outgoing' : 'incoming',
                  createdAt: new Date(payload.createdAt),
                  updatedAt: new Date(),
                };
                
                await collection.replaceOne(
                  { messageId: message.id },
                  processedMessage,
                  { upsert: true }
                );
                
                console.log(`  ✅ Added message from ${contactName}`);
              }
            }
          }
          
          // Process status updates
          if (value.statuses) {
            for (const status of value.statuses) {
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
              
              console.log(`  🔄 Updated status for message ${messageId} to ${status.status}`);
            }
          }
        }
      }
    }
    
    // Get final count
    const totalMessages = await collection.countDocuments();
    console.log(`🎉 Seeding completed! Total messages: ${totalMessages}`);
    
    return { success: true, totalMessages };
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
