'use client';

import { useRef, useState, useEffect } from 'react';
import { useChat } from '@/context/chat-context';
import { MessageBubble } from './message-bubble';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Info, 
  Users, 
  ChevronRight, 
  Globe,
  MessageSquare
} from 'lucide-react';
import { Language } from '@/types';

// Helper to group messages by date
const groupMessagesByDate = (messages: any[]) => {
  const groups: Record<string, any[]> = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
    
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    
    groups[dateStr].push(message);
  });
  
  return Object.entries(groups);
};

interface ChatProps {
  onToggleGroupInfo: () => void;
}

export function Chat({ onToggleGroupInfo }: ChatProps) {
  const { 
    activeChat, 
    messages, 
    currentChatId, 
    sendMessage, 
    currentUser,
    activeChatMembers,
    userLanguage,
    setUserLanguage
  } = useChat();
  
  const [messageInput, setMessageInput] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Languages available in the app
  const languages: Language[] = [
    'English', 'Spanish', 'French', 'German', 
    'Japanese', 'Chinese', 'Korean', 'Russian'
  ];
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentChatId]);
  
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput.trim());
      setMessageInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // If no active chat, show placeholder
  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center p-6 max-w-md">
          <div className="mb-4 mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
            Start a conversation
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Select a chat from the sidebar or start a new conversation to begin messaging
          </p>
        </div>
      </div>
    );
  }
  
  const currentMessages = currentChatId ? messages[currentChatId] || [] : [];
  const messageGroups = groupMessagesByDate(currentMessages);
  
  // Find online members count for group chats
  const onlineMembersCount = activeChat.isGroup 
    ? activeChatMembers.filter(member => member.isOnline).length
    : 0;
    
  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* Chat header */}
      <div className="bg-white dark:bg-zinc-800 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
          <AvatarFallback className="bg-rose-100 text-rose-500 dark:bg-rose-900 dark:text-rose-200">
            {activeChat.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              {activeChat.name}
            </h2>
            {activeChat.isGroup && (
              <div 
                className="ml-2 px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center"
              >
                <Users className="w-3 h-3 mr-1" />
                {activeChat.members}
              </div>
            )}
          </div>
          
          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center">
            {activeChat.isGroup ? (
              <>
                <span className="bg-green-500 w-1.5 h-1.5 rounded-full inline-block mr-1.5"></span>
                {onlineMembersCount} online
              </>
            ) : (
              <>
                <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1.5 
                  ${activeChat.isOnline ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
                </span>
                {activeChat.isOnline ? 'Online' : 'Offline'}
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Globe className="h-5 w-5" />
          </Button>
          
          {activeChat.isGroup && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleGroupInfo}
              className="rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Info className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Language selector */}
      {showLanguageSelector && (
        <div className="bg-white dark:bg-zinc-800 py-2 px-4 border-b border-zinc-200 dark:border-zinc-700">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Select your preferred language:
          </p>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <button
                key={language}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  userLanguage === language 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200' 
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                }`}
                onClick={() => {
                  setUserLanguage(language);
                  setShowLanguageSelector(false);
                }}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messageGroups.length > 0 ? (
          messageGroups.map(([date, dateMessages]) => (
            <div key={date} className="mb-6">
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full text-zinc-500 dark:text-zinc-400">
                  {date}
                </span>
              </div>
              
              <div className="space-y-3">
                {dateMessages.map((message: any) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isCurrentUser={message.sender === currentUser.id}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-6">
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full inline-flex mb-4">
                <ChevronRight className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">
                {activeChat.isGroup ? 'Start group conversation' : 'Start a conversation'}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {activeChat.isGroup 
                  ? `Say hello to the "${activeChat.name}" group!`
                  : `Say hello to ${activeChat.name}!`
                }
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="px-4 py-3 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder={`Message ${activeChat.name}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-zinc-100 dark:bg-zinc-700/70 border-0 rounded-full py-6 px-4 focus-visible:ring-rose-500"
            />
          </div>
          
          {messageInput.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="rounded-full h-10 w-10 p-0 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 