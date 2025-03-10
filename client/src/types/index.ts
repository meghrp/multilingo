export interface MessageType {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isSystem: boolean;
  originalContent?: string;
  originalLanguage?: string;
  conversationId?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  isOnline: boolean;
  language?: string;
}

export interface ChatType {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isGroup: boolean;
  isOnline?: boolean;
  members?: number;
}

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Japanese' | 'Chinese' | 'Korean' | 'Russian'; 