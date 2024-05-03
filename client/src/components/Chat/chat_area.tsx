import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SentMessage, ReceivedMessage } from "./chat_messages";

export function ChatArea() {
	return (
		<div className="flex-1 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage alt="John Doe" src="/placeholder-user.jpg" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="font-bold">John Doe</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button size="icon" variant="ghost">
						<MoreVerticalIcon className="h-5 w-5" />
					</Button>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto">
				<div className="flex flex-col gap-4">
					<ReceivedMessage message="Hello, how are you?" time="12:34 PM" />
					<SentMessage message="I'm doing great, thanks for asking!" time="12:35 PM" />
					<ReceivedMessage message="Did you see the new design?" time="12:36 PM" />
				</div>
			</div>

			{/* Textarea */}
			<div className="mt-4 flex items-center gap-2">
				<Input className="flex-1" placeholder="Type your message..." />
				<Button size="icon" variant="ghost">
					<PaperclipIcon className="h-5 w-5" />
				</Button>
				<Button size="icon" variant="ghost">
					<SendIcon className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}

function MoreVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="1" />
			<circle cx="12" cy="5" r="1" />
			<circle cx="12" cy="19" r="1" />
		</svg>
	);
}

function PaperclipIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
		</svg>
	);
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m22 2-7 20-4-9-9-4Z" />
			<path d="M22 2 11 13" />
		</svg>
	);
}
