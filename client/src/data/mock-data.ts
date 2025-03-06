import { ChatType, MessageType, GroupMember } from '@/types';

// Sample user data
export const mockUsers: GroupMember[] = [
  {
    id: 'user_1',
    name: 'You',
    avatar: '/avatars/user-1.png',
    isAdmin: false,
    isOnline: true,
    language: 'English'
  },
  {
    id: 'user_2',
    name: 'John Doe',
    avatar: '/avatars/user-2.png',
    isAdmin: false,
    isOnline: true,
    language: 'French'
  },
  {
    id: 'user_3',
    name: 'Jane Smith',
    avatar: '/avatars/user-3.png',
    isAdmin: false,
    isOnline: true,
    language: 'Spanish'
  },
  {
    id: 'user_4',
    name: 'Alex Johnson',
    avatar: '/avatars/user-4.png',
    isAdmin: false,
    isOnline: false,
    language: 'German'
  },
  {
    id: 'user_5',
    name: 'Sarah Williams',
    avatar: '/avatars/user-5.png',
    isAdmin: false,
    isOnline: true,
    language: 'Japanese'
  }
];

// Sample chat data
export const mockChats: ChatType[] = [
  {
    id: 'chat_1',
    name: 'John Doe',
    avatar: '/avatars/user-2.png',
    lastMessage: 'The weather is beautiful today!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    unreadCount: 0,
    isGroup: false,
    isOnline: true
  },
  {
    id: 'chat_2',
    name: 'Jane Smith',
    avatar: '/avatars/user-3.png',
    lastMessage: 'Can you send me that document?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    unreadCount: 2,
    isGroup: false,
    isOnline: true
  },
  {
    id: 'chat_3',
    name: 'Alex Johnson',
    avatar: '/avatars/user-4.png',
    lastMessage: 'Let\'s meet tomorrow at 2 PM',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    unreadCount: 0,
    isGroup: false,
    isOnline: false
  },
  {
    id: 'group_1',
    name: 'Project Team',
    avatar: '/avatars/group-1.png',
    lastMessage: 'Alex: Let\'s discuss the new features',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    unreadCount: 5,
    isGroup: true,
    members: 5
  },
  {
    id: 'group_2',
    name: 'Language Exchange',
    avatar: '/avatars/group-2.png',
    lastMessage: 'Sarah: How do you say "hello" in Japanese?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    unreadCount: 0,
    isGroup: true,
    members: 12
  }
];

// Sample group members
export const mockMembers: Record<string, GroupMember[]> = {
  'group_1': [
    mockUsers[0], // You
    {
      id: 'user_2',
      name: 'John Doe',
      avatar: '/avatars/user-2.png',
      isAdmin: true,
      isOnline: true,
      language: 'French'
    },
    {
      id: 'user_3',
      name: 'Jane Smith',
      avatar: '/avatars/user-3.png',
      isAdmin: false,
      isOnline: true,
      language: 'Spanish'
    },
    {
      id: 'user_4',
      name: 'Alex Johnson',
      avatar: '/avatars/user-4.png',
      isAdmin: false,
      isOnline: false,
      language: 'German'
    },
    {
      id: 'user_5',
      name: 'Sarah Williams',
      avatar: '/avatars/user-5.png',
      isAdmin: false,
      isOnline: true,
      language: 'Japanese'
    }
  ],
  'group_2': [
    mockUsers[0], // You
    {
      id: 'user_2',
      name: 'John Doe',
      avatar: '/avatars/user-2.png',
      isAdmin: false,
      isOnline: true,
      language: 'French'
    },
    {
      id: 'user_5',
      name: 'Sarah Williams',
      avatar: '/avatars/user-5.png',
      isAdmin: true,
      isOnline: true,
      language: 'Japanese'
    },
    {
      id: 'user_6',
      name: 'Miguel Rodriguez',
      avatar: '/avatars/user-6.png',
      isAdmin: false,
      isOnline: false,
      language: 'Spanish'
    },
    {
      id: 'user_7',
      name: 'Yuki Tanaka',
      avatar: '/avatars/user-7.png',
      isAdmin: false,
      isOnline: true,
      language: 'Japanese'
    }
  ]
};

// Sample messages
export const mockMessages: Record<string, MessageType[]> = {
  // John Doe chat
  'chat_1': [
    {
      id: 'msg_1_1',
      content: 'Hello there!',
      sender: 'user_2', // John
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isSystem: false,
      originalContent: 'Bonjour!',
      originalLanguage: 'French'
    },
    {
      id: 'msg_1_2',
      content: 'Hi John! How are you today?',
      sender: 'user_1', // You
      timestamp: new Date(Date.now() - 1000 * 60 * 59).toISOString(),
      isSystem: false
    },
    {
      id: 'msg_1_3',
      content: 'I\'m doing great! The weather is beautiful today!',
      sender: 'user_2', // John
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      isSystem: false,
      originalContent: 'Je vais très bien! Le temps est magnifique aujourd\'hui!',
      originalLanguage: 'French'
    }
  ],
  
  // Jane Smith chat
  'chat_2': [
    {
      id: 'msg_2_1',
      content: 'Hey, do you have the report ready?',
      sender: 'user_3', // Jane
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      isSystem: false,
      originalContent: '¿Hola, tienes el informe listo?',
      originalLanguage: 'Spanish'
    },
    {
      id: 'msg_2_2',
      content: 'Working on it, need a few more hours.',
      sender: 'user_1', // You
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString(),
      isSystem: false
    },
    {
      id: 'msg_2_3',
      content: 'No problem, just let me know when it\'s done.',
      sender: 'user_3', // Jane
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.2).toISOString(),
      isSystem: false,
      originalContent: 'No hay problema, solo avísame cuando esté listo.',
      originalLanguage: 'Spanish'
    },
    {
      id: 'msg_2_4',
      content: 'Can you send me that document I shared last week?',
      sender: 'user_3', // Jane
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      isSystem: false,
      originalContent: '¿Puedes enviarme ese documento que compartí la semana pasada?',
      originalLanguage: 'Spanish'
    }
  ],
  
  // Project Team group chat
  'group_1': [
    {
      id: 'msg_g1_1',
      content: 'John Doe created the group',
      sender: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      isSystem: true
    },
    {
      id: 'msg_g1_2',
      content: 'John added Alex, Jane, and Sarah to the group',
      sender: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      isSystem: true
    },
    {
      id: 'msg_g1_3',
      content: 'Welcome everyone to our project team chat!',
      sender: 'user_2', // John
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      isSystem: false,
      originalContent: 'Bienvenue à tous dans notre chat d\'équipe de projet!',
      originalLanguage: 'French'
    },
    {
      id: 'msg_g1_4',
      content: 'Thanks for setting this up, John!',
      sender: 'user_1', // You
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
      isSystem: false
    },
    {
      id: 'msg_g1_5',
      content: 'Happy to be here! When do we start the project?',
      sender: 'user_5', // Sarah
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
      isSystem: false,
      originalContent: '嬉しいです！プロジェクトはいつから始まりますか？',
      originalLanguage: 'Japanese'
    },
    {
      id: 'msg_g1_6',
      content: 'We\'ll start next week. Let\'s discuss the new features we need to implement.',
      sender: 'user_4', // Alex
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isSystem: false,
      originalContent: 'Wir beginnen nächste Woche. Lass uns über die neuen Funktionen sprechen, die wir implementieren müssen.',
      originalLanguage: 'German'
    }
  ]
}; 