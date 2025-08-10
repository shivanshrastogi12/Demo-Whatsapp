# WhatsApp Web-like Messaging Interface

🚀 **A complete real-time WhatsApp Business messaging dashboard built with Next.js 14, MongoDB, and shadcn/ui**

## ✨ Features

- 📱 **WhatsApp Web UI Clone** - Pixel-perfect replica of WhatsApp Web interface
- 🔄 **Real-time Updates** - SWR-powered data fetching with automatic revalidation
- 📩 **Message Status Tracking** - Sent, delivered, and read status indicators
- 🗃️ **MongoDB Integration** - Efficient storage and retrieval of messages
- 🎨 **shadcn/ui Components** - Beautiful, accessible UI components
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **Fast Performance** - Next.js 14 App Router with optimized rendering
- 🔒 **Type-Safe** - Full TypeScript support with strict typing
- 🌐 **Deployment Ready** - Ready for Vercel, Render, or any cloud platform

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB Atlas
- **UI Library:** shadcn/ui + Tailwind CSS
- **Data Fetching:** SWR
- **Language:** TypeScript
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (free tier works)
- Git

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd whatsapp

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/whatsapp?retryWrites=true&w=majority
WHATSAPP_BUSINESS_PHONE=918329446654
```

### 3. Database Setup

```bash
# Start the development server
npm run dev

# In another terminal, seed the database with sample data
curl -X POST http://localhost:3000/api/seed
```

### 4. Open the App

Visit [http://localhost:3000](http://localhost:3000) to see your WhatsApp Web clone!

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── messages/
│   │   │   ├── webhook/route.ts    # WhatsApp webhook handler
│   │   │   ├── send/route.ts       # Send message API
│   │   │   ├── [wa_id]/route.ts    # Get messages for specific contact
│   │   │   └── route.ts            # Get all chats
│   │   └── seed/route.ts           # Database seeder
│   ├── globals.css                 # Global styles + shadcn config
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main chat interface
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── ChatSidebar.tsx            # Chat list sidebar
│   ├── ChatWindow.tsx             # Main chat interface
│   └── MessageBubble.tsx          # Individual message component
├── lib/
│   ├── db.ts                      # MongoDB connection
│   ├── seedData.ts                # Data seeding utility
│   ├── statusIcons.ts             # WhatsApp status utilities
│   └── utils.ts                   # Utility functions
├── preloader/                      # Sample WhatsApp webhook JSON files
└── types/
    └── index.ts                   # TypeScript type definitions
```

## 📚 API Endpoints

### 🔗 Webhook Processing
```
POST /api/messages/webhook
```
Processes incoming WhatsApp webhook payloads, extracting messages and status updates.

### 💬 Get All Chats
```
GET /api/messages
```
Returns all conversations grouped by contact with latest message info.

### 📖 Get Chat Messages
```
GET /api/messages/[wa_id]
```
Returns full message history for a specific contact.

### 📤 Send Message
```
POST /api/messages/send
```
Sends a new message (demo mode - stores in database).

### 🌱 Seed Database
```
POST /api/seed
```
Populates database with sample data from preloader files (development only).

## 🎨 UI Components

### ChatSidebar
- Contact list with avatars
- Last message preview
- Unread message badges
- Search functionality
- Real-time updates

### ChatWindow
- WhatsApp-style message bubbles
- Message status indicators (✓, ✓✓, ✓✓ blue)
- Auto-scroll to latest messages
- Typing indicator
- Send button with Enter key support

### MessageBubble
- Incoming/outgoing message styling
- Timestamp display
- Status icons for sent messages
- Hover tooltips

## 🔄 Real-time Updates

The app uses SWR for efficient data fetching with:
- **5-second refresh** for chat list
- **2-second refresh** for active chat messages
- **Focus revalidation** when user returns to tab
- **Optimistic updates** for sent messages

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add Environment Variables:**
   - `MONGODB_URI`
   - `WHATSAPP_BUSINESS_PHONE`
4. **Deploy** ✨

### Other Platforms

This app works on any Node.js hosting platform:
- Render
- Railway
- Netlify
- DigitalOcean App Platform

## 🧪 Testing with Sample Data

The `src/preloader/` folder contains sample WhatsApp webhook payloads:
- `conversation_1_message_1.json` - Incoming message from Ravi Kumar
- `conversation_1_message_2.json` - Outgoing response
- `conversation_1_status_*.json` - Status updates
- `conversation_2_*` - Second conversation with Neha Joshi

Run the seeder to populate your database:
```bash
curl -X POST http://localhost:3000/api/seed
```

## 🔧 Configuration

### MongoDB Schema

Messages are stored with the following structure:
```typescript
{
  messageId: string;      // WhatsApp message ID
  wa_id: string;         // Contact WhatsApp ID
  contactName: string;   // Contact display name
  from: string;          // Sender phone number
  to: string;            // Recipient phone number
  text: string;          // Message content
  type: 'text';          // Message type
  timestamp: Date;       // Message timestamp
  status: 'sent' | 'delivered' | 'read';
  direction: 'incoming' | 'outgoing';
  createdAt: Date;
  updatedAt: Date;
}
```

### Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string
- `WHATSAPP_BUSINESS_PHONE` - Your business phone number
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](../../issues) page
2. Ensure your MongoDB connection string is correct
3. Verify all environment variables are set
4. Check the browser console for errors

---

**Built with ❤️ using Next.js 14, shadcn/ui, and MongoDB**
