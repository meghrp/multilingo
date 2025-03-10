'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/chat-context';
import { useAuth } from '@/context/auth-context';
import { ChatItem } from './chat-item';
import { CreateConversation } from './create-conversation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
	Search, 
	MessageSquare, 
	Users, 
	Settings, 
	LogOut, 
	Moon, 
	Sun
} from 'lucide-react';

export function Sidebar() {
	const router = useRouter();
	const { logout, user } = useAuth();
	const { chats, setCurrentChat, currentChatId, isLoading } = useChat();
	const [activeTab, setActiveTab] = useState<'chats' | 'groups'>('chats');
	const [searchQuery, setSearchQuery] = useState('');
	const [isDarkMode, setIsDarkMode] = useState(false);
	
	// Filter chats based on search query and active tab
	const filteredChats = chats.filter(chat => {
		const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTab = (activeTab === 'groups' && chat.isGroup) || (activeTab === 'chats' && !chat.isGroup);
		return matchesSearch && matchesTab;
	});
	
	// Toggle dark mode
	const toggleDarkMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);
		
		if (newMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	// Handle logout
	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	// Get user initials for avatar fallback
	const getUserInitials = () => {
		if (!user || !user.name) return 'U';
		return user.name.split(' ')
			.map(part => part[0]?.toUpperCase() || '')
			.join('')
			.substring(0, 2);
	};

	return (
		<div className="h-full bg-white dark:bg-zinc-800 flex flex-col border-r border-zinc-200 dark:border-zinc-700">
			{/* Header */}
			<div className="p-3 border-b border-zinc-200 dark:border-zinc-700">
				<div className="flex items-center justify-between mb-3">
					<h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Multilingo</h1>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full h-9 w-9">
							{isDarkMode ? (
								<Sun className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
							) : (
								<Moon className="h-5 w-5 text-zinc-500" />
							)}
						</Button>
						<Avatar className="h-9 w-9">
							<AvatarImage src="/avatars/user-1.png" alt="Your profile" />
							<AvatarFallback className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
								{getUserInitials()}
							</AvatarFallback>
						</Avatar>
					</div>
				</div>
				
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
					<Input 
						placeholder="Search..." 
						className="pl-9 bg-zinc-100 dark:bg-zinc-700/70 border-0 rounded-full text-sm"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
			
			{/* Tabs */}
			<div className="flex p-2">
				<button
					className={`flex-1 py-2 px-3 text-sm font-medium rounded-full ${
						activeTab === 'chats' 
							? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' 
							: 'text-zinc-500 hover:bg-zinc-100/70 dark:hover:bg-zinc-700/50 dark:text-zinc-400'
					}`}
					onClick={() => setActiveTab('chats')}
				>
					<div className="flex items-center justify-center gap-2">
						<MessageSquare className="h-4 w-4" />
						<span>Chats</span>
					</div>
				</button>
				<button
					className={`flex-1 py-2 px-3 text-sm font-medium rounded-full ml-2 ${
						activeTab === 'groups' 
							? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' 
							: 'text-zinc-500 hover:bg-zinc-100/70 dark:hover:bg-zinc-700/50 dark:text-zinc-400'
					}`}
					onClick={() => setActiveTab('groups')}
				>
					<div className="flex items-center justify-center gap-2">
						<Users className="h-4 w-4" />
						<span>Groups</span>
					</div>
				</button>
			</div>
			
			{/* Chat list */}
			<div className="flex-1 overflow-y-auto p-2">
				<div className="flex items-center justify-between mb-2 px-2">
					<h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
						{activeTab === 'chats' ? 'Recent' : 'Your Groups'}
					</h2>
					<CreateConversation />
				</div>
				
				{isLoading ? (
					<div className="text-center py-8">
						<p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
					</div>
				) : filteredChats.length > 0 ? (
					<div className="space-y-1">
						{filteredChats.map(chat => (
							<ChatItem 
								key={chat.id}
								chat={chat}
								isActive={chat.id === currentChatId}
								onClick={() => setCurrentChat(chat.id)}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							{searchQuery 
								? 'No matches found' 
								: `No ${activeTab} yet`
							}
						</p>
						<p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
							{!searchQuery && `Click the + button to create a new ${activeTab === 'chats' ? 'chat' : 'group'}`}
						</p>
					</div>
				)}
			</div>
			
			{/* Footer */}
			<div className="p-3 border-t border-zinc-200 dark:border-zinc-700">
				<div className="flex justify-around">
					<Button variant="ghost" size="icon" className="rounded-full">
						<Settings className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
					</Button>
					<Button 
						variant="ghost" 
						size="icon" 
						className="rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
						onClick={handleLogout}
					>
						<LogOut className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
