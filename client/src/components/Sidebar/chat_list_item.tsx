import React from "react";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";
import { UsersIcon } from "lucide-react";

interface ChatListItemProps {
	name: string;
	message: string;
	time: string;
	avatarSrc: string;
	avatarFallback: string;
	isActive?: boolean;
	unreadCount?: number;
	isGroup?: boolean;
	memberCount?: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ 
	name, 
	message, 
	time, 
	avatarSrc, 
	avatarFallback,
	isActive = false,
	unreadCount = 0,
	isGroup = false,
	memberCount = 0
}) => {
	return (
		<Link 
			className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
				isActive 
					? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300' 
					: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-800 dark:text-gray-200'
			}`} 
			href="#"
		>
			<div className="relative">
				<Avatar className={`h-12 w-12 ${isActive ? 'border-2 border-indigo-300 dark:border-indigo-600' : ''}`}>
					<AvatarImage src={avatarSrc} alt={name} />
					<AvatarFallback className="bg-indigo-200 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-200">{avatarFallback}</AvatarFallback>
				</Avatar>
				{isGroup && (
					<div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-0.5">
						<UsersIcon className="h-3 w-3" />
					</div>
				)}
				{!isGroup && (
					<div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-indigo-900 ${
						isActive ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
					}`} />
				)}
			</div>
			
			<div className="flex-1 min-w-0">
				<div className="flex justify-between items-center mb-1">
					<p className="font-medium truncate">{name}</p>
					<p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{time}</p>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-sm text-gray-500 dark:text-gray-400 truncate">{message}</p>
					{unreadCount > 0 && (
						<div className="ml-2 bg-indigo-500 text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
							{unreadCount}
						</div>
					)}
				</div>
				{isGroup && (
					<p className="text-xs text-gray-400 mt-1">{memberCount} members</p>
				)}
			</div>
		</Link>
	);
};

export default ChatListItem;
