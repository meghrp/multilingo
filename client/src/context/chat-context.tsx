'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatType, MessageType, GroupMember, Language } from '@/types';

// Mock data for initial development - would be replaced with API calls
import { 
  mockChats, 
  mockMessages, 
  mockUsers,
  mockMembers
} from '@/data/mock-data';

interface ChatContextType {
  // Chat related state
  chats: ChatType[];
  currentChatId: string | null;
  setCurrentChat: (chatId: string) => void;
  activeChat: ChatType | null;
  
  // Message related state
  messages: Record<string, MessageType[]>;
  sendMessage: (content: string) => void;
  
  // User related state
  currentUser: GroupMember;
  userLanguage: Language;
  setUserLanguage: (language: Language) => void;
  
  // Group related state
  activeChatMembers: GroupMember[];
  showGroupInfo: boolean;
  setShowGroupInfo: (show: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<ChatType[]>(mockChats);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageType[]>>(mockMessages);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  
  // Current user data - would come from auth in a real app
  const currentUser: GroupMember = mockUsers[0];
  
  // Get the active chat based on currentChatId
  const activeChat = currentChatId 
    ? chats.find(chat => chat.id === currentChatId) || null
    : null;
  
  // Get members of the active chat if it's a group
  const activeChatMembers = currentChatId && activeChat?.isGroup
    ? mockMembers[currentChatId] || []
    : currentChatId 
      ? [mockUsers.find(user => user.id === currentChatId) || mockUsers[0]]
      : [];
  
  // Set current chat and reset group info panel
  const setCurrentChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setShowGroupInfo(false);
    
    // Mark messages as read
    if (chatId) {
      const updatedChats = chats.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      );
      setChats(updatedChats);
    }
  };
  
  // Send a new message
  const sendMessage = (content: string) => {
    if (!currentChatId || !content.trim()) return;
    
    // In a real app, this would be generated on the server
    const newMessageId = `msg_${Date.now()}`;
    
    const newMessage: MessageType = {
      id: newMessageId,
      content: content,
      sender: currentUser.id,
      timestamp: new Date().toISOString(),
      isSystem: false,
    };
    
    // Add message to the current chat
    setMessages(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), newMessage]
    }));
    
    // Update last message in chat list
    const updatedChats = chats.map(chat => 
      chat.id === currentChatId 
        ? {
            ...chat,
            lastMessage: content,
            lastMessageTime: new Date().toISOString()
          }
        : chat
    );
    
    setChats(updatedChats);
    
    // In a real app, you would send this to the backend and handle translation
    // Simulate receiving a response after a delay (for demo purposes)
    setTimeout(() => {
      // This is just a mock response - in a real app responses would come from the server
      if (activeChat?.isGroup) {
        // Simulate another user in the group responding
        const respondingMember = activeChatMembers.find(member => 
          member.id !== currentUser.id && member.isOnline
        );
        
        if (respondingMember) {
          const responseMessage: MessageType = {
            id: `msg_${Date.now() + 1}`,
            content: `I got your message about "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`,
            sender: respondingMember.id,
            timestamp: new Date(Date.now() + 1000).toISOString(),
            isSystem: false,
          };
          
          setMessages(prev => ({
            ...prev,
            [currentChatId]: [...(prev[currentChatId] || []), responseMessage]
          }));
          
          const updatedChats = chats.map(chat => 
            chat.id === currentChatId 
              ? {
                  ...chat,
                  lastMessage: `${respondingMember.name}: ${responseMessage.content}`,
                  lastMessageTime: responseMessage.timestamp
                }
              : chat
          );
          
          setChats(updatedChats);
        }
      } else {
        // Direct message - simulate response
        const responseContent = `Thanks for your message: "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`;
        
        const responseMessage: MessageType = {
          id: `msg_${Date.now() + 1}`,
          content: responseContent,
          sender: currentChatId,
          timestamp: new Date(Date.now() + 1000).toISOString(),
          isSystem: false,
          // Simulate translation
          originalContent: `Gracias por tu mensaje: "${content.substring(0, 20)}${content.length > 20 ? '...' : ''}"`,
          originalLanguage: 'Spanish'
        };
        
        setMessages(prev => ({
          ...prev,
          [currentChatId]: [...(prev[currentChatId] || []), responseMessage]
        }));
        
        const updatedChats = chats.map(chat => 
          chat.id === currentChatId 
            ? {
                ...chat,
                lastMessage: responseContent,
                lastMessageTime: responseMessage.timestamp
              }
            : chat
        );
        
        setChats(updatedChats);
      }
    }, 1500);
  };
  
  // Simulate notifications from other chats
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChatIndex = Math.floor(Math.random() * chats.length);
      const randomChat = chats[randomChatIndex];
      
      // Don't notify for active chat
      if (randomChat.id === currentChatId) return;
      
      // 20% chance of getting a new message
      if (Math.random() > 0.8) {
        const updatedChats = chats.map((chat, index) => 
          index === randomChatIndex 
            ? {
                ...chat,
                lastMessage: `New random message ${Date.now()}`,
                lastMessageTime: new Date().toISOString(),
                unreadCount: chat.unreadCount + 1
              }
            : chat
        );
        
        setChats(updatedChats);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [chats, currentChatId]);
  
  return (
    <ChatContext.Provider 
      value={{
        chats,
        currentChatId,
        setCurrentChat,
        activeChat,
        messages,
        sendMessage,
        currentUser,
        userLanguage,
        setUserLanguage,
        activeChatMembers,
        showGroupInfo,
        setShowGroupInfo
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 