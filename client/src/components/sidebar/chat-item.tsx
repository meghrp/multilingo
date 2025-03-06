'use client';

import { ChatType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

interface ChatItemProps {
  chat: ChatType;
  isActive: boolean;
  onClick: () => void;
}

export function ChatItem({ chat, isActive, onClick }: ChatItemProps) {
  // Format timestamp to display only time if today, otherwise show date
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
        isActive 
          ? 'bg-zinc-100 dark:bg-zinc-700' 
          : 'hover:bg-zinc-100/70 dark:hover:bg-zinc-700/50'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback className="bg-rose-100 text-rose-500 dark:bg-rose-900 dark:text-rose-200">
            {chat.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Online indicator */}
        {chat.isOnline && !chat.isGroup && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-800 rounded-full"></span>
        )}
        
        {/* Group indicator */}
        {chat.isGroup && (
          <div className="absolute -bottom-1 -right-1 bg-zinc-100 dark:bg-zinc-700 rounded-full w-6 h-6 border-2 border-white dark:border-zinc-800 flex items-center justify-center">
            <Users className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-medium truncate ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
            {chat.name}
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap pl-2">
            {formatTime(chat.lastMessageTime)}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs truncate text-zinc-500 dark:text-zinc-400 max-w-[180px]">
            {chat.lastMessage}
          </p>
          
          {/* Unread badge */}
          {chat.unreadCount > 0 && (
            <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-rose-500 text-white text-xs rounded-full px-1">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 