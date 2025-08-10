import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { ProcessedMessage, Chat } from '@/types';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  selectedChat: Chat | null;
  messages: ProcessedMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isSending?: boolean;
}

const BUSINESS_PHONE = '918329446654';

export default function ChatWindow({
  selectedChat,
  messages,
  onSendMessage,
  isLoading = false,
  isSending = false
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && !isSending) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23128C7E' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </div>
        <div className="text-center text-gray-600 z-10 max-w-md px-6">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-light mb-4 text-gray-800">WhatsApp Business</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Select a conversation to start messaging your customers
          </p>
          <div className="mt-8 text-sm text-gray-500">
            <p>💬 Send and receive messages instantly</p>
            <p>📱 Manage all your business conversations</p>
            <p>🚀 Grow your business with better communication</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs text-center relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setShowProfile(false)}>&times;</button>
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarFallback className="text-white text-3xl font-bold" style={{ backgroundColor: '#128C7E' }}>
                {selectedChat.contactName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{selectedChat.contactName}</h2>
            <p className="text-lg text-green-600 font-semibold mb-2">+91 {selectedChat.wa_id}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-2">
              <p className="text-sm text-gray-700">Last message:</p>
              <p className="text-gray-600 text-sm mt-1">{selectedChat.lastMessage}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Message</Button>
              <Button variant="outline" className="flex-1">Call</Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-[#f0f2f5]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 cursor-pointer" onClick={() => setShowProfile(true)}>
                <AvatarFallback className="text-white font-bold text-lg" style={{ backgroundColor: '#128C7E' }}>
                  {selectedChat.contactName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-semibold text-[16px] text-gray-900">{selectedChat.contactName}</h2>
              <p className="text-xs text-gray-500">+91 {selectedChat.wa_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-[#efeae2] whatsapp-pattern">
          <ScrollArea className="flex-1 px-4 py-2" ref={scrollAreaRef}>
            {isLoading ? (
              <div className="space-y-4 py-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={cn(
                    "flex",
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  )}>
                    <div className={cn(
                      "max-w-xs p-3 rounded-lg animate-pulse",
                      i % 2 === 0 ? "bg-muted" : "bg-muted/70"
                    )}>
                      <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <p>No messages yet</p>
                  <p className="text-sm">Send a message to start the conversation</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-4 min-h-full">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.messageId}
                    message={message}
                    isOwn={message.from === BUSINESS_PHONE}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
          {/* Message Input */}
          <div className="p-4 border-t border-border bg-[#f7f7fa]">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Textarea
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="min-h-[44px] max-h-32 resize-none border-input focus:ring-whatsapp-primary focus:border-whatsapp-primary"
                  disabled={isSending}
                  rows={1}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSending}
                className="text-white h-11 w-11 rounded-full p-0 flex items-center justify-center hover:opacity-90 shadow-lg"
                style={{ backgroundColor: '#25D366' }}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            {isSending && (
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Sending message...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
// ...existing code ends above, remove all trailing duplicate code...
