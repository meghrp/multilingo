import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
	return (
		<div className="grid h-screen w-screen max-w-screen-lg border flex-1 rounded-tl-3xl overflow-hidden">
			<div className="flex w-[300px] flex-col border-r">
				<div className="header w-full p-4 flex items-center border-b">
					<MessageSquareIcon className="w-6 h-6 mr-2" />
					<h1 className="text-lg font-bold">Messages</h1>
					<Button className="ml-auto" size="icon" variant="ghost">
						<SearchIcon className="w-4 h-4" />
						<span className="sr-only">Search</span>
					</Button>
					<Button size="icon" variant="ghost">
						<SettingsIcon className="w-4 h-4" />
						<span className="sr-only">Settings</span>
					</Button>
				</div>
				<div className="flex-1 overflow-auto">
					<div className="grid gap-2">
						<div className="bg-gray-100 rounded-tl-2xl p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Alice</h2>
								<p className="text-sm text-gray-500">Hey, how are you?</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Bob</h2>
								<p className="text-sm text-gray-500">
									Check out this cool website I found:
									<Link href="#">example.com</Link>
								</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Charlie</h2>
								<p className="text-sm text-gray-500">Anyone up for some virtual trivia tonight?</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">David</h2>
								<p className="text-sm text-gray-500">Just wanted to remind everyone about the meeting tomorrow at 10 AM.</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Eve</h2>
								<p className="text-sm text-gray-500">Has anyone seen my blue umbrella? I think I left it in the office.</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Frank</h2>
								<p className="text-sm text-gray-500">Good morning, everyone! I hope you all have a fantastic day.</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Grace</h2>
								<p className="text-sm text-gray-500">I'm feeling really stressed today. Does anyone have any tips for managing stress?</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
						<div className="bg-gray-100 rounded-bl-2xl p-4 flex gap-4 items-center">
							<img
								alt="Avatar"
								className="rounded-full"
								height="48"
								src="/placeholder.svg"
								style={{
									aspectRatio: "48/48",
									objectFit: "cover",
								}}
								width="48"
							/>
							<div className="flex-1">
								<h2 className="font-semibold">Heather</h2>
								<p className="text-sm text-gray-500">I just finished reading an amazing book! Has anyone else read "The Midnight Library"?</p>
							</div>
							<div className="flex flex-col items-end text-sm text-gray-500">
								<time className="font-medium" dateTime="2023-03-23T16:54">
									2:30 PM
								</time>
								<ChevronRightIcon className="w-4 h-4 ml-auto" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-r w-[1px] hidden sm:block" />
			<div className="flex-1 flex flex-col">
				<div className="flex h-[60px] items-center border-b px-4">
					<Button className="rounded-full" size="icon" variant="ghost">
						<ChevronLeftIcon className="w-4 h-4" />
						<span className="sr-only">Back</span>
					</Button>
					<div className="flex-1 flex items-center gap-2">
						<img
							alt="Avatar"
							className="rounded-full"
							height="40"
							src="/placeholder.svg"
							style={{
								aspectRatio: "40/40",
								objectFit: "cover",
							}}
							width="40"
						/>
						<h1 className="font-semibold text-sm leading-none">Alice</h1>
					</div>
					<Button size="icon" variant="ghost">
						<VideoIcon className="w-4 h-4" />
						<span className="sr-only">Video call</span>
					</Button>
					<Button size="icon" variant="ghost">
						<PhoneIcon className="w-4 h-4" />
						<span className="sr-only">Audio call</span>
					</Button>
					<Button size="icon" variant="ghost">
						<MoreHorizontalIcon className="w-4 h-4" />
						<span className="sr-only">More</span>
					</Button>
				</div>
				<div className="flex-1 flex flex-col gap-2 p-4">
					<div className="grid gap-2">
						<div className="flex items-start gap-4">
							<img
								alt="Avatar"
								className="rounded-full"
								height="40"
								src="/placeholder.svg"
								style={{
									aspectRatio: "40/40",
									objectFit: "cover",
								}}
								width="40"
							/>
							<div className="flex-1">
								<div className="bg-gray-100 rounded-lg p-4">
									<p>Hey, how are you? I was thinking we could grab some coffee this afternoon and catch up. What do you think?</p>
								</div>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<img
								alt="Avatar"
								className="rounded-full"
								height="40"
								src="/placeholder.svg"
								style={{
									aspectRatio: "40/40",
									objectFit: "cover",
								}}
								width="40"
							/>
							<div className="flex-1">
								<div className="bg-gray-100 rounded-lg p-4">
									<p>Sure, that sounds great! 😊</p>
								</div>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<img
								alt="Avatar"
								className="rounded-full"
								height="40"
								src="/placeholder.svg"
								style={{
									aspectRatio: "40/40",
									objectFit: "cover",
								}}
								width="40"
							/>
							<div className="flex-1">
								<div className="bg-gray-100 rounded-lg p-4">
									<p>By the way, have you seen the new movie that just came out? I heard it's really good.</p>
								</div>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<img
								alt="Avatar"
								className="rounded-full"
								height="40"
								src="/placeholder.svg"
								style={{
									aspectRatio: "40/40",
									objectFit: "cover",
								}}
								width="40"
							/>
							<div className="flex-1">
								<div className="bg-gray-100 rounded-lg p-4">
									<p>Yeah, I saw it last weekend. It was amazing! 🍿🎬</p>
								</div>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<img
								alt="Avatar"
								className="rounded-full"
								height="40"
								src="/placeholder.svg"
								style={{
									aspectRatio: "40/40",
									objectFit: "cover",
								}}
								width="40"
							/>
							<div className="flex-1">
								<div className="bg-gray-100 rounded-lg p-4">
									<p>We should definitely go watch it together. I'll check the showtimes and let you know. 😄</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="border-t flex items-center h-14 px-4">
					<form className="flex-1">
						<Input className="rounded-full" placeholder="Type a message..." type="text" />
					</form>
					<Button className="ml-2 rounded-full" size="icon" variant="ghost">
						<SmileIcon className="w-6 h-6" />
						<span className="sr-only">Smile</span>
					</Button>
					<Button className="rounded-full" size="icon" variant="ghost">
						<PlaneIcon className="w-6 h-6" />
						<span className="sr-only">Send</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

function ChevronLeftIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}

function ChevronRightIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m9 18 6-6-6-6" />
		</svg>
	);
}

function MessageSquareIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
	);
}

function MoreHorizontalIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="1" />
			<circle cx="19" cy="12" r="1" />
			<circle cx="5" cy="12" r="1" />
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

function PlaneIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
		</svg>
	);
}

function SearchIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function SettingsIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
			<circle cx="12" cy="12" r="3" />
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
