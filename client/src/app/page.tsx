"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import { ChatArea } from "../components/Chat/chat_area";
import { GroupInfo } from "../components/Chat/group_info";

export default function ChatApp() {
	const [showGroupInfo, setShowGroupInfo] = useState(false);
	
	// Toggle group info panel
	const toggleGroupInfo = () => {
		setShowGroupInfo(!showGroupInfo);
	};
	
	// Sample group members data for demo
	const groupMembers = [
		{
			id: "1",
			name: "John Doe",
			avatar: "/placeholder-user.jpg",
			isAdmin: true,
			isOnline: true,
			language: "French"
		},
		{
			id: "2",
			name: "Jane Smith",
			avatar: "/placeholder-user.jpg",
			isAdmin: false,
			isOnline: true,
			language: "English"
		},
		{
			id: "3",
			name: "Alex Johnson",
			avatar: "/placeholder-user.jpg",
			isAdmin: false,
			isOnline: false,
			language: "Spanish"
		},
		{
			id: "4",
			name: "Sarah Williams",
			avatar: "/placeholder-user.jpg",
			isAdmin: false,
			isOnline: true,
			language: "German"
		},
		{
			id: "current-user-id",
			name: "You",
			avatar: "/placeholder-user.jpg",
			isAdmin: false,
			isOnline: true,
			language: "English"
		}
	];

	return (
		<div className="flex h-screen w-full overflow-hidden bg-indigo-50 dark:bg-indigo-950">
			{/* Sidebar */}
			<Sidebar />
			
			{/* Chat Area */}
			<div className="flex-1 flex">
				<ChatArea onToggleGroupInfo={toggleGroupInfo} />
				
				{/* Group Info Panel (conditionally rendered) */}
				{showGroupInfo && (
					<GroupInfo 
						groupId="1"
						groupName="Project Team"
						groupAvatar="/placeholder-group.jpg"
						members={groupMembers}
						onClose={() => setShowGroupInfo(false)}
					/>
				)}
			</div>
		</div>
	);
}
