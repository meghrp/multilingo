'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Chat } from './chat';
import { GroupInfo } from './chat/group-info';
import { useChat } from '@/context/chat-context';

export function ChatLayout() {
  const { activeChat, showGroupInfo, setShowGroupInfo } = useChat();
  
  const toggleGroupInfo = () => {
    setShowGroupInfo(!showGroupInfo);
  };
  
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Chat area */}
      <div className="flex-1">
        <Chat onToggleGroupInfo={toggleGroupInfo} />
      </div>
      
      {/* Group info sidebar - only shown for group chats when toggled */}
      {showGroupInfo && activeChat?.isGroup && (
        <div className="w-80 flex-shrink-0">
          <GroupInfo onClose={toggleGroupInfo} />
        </div>
      )}
    </div>
  );
} 