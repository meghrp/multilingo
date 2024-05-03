import React from "react";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

interface ChatListItemProps {
	name: string;
	message: string;
	time: string;
	avatarSrc: string;
	avatarFallback: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ name, message, time, avatarSrc, avatarFallback }) => {
	return (
		<Link className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 transition-colors" href="#">
			<Avatar>
				<AvatarImage src={avatarSrc} />
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<div className="flex-1 truncate">
				<p className="font-medium">{name}</p>
				<p className="text-sm text-gray-500 dark:text-gray-400 truncate">{message}</p>
			</div>
			<div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
		</Link>
	);
};

export default ChatListItem;
