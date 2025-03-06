'use client';

import { useChat } from '@/context/chat-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  X, 
  Globe, 
  MoreHorizontal, 
  UserPlus, 
  Settings, 
  Bell, 
  BellOff,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

interface GroupInfoProps {
  onClose: () => void;
}

export function GroupInfo({ onClose }: GroupInfoProps) {
  const { 
    activeChat, 
    activeChatMembers, 
    currentUser
  } = useChat();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!activeChat?.isGroup) {
    return null;
  }
  
  // Filter members based on search
  const filteredMembers = activeChatMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort members with online first, then admins
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (a.isAdmin && !b.isAdmin) return -1;
    if (!a.isAdmin && b.isAdmin) return 1;
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div className="h-full bg-white dark:bg-zinc-800 flex flex-col border-l border-zinc-200 dark:border-zinc-700 w-80">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Group Info
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="rounded-full h-8 w-8"
        >
          <X className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        </Button>
      </div>
      
      {/* Group details */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
            <AvatarFallback className="bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-200 text-xl">
              {activeChat.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              {activeChat.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {activeChatMembers.length} members · {activeChatMembers.filter(m => m.isOnline).length} online
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MoreHorizontal className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </Button>
        </div>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
          Welcome to the {activeChat.name} group! Share ideas and collaborate with your team.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full text-xs h-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Settings
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full text-xs h-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          >
            <Bell className="h-3.5 w-3.5 mr-1" />
            Mute
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full text-xs h-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          >
            <LogOut className="h-3.5 w-3.5 mr-1" />
            Leave
          </Button>
        </div>
      </div>
      
      {/* Members section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Members
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 rounded-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 dark:text-rose-400 dark:hover:text-rose-300"
            >
              <UserPlus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-100 dark:bg-zinc-700/70 border-0 rounded-full text-sm"
            />
          </div>
          
          <div className="space-y-3">
            {sortedMembers.map(member => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {member.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-800"></span>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {member.id === currentUser.id ? 'You' : member.name}
                      </span>
                      
                      {member.isAdmin && (
                        <Badge className="ml-2 h-5 bg-zinc-100 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700">
                          Admin
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                      <Globe className="h-3 w-3 mr-1" />
                      {member.language}
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 