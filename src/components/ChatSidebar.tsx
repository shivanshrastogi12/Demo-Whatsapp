'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Chat } from '@/types';
import { formatTime } from '@/lib/statusIcons';
import { cn } from '@/lib/utils';
import { MessageCircle, Search, Phone, Video, User, X } from 'lucide-react';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  isLoading?: boolean;
}

export default function ChatSidebar({
  chats,
  selectedChatId,
  onChatSelect,
  isLoading = false
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Chat | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredChats = chats.filter(chat =>
    chat.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.wa_id.includes(searchQuery)
  );

  const handleProfileClick = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProfile(chat);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setSelectedProfile(null);
  };

  if (isLoading) {
    return (
      <div className="w-80 border-r border-border bg-muted/20">
        <div className="p-4">
          <div className="h-10 bg-muted rounded animate-pulse mb-4"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-border bg-[#f0f2f5] flex flex-col h-full shadow-lg">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border text-white bg-gradient-to-r from-green-600 to-green-700 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">WhatsApp Business</h1>
              <p className="text-xs text-green-100">Professional Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border bg-[#f6f6f6]">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full px-3 py-2 bg-[#ececec] border border-[#ececec] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-whatsapp-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {filteredChats.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? 'No chats found' : 'No conversations yet'}
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.wa_id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all group hover:bg-[#e6e6e6]",
                  selectedChatId === chat.wa_id && "bg-[#d9fdd3]"
                )}
                onClick={() => onChatSelect(chat.wa_id)}
              >
                <div className="relative">
                  <Avatar
                    className="h-12 w-12 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-green-400 transition-all"
                    onClick={(e) => handleProfileClick(chat, e)}
                  >
                    <AvatarFallback className="text-white font-bold text-lg" style={{ backgroundColor: '#128C7E' }}>
                      {chat.contactName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[15px] truncate text-gray-900">
                      {chat.contactName}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2 font-medium">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-gray-600 truncate leading-relaxed max-w-[120px]">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge
                        variant="default"
                        className="text-white ml-2 h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: '#25D366' }}
                      >
                        {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={closeProfile}>
        <DialogContent className="sm:max-w-md">
          {selectedProfile && (
            <>
              <DialogHeader className="text-center pb-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-white text-3xl font-bold" style={{ backgroundColor: '#128C7E' }}>
                        {selectedProfile.contactName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedProfile.contactName}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone Number</p>
                      <p className="text-lg font-semibold text-green-600">+91 {selectedProfile.wa_id}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Message</p>
                      <p className="text-sm text-gray-600">{selectedProfile.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(selectedProfile.lastMessageTime)}</p>
                    </div>
                  </div>
                </div>

                {selectedProfile.unreadCount > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-500">
                        {selectedProfile.unreadCount}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium text-green-800">Unread Messages</p>
                        <p className="text-sm text-green-600">You have {selectedProfile.unreadCount} unread message{selectedProfile.unreadCount > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      onChatSelect(selectedProfile.wa_id);
                      closeProfile();
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
