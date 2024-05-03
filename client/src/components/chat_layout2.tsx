/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NTKywBiudTE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "./ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { Input } from "./ui/input";
import { CollapsibleTrigger, Collapsible } from "@/components/ui/collapsible";
import { Switch } from "./ui/switch";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";

export default function Component() {
	return (
		<div className="flex h-screen w-full">
			<div className="bg-gray-950 text-gray-50 w-72 p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">Chats</h1>
					<Button size="icon" variant="ghost">
						<PlusIcon className="h-5 w-5" />
					</Button>
				</div>
				<div className="flex flex-col gap-2 overflow-y-auto" />
			</div>
			<div className="flex-1 bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50 p-4 flex flex-col">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<h2 className="font-bold">John Doe</h2>
							<p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button size="icon" variant="ghost">
							<PhoneIcon className="h-5 w-5" />
						</Button>
						<Button size="icon" variant="ghost">
							<VideoIcon className="h-5 w-5" />
						</Button>
						<Button size="icon" variant="ghost">
							<MoreVerticalIcon className="h-5 w-5" />
						</Button>
					</div>
				</div>
				<div className="flex-1 overflow-y-auto">
					<div className="flex flex-col gap-4" />
				</div>
				<div className="mt-4 flex items-center gap-2">
					<Input className="flex-1" placeholder="Type your message..." />
					<Button size="icon" variant="ghost">
						<PaperclipIcon className="h-5 w-5" />
					</Button>
					<Button size="icon" variant="ghost">
						<SmileIcon className="h-5 w-5" />
					</Button>
					<Button size="icon" variant="ghost">
						<SendIcon className="h-5 w-5" />
					</Button>
				</div>
			</div>
			<Collapsible className="bg-gray-950 text-gray-50 w-72 p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Settings</h2>
					<CollapsibleTrigger asChild>
						<Button size="icon" variant="ghost">
							<XIcon className="h-5 w-5" />
						</Button>
					</CollapsibleTrigger>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<span>Dark Mode</span>
						<Switch />
					</div>
					<div className="flex items-center justify-between">
						<span>Notifications</span>
						<Switch />
					</div>
					<div className="flex items-center justify-between">
						<span>Sounds</span>
						<Switch />
					</div>
					<div className="flex items-center justify-between">
						<span>Appearance</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="ghost">
									<ChevronDownIcon className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Light</DropdownMenuItem>
								<DropdownMenuItem>Dark</DropdownMenuItem>
								<DropdownMenuItem>System</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center justify-between">
						<span>Language</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="ghost">
									<ChevronDownIcon className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>English</DropdownMenuItem>
								<DropdownMenuItem>Spanish</DropdownMenuItem>
								<DropdownMenuItem>French</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center justify-between">
						<span>Log Out</span>
						<Button size="icon" variant="ghost">
							<LogOutIcon className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</Collapsible>
		</div>
	);
}

function ChevronDownIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

function LogOutIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" x2="9" y1="12" y2="12" />
		</svg>
	);
}

function MoreVerticalIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="1" />
			<circle cx="12" cy="5" r="1" />
			<circle cx="12" cy="19" r="1" />
		</svg>
	);
}

function PaperclipIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
		</svg>
	);
}

function PhoneIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

function PlusIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

function SendIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m22 2-7 20-4-9-9-4Z" />
			<path d="M22 2 11 13" />
		</svg>
	);
}

function SmileIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<path d="M8 14s1.5 2 4 2 4-2 4-2" />
			<line x1="9" x2="9.01" y1="9" y2="9" />
			<line x1="15" x2="15.01" y1="9" y2="9" />
		</svg>
	);
}

function VideoIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m22 8-6 4 6 4V8Z" />
			<rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
		</svg>
	);
}

function XIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}
