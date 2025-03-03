import * as React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import ChatListItem from "./chat_list_item";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
	PlusIcon, 
	SearchIcon, 
	UsersIcon, 
	MessageSquareIcon, 
	SettingsIcon, 
	LogOutIcon 
} from "lucide-react";

export default function Sidebar() {
	const [activeTab, setActiveTab] = useState<'chats' | 'groups'>('chats');
	const [showNewChatModal, setShowNewChatModal] = useState(false);

	return (
		<div className="bg-indigo-50 dark:bg-indigo-950 w-80 flex flex-col h-full">
			{/* Sidebar Header */}
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Multilingo</h1>
					<Avatar className="h-9 w-9 border-2 border-indigo-200 dark:border-indigo-700">
						<AvatarImage src="/placeholder-user.jpg" alt="User" />
						<AvatarFallback className="bg-indigo-200 text-indigo-600">U</AvatarFallback>
					</Avatar>
				</div>
				<div className="relative">
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
					<Input 
						placeholder="Search..." 
						className="pl-9 bg-white dark:bg-indigo-900 border-0 rounded-full text-sm"
					/>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex px-4 mb-2">
				<button
					className={`flex-1 py-2 px-4 text-sm font-medium rounded-full ${
						activeTab === 'chats' 
							? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300' 
							: 'text-gray-600 hover:bg-indigo-100/50 dark:text-gray-300 dark:hover:bg-indigo-900/50'
					}`}
					onClick={() => setActiveTab('chats')}
				>
					<div className="flex items-center justify-center gap-2">
						<MessageSquareIcon className="h-4 w-4" />
						<span>Chats</span>
					</div>
				</button>
				<button
					className={`flex-1 py-2 px-4 text-sm font-medium rounded-full ml-2 ${
						activeTab === 'groups' 
							? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300' 
							: 'text-gray-600 hover:bg-indigo-100/50 dark:text-gray-300 dark:hover:bg-indigo-900/50'
					}`}
					onClick={() => setActiveTab('groups')}
				>
					<div className="flex items-center justify-center gap-2">
						<UsersIcon className="h-4 w-4" />
						<span>Groups</span>
					</div>
				</button>
			</div>

			{/* Chat/Group List */}
			<div className="flex-1 overflow-y-auto p-3">
				<div className="flex items-center justify-between mb-3 px-2">
					<h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{activeTab === 'chats' ? 'Recent' : 'Your Groups'}
					</h2>
					<Button 
						size="sm" 
						variant="ghost" 
						className="h-8 w-8 p-0 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-700"
						onClick={() => setShowNewChatModal(true)}
					>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>

				<div className="space-y-1">
					{activeTab === 'chats' ? (
						<>
							<ChatListItem 
								name="John Doe" 
								message="Hey, how's it going?" 
								time="10:30 AM" 
								avatarSrc="/placeholder-user.jpg" 
								avatarFallback="JD"
								isActive={true}
								unreadCount={0}
							/>
							<ChatListItem 
								name="Jane Smith" 
								message="Can you send me that file?" 
								time="Yesterday" 
								avatarSrc="/placeholder-user.jpg" 
								avatarFallback="JS"
								isActive={false}
								unreadCount={3}
							/>
							<ChatListItem 
								name="Alex Johnson" 
								message="Let's meet tomorrow" 
								time="Yesterday" 
								avatarSrc="/placeholder-user.jpg" 
								avatarFallback="AJ"
								isActive={false}
								unreadCount={0}
							/>
						</>
					) : (
						<>
							<ChatListItem 
								name="Project Team" 
								message="Alex: Let's discuss the new features" 
								time="11:45 AM" 
								avatarSrc="/placeholder-group.jpg" 
								avatarFallback="PT"
								isGroup={true}
								memberCount={5}
								isActive={false}
								unreadCount={2}
							/>
							<ChatListItem 
								name="Friends Group" 
								message="Jane: Movie night on Friday?" 
								time="Yesterday" 
								avatarSrc="/placeholder-group.jpg" 
								avatarFallback="FG"
								isGroup={true}
								memberCount={8}
								isActive={false}
								unreadCount={0}
							/>
							<ChatListItem 
								name="Language Exchange" 
								message="John: How do you say 'hello' in Spanish?" 
								time="Monday" 
								avatarSrc="/placeholder-group.jpg" 
								avatarFallback="LE"
								isGroup={true}
								memberCount={12}
								isActive={false}
								unreadCount={0}
							/>
						</>
					)}
				</div>
			</div>

			{/* Sidebar Footer */}
			<div className="p-3">
				<div className="flex justify-around">
					<Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-900">
						<SettingsIcon className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-900">
						<LogOutIcon className="h-5 w-5" />
					</Button>
				</div>
			</div>

			{/* New Chat/Group Modal - This would be implemented as a separate component */}
			{showNewChatModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewChatModal(false)}>
					<div className="bg-white dark:bg-indigo-950 p-6 rounded-xl w-96" onClick={e => e.stopPropagation()}>
						<h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">
							{activeTab === 'chats' ? 'New Chat' : 'Create Group'}
						</h2>
						{/* Modal content would go here */}
						<div className="mt-4 flex justify-end gap-2">
							<Button variant="outline" onClick={() => setShowNewChatModal(false)}>Cancel</Button>
							<Button className="bg-indigo-500 hover:bg-indigo-600">{activeTab === 'chats' ? 'Start Chat' : 'Create Group'}</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
