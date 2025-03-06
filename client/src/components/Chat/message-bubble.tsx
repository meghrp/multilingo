'use client';

import { useState } from 'react';
import { MessageType } from '@/types';
import { useChat } from '@/context/chat-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: MessageType;
  isCurrentUser: boolean;
  className?: string;
}

export function MessageBubble({ message, isCurrentUser, className }: MessageBubbleProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const { activeChatMembers } = useChat();
  
  // Format timestamp for display
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  
  // If it's a system message, show it centered with special styling
  if (message.isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }
  
  // Find the sender details
  const sender = activeChatMembers.find(member => member.id === message.sender);
  
  // Check if the message has a translation
  const hasTranslation = message.originalContent && message.originalContent !== message.content;
  
  if (isCurrentUser) {
    return (
      <div className={cn("flex flex-col items-end space-y-1", className)}>
        <div className="flex items-end gap-2">
          <div className="max-w-[80%]">
            <div className="bg-rose-500 text-white p-3 rounded-2xl rounded-tr-sm">
              <p className="text-sm">{message.content}</p>
              
              {/* Translation toggle for user's own messages */}
              {hasTranslation && (
                <div className="mt-2 pt-2 border-t border-rose-400/30">
                  <button 
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="flex items-center text-xs text-rose-200 hover:text-white"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    {showOriginal 
                      ? "Hide original" 
                      : `Show original (${message.originalLanguage})`
                    }
                    {showOriginal 
                      ? <ChevronUp className="h-3 w-3 ml-1" /> 
                      : <ChevronDown className="h-3 w-3 ml-1" />
                    }
                  </button>
                  
                  {showOriginal && (
                    <p className="mt-2 text-sm text-rose-100 italic">
                      "{message.originalContent}"
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
          
          <Avatar className="h-8 w-8 opacity-0">
            <AvatarImage src="/avatars/user-1.png" alt="You" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("flex flex-col items-start space-y-1", className)}>
      <div className="flex items-end gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={sender?.avatar} alt={sender?.name} />
          <AvatarFallback className="bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
            {sender?.name?.substring(0, 2).toUpperCase() || '??'}
          </AvatarFallback>
        </Avatar>
        
        <div className="max-w-[80%]">
          <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-zinc-200 dark:border-zinc-700">
            {sender && (
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                {sender.name}
              </p>
            )}
            
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{message.content}</p>
            
            {/* Translation toggle for others' messages */}
            {hasTranslation && (
              <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <button 
                  onClick={() => setShowOriginal(!showOriginal)}
                  className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {showOriginal 
                    ? "Hide original" 
                    : `Show original (${message.originalLanguage})`
                  }
                  {showOriginal 
                    ? <ChevronUp className="h-3 w-3 ml-1" /> 
                    : <ChevronDown className="h-3 w-3 ml-1" />
                  }
                </button>
                
                {showOriginal && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 italic">
                    "{message.originalContent}"
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 