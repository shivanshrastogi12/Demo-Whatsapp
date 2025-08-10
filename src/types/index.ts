// WhatsApp API payload types
export interface WhatsAppWebhookPayload {
  payload_type: 'whatsapp_webhook';
  _id: string;
  metaData: {
    entry: Array<{
      changes: Array<{
        field: 'messages';
        value: {
          messaging_product: 'whatsapp';
          metadata: {
            display_phone_number: string;
            phone_number_id: string;
          };
          contacts?: Array<{
            profile: {
              name: string;
            };
            wa_id: string;
          }>;
          messages?: Array<WhatsAppMessage>;
          statuses?: Array<WhatsAppStatus>;
        };
      }>;
      id: string;
    }>;
    gs_app_id: string;
    object: 'whatsapp_business_account';
    startedAt?: string;
    completedAt?: string;
    executed?: boolean;
  };
  createdAt: string;
  startedAt: string;
  completedAt: string;
  executed: boolean;
}

export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: {
    body: string;
  };
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  image?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  document?: {
    id: string;
    filename: string;
    mime_type: string;
    sha256: string;
  };
}

export interface WhatsAppStatus {
  conversation?: {
    id: string;
    origin: {
      type: 'user_initiated' | 'business_initiated';
    };
    expiration_timestamp?: string;
  };
  gs_id: string;
  id: string;
  meta_msg_id: string;
  recipient_id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  pricing?: {
    billable: boolean;
    category: string;
    pricing_model: string;
    type: string;
  };
}

// Processed message types for our database
export interface ProcessedMessage {
  _id?: string;
  messageId: string;
  wa_id: string;
  contactName: string;
  from: string;
  to: string;
  text: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  direction: 'incoming' | 'outgoing';
  createdAt: Date;
  updatedAt: Date;
}

// Chat types for UI
export interface Chat {
  wa_id: string;
  contactName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  avatar?: string;
}

export interface ChatMessage extends ProcessedMessage {
  isOwn: boolean;
  statusIcon: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatsResponse {
  chats: Chat[];
  total: number;
}

export interface MessagesResponse {
  messages: ProcessedMessage[];
  total: number;
}

// Message send request
export interface SendMessageRequest {
  wa_id: string;
  text: string;
  type?: 'text';
}

// User authentication types
export interface User {
  _id?: string;
  phoneNumber: string;
  name?: string;
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// OTP verification request
export interface OTPRequest {
  phoneNumber: string;
  otp: string;
}

// Login request
export interface LoginRequest {
  phoneNumber: string;
}

// Auth response
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
  error?: string;
}
