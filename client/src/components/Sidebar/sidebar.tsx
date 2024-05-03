import * as React from "react";
import { Button } from "../ui/button";
import ChatListItem from "./chat_list_item";

export default function Sidebar() {
	return (
		<div className="bg-gray-950 text-gray-50 w-72 p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Chats</h1>
				<Button size="icon" variant="ghost">
					<PlusIcon className="h-5 w-5" />
				</Button>
			</div>
			<div className="flex flex-col gap-2 overflow-y-auto">
				<div className="flex-1 overflow-auto">
					<div className="space-y-2">
						<ChatListItem name="John Doe" message="Hello, how are you?" time="10:30 AM" avatarSrc="/placeholder-user.jpg" avatarFallback="JD" />
						<ChatListItem name="John Doe" message="Hello, how are you?" time="10:30 AM" avatarSrc="/placeholder-user.jpg" avatarFallback="JD" />
						<ChatListItem name="John Doe" message="Hello, how are you?" time="10:30 AM" avatarSrc="/placeholder-user.jpg" avatarFallback="JD" />
					</div>
				</div>
			</div>
		</div>
	);
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}
