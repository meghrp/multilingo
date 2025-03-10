'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatType, MessageType, GroupMember, Language } from '@/types';
import { conversationApi, messageApi, userApi } from '@/lib/api-service';
import websocketService from '@/lib/websocket-service';
import { useAuth } from './auth-context';

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
  
  // Loading states
  isLoading: boolean;
  
  // Conversation creation
  createConversation: (userIds: string[]) => Promise<string>;
  addUserToConversation: (conversationId: string, username: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageType[]>>({});
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  const [activeChatMembers, setActiveChatMembers] = useState<GroupMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Current user data from authentication context
  const currentUser: GroupMember = user ? {
    id: user.id.toString(),
    name: user.name,
    avatar: '/avatars/user-1.png', // Default avatar
    isAdmin: false,
    isOnline: true,
    language: user.preferredLanguage as Language
  } : {
    id: 'guest',
    name: 'Guest',
    avatar: '/avatars/user-1.png',
    isAdmin: false,
    isOnline: true,
    language: 'English'
  };
  
  // Get the active chat based on currentChatId
  const activeChat = currentChatId 
    ? chats.find(chat => chat.id === currentChatId) || null
    : null;
  
  // Load conversations when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Connect to WebSocket when authenticated
      websocketService.connect()
        .then(() => {
          console.log('WebSocket connected successfully');
          // Load conversations after WebSocket connection is established
          loadConversations();
        })
        .catch(error => {
          console.error('WebSocket connection failed:', error);
          // Still load conversations even if WebSocket fails
          loadConversations();
        });
    } else {
      setChats([]);
      setMessages({});
    }
    
    // Disconnect WebSocket on cleanup
    return () => {
      if (isAuthenticated) {
        websocketService.disconnect();
      }
    };
  }, [isAuthenticated]);

  // Load conversations from API
  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const conversationsData = await conversationApi.getConversations();
      console.log('Fetched conversations:', conversationsData);
      
      // Map the API response to our ChatType format
      const formattedChats = (conversationsData as any[]).map(conv => ({
        id: conv.id.toString(),
        name: conv.name || (conv.type === 'GROUP' ? 'Group Chat' : 'Direct Chat'),
        avatar: conv.type === 'GROUP' ? '/avatars/group-1.png' : '/avatars/user-2.png',
        lastMessage: 'No messages yet', // We'll update this when we implement message fetching
        lastMessageTime: conv.lastMessageAt || new Date().toISOString(),
        unreadCount: 0, // We'll implement this feature later
        isGroup: conv.type === 'GROUP',
        isOnline: true, // We'll need a separate API to get online status
        members: conv.users?.length || 0
      }));
      
      console.log('Formatted chats:', formattedChats);
      setChats(formattedChats);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set current chat and load messages
  const setCurrentChat = async (chatId: string) => {
    setCurrentChatId(chatId);
    setShowGroupInfo(false);
    setIsLoading(true);
    
    // Mark messages as read
    if (chatId) {
      const updatedChats = chats.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      );
      setChats(updatedChats);
      
      // Load messages if not already loaded
      if (!messages[chatId] && isAuthenticated) {
        try {
          const messagesData = await messageApi.getMessages(chatId);
          
          // Map API response to our MessageType format
          const formattedMessages = (messagesData as any[]).map(msg => ({
            id: msg.id.toString(),
            content: msg.content,
            sender: msg.sender.id.toString(),
            timestamp: msg.timestamp || new Date().toISOString(),
            isSystem: msg.messageType === 'SYSTEM',
            originalContent: msg.originalContent,
            originalLanguage: msg.originalLanguage,
            conversationId: chatId
          }));
          
          setMessages(prev => ({
            ...prev,
            [chatId]: formattedMessages
          }));
        } catch (error) {
          console.error('Error loading messages:', error);
          setMessages(prev => ({
            ...prev,
            [chatId]: []
          }));
        }
      }
      
      // Subscribe to conversation WebSocket topic
      if (isAuthenticated) {
        try {
          websocketService.subscribeToConversation(chatId);
        } catch (error) {
          console.warn('Error subscribing to conversation:', error);
        }
      }
      
      // Load conversation members
      if (isAuthenticated) {
        try {
          const conversationData: any = await conversationApi.getConversation(chatId);
          
          if (conversationData && conversationData.participants) {
            // Map API participants to our GroupMember format
            const members = await Promise.all(conversationData.participants.map(async (participant: any) => {
              try {
                // Try to get additional user details
                const userData = await userApi.getUserByUsername(participant.username);
                return {
                  id: participant.id.toString(),
                  name: (userData as any).name || participant.username,
                  avatar: '/avatars/user-' + (Math.floor(Math.random() * 5) + 1) + '.png',
                  isAdmin: participant.isAdmin || false,
                  isOnline: true,
                  language: (userData as any).preferredLanguage || 'English'
                };
              } catch (error) {
                // Fallback if we can't get user details
                return {
                  id: participant.id.toString(),
                  name: participant.username,
                  avatar: '/avatars/user-' + (Math.floor(Math.random() * 5) + 1) + '.png',
                  isAdmin: participant.isAdmin || false,
                  isOnline: true,
                  language: 'English'
                };
              }
            }));
            
            setActiveChatMembers(members);
          } else {
            setActiveChatMembers([]);
          }
        } catch (error) {
          console.error('Error loading conversation members:', error);
          setActiveChatMembers([]);
        }
      } else {
        // For direct messages, just include the other user
        setActiveChatMembers(
          activeChat 
            ? [{ 
                id: activeChat.id,
                name: activeChat.name,
                avatar: activeChat.avatar,
                isAdmin: false,
                isOnline: activeChat.isOnline || false,
                language: 'English'
              }] 
            : []
        );
      }
    }
    
    setIsLoading(false);
  };
  
  // Set up WebSocket message listener
  useEffect(() => {
    if (isAuthenticated) {
      const handleNewMessage = (message: MessageType) => {
        const chatId = message.conversationId || currentChatId;
        
        if (!chatId) return;
        
        console.log('Received new message via WebSocket:', message);
        
        // Add message to the current chat
        setMessages(prev => {
          // Check if we already have this message (to avoid duplicates)
          const existingMessages = prev[chatId] || [];
          const messageExists = existingMessages.some(m => 
            m.id === message.id || 
            (m.id.startsWith('temp_') && m.content === message.content && m.sender === message.sender)
          );
          
          if (messageExists) {
            // Replace temp message with real one if needed
            return {
              ...prev,
              [chatId]: existingMessages.map(m => 
                (m.id.startsWith('temp_') && m.content === message.content && m.sender === message.sender)
                  ? message
                  : m
              )
            };
          } else {
            // Add as new message
            return {
              ...prev,
              [chatId]: [...existingMessages, message]
            };
          }
        });
        
        // Update last message in chat list
        setChats(prev => 
          prev.map(chat => 
            chat.id === chatId 
              ? {
                  ...chat,
                  lastMessage: message.content,
                  lastMessageTime: message.timestamp,
                  // Increment unread count if not the current chat
                  unreadCount: chat.id === currentChatId 
                    ? 0 
                    : chat.unreadCount + 1
                }
              : chat
          )
        );
      };
      
      // Add global message listener
      websocketService.addMessageListener('global', handleNewMessage);
      
      // Also subscribe to current chat if available
      if (currentChatId) {
        websocketService.addMessageListener(currentChatId, handleNewMessage);
        websocketService.subscribeToConversation(currentChatId);
      }
      
      return () => {
        // Remove listeners on cleanup
        websocketService.removeMessageListener('global', handleNewMessage);
        if (currentChatId) {
          websocketService.removeMessageListener(currentChatId, handleNewMessage);
        }
      };
    }
  }, [isAuthenticated, currentChatId]);
  
  // Send a new message
  const sendMessage = async (content: string) => {
    if (!currentChatId || !content.trim()) return;
    
    if (isAuthenticated) {
      try {
        // Create temporary message optimistically
        const tempId = `temp_${Date.now()}`;
        const tempMessage: MessageType = {
          id: tempId,
          content: content,
          sender: currentUser.id,
          timestamp: new Date().toISOString(),
          isSystem: false,
          conversationId: currentChatId
        };
        
        // Add to messages immediately (optimistic update)
        setMessages(prev => ({
          ...prev,
          [currentChatId]: [...(prev[currentChatId] || []), tempMessage]
        }));
        
        // Also update the chat list with last message
        setChats(prev => 
          prev.map(chat => 
            chat.id === currentChatId 
              ? {
                  ...chat,
                  lastMessage: content,
                  lastMessageTime: tempMessage.timestamp
                }
              : chat
          )
        );
        
        // Send via WebSocket for real-time delivery
        try {
          websocketService.sendMessage(currentChatId, content);
          console.log('Message sent via WebSocket');
        } catch (wsError) {
          console.warn('WebSocket send failed, using REST API as fallback:', wsError);
          
          // If WebSocket fails, use REST API as fallback
          const response = await messageApi.sendMessage(currentChatId, content);
          
          if (response) {
            console.log('Message sent via REST API');
            const realMessage = {
              id: (response as any).id.toString(),
              content: (response as any).content,
              sender: (response as any).sender.id.toString(),
              timestamp: (response as any).timestamp,
              isSystem: (response as any).messageType === 'SYSTEM',
              originalContent: (response as any).originalContent,
              originalLanguage: (response as any).originalLanguage,
              conversationId: currentChatId
            };
            
            // Replace temp message with real one
            setMessages(prev => ({
              ...prev,
              [currentChatId]: prev[currentChatId].map(msg => 
                msg.id === tempId ? realMessage : msg
              )
            }));
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Remove temp message on error
        setMessages(prev => ({
          ...prev,
          [currentChatId]: prev[currentChatId].filter(msg => !msg.id.startsWith('temp_'))
        }));
      }
    }
  };
  
  // Create a new conversation
  const createConversation = async (userIds: string[]): Promise<string> => {
    setIsLoading(true);
    try {
      const conversationId = await conversationApi.createConversation(userIds);
      await loadConversations(); // Reload conversations to get the new one
      setIsLoading(false);
      return (conversationId as any).toString();
    } catch (error) {
      console.error('Error creating conversation:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('For input string')) {
          throw new Error('Invalid username format. Please use only valid usernames.');
        } else if (error.message.includes('400')) {
          throw new Error('Bad request. Please check that all usernames exist in the system.');
        } else if (error.message.includes('401') || error.message.includes('403')) {
          throw new Error('Authentication error. Please log in again.');
        }
      }
      
      setIsLoading(false);
      throw error;
    }
  };
  
  // Add a user to a conversation
  const addUserToConversation = async (conversationId: string, username: string): Promise<void> => {
    setIsLoading(true);
    try {
      await conversationApi.addUserToConversation(conversationId, username);
      
      // If this is the current conversation, reload members
      if (conversationId === currentChatId) {
        const conversationData: any = await conversationApi.getConversation(conversationId);
        if (conversationData && conversationData.participants) {
          // Map API participants to our GroupMember format
          const members = conversationData.participants.map((participant: any) => ({
            id: participant.id.toString(),
            name: participant.username,
            avatar: '/avatars/user-' + (Math.floor(Math.random() * 5) + 1) + '.png',
            isAdmin: participant.isAdmin || false,
            isOnline: true,
            language: 'English'
          }));
          
          setActiveChatMembers(members);
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error adding user to conversation:', error);
      setIsLoading(false);
      throw error;
    }
  };
  
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
        setShowGroupInfo,
        isLoading,
        createConversation,
        addUserToConversation
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