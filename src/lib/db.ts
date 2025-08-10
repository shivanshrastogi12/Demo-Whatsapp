import { MongoClient, Db, Collection } from 'mongodb';
import { ProcessedMessage, User } from '@/types';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Database helper functions
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('whatsapp');
}

export async function getMessagesCollection(): Promise<Collection<ProcessedMessage>> {
  const db = await getDatabase();
  return db.collection<ProcessedMessage>('processed_messages');
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDatabase();
  return db.collection<User>('users');
}

// Create indexes for better performance
export async function createIndexes() {
  try {
    const messagesCollection = await getMessagesCollection();
    const usersCollection = await getUsersCollection();
    
    // Create message indexes
    await messagesCollection.createIndexes([
      { key: { wa_id: 1, timestamp: -1 } },
      { key: { messageId: 1 }, unique: true },
      { key: { createdAt: -1 } },
      { key: { timestamp: -1 } },
    ]);
    
    // Create user indexes
    await usersCollection.createIndexes([
      { key: { phoneNumber: 1 }, unique: true },
      { key: { createdAt: -1 } },
    ]);
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating database indexes:', error);
  }
}
