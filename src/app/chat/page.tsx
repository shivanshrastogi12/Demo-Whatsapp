'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import { useAuth } from '@/lib/AuthContext';
import { ApiResponse, ChatsResponse, MessagesResponse } from '@/types';

const fetcher = (url: string) => {
  const token = localStorage.getItem('auth-token');
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => res.json());
};

export default function ChatPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch all chats
  const { data: chatsData, error: chatsError, mutate: mutateChats } = useSWR<ApiResponse<ChatsResponse>>(
    user ? '/api/messages' : null,
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true
    }
  );

  // Fetch messages for selected chat
  const { data: messagesData, error: messagesError, mutate: mutateMessages } = useSWR<ApiResponse<MessagesResponse>>(
    selectedChatId ? `/api/messages/${selectedChatId}` : null,
    fetcher,
    {
      refreshInterval: 2000, // Refresh every 2 seconds
      revalidateOnFocus: true
    }
  );

  const chats = chatsData?.success && chatsData.data ? chatsData.data.chats : [];
  const messages = messagesData?.success && messagesData.data ? messagesData.data.messages : [];
  const selectedChat = chats.find(chat => chat.wa_id === selectedChatId) || null;

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedChatId || isSending) return;

    setIsSending(true);
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          wa_id: selectedChatId,
          text,
        }),
      });

      if (response.ok) {
        // Refresh messages and chats to show the new message
        await mutateMessages();
        await mutateChats();
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Auto-select first chat if none selected
  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].wa_id);
    }
  }, [chats, selectedChatId]);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-whatsapp-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <div className="text-white px-4 py-3 flex items-center justify-between bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">WhatsApp Business</h1>
            <p className="text-sm text-green-100">+91 {user.phoneNumber}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{user.name || 'Business User'}</p>
            <p className="text-xs text-green-100">Professional Dashboard</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: always visible on mobile if no chat selected, always visible on desktop */}
        <div
          className={
            selectedChatId
              ? 'hidden w-full md:flex md:w-80 lg:w-96 transition-all duration-300'
              : 'flex w-full md:w-80 lg:w-96 transition-all duration-300'
          }
        >
          <ChatSidebar
            chats={chats}
            selectedChatId={selectedChatId}
            onChatSelect={handleChatSelect}
            isLoading={!chatsData && !chatsError}
          />
        </div>
        {/* Chat window: only visible if a chat is selected, always visible on desktop */}
        <div
          className={
            !selectedChatId
              ? 'hidden flex-1 md:flex transition-all duration-300'
              : 'flex flex-1 transition-all duration-300'
          }
        >
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={!messagesData && !messagesError && !!selectedChatId}
            isSending={isSending}
          />
        </div>
      </div>

      {/* Mobile Back Button */}
      {selectedChatId && (
        <Button
          onClick={() => setSelectedChatId(null)}
          className="md:hidden fixed top-20 left-4 z-50 bg-white/90 text-gray-700 hover:bg-white shadow-lg"
          size="sm"
          variant="ghost"
        >
          ← Back to Chats
        </Button>
      )}
    </div>
  );
}
