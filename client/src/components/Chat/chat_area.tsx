"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SentMessage, ReceivedMessage } from "./chat_messages";
import * as signalR from "@microsoft/signalr";
import React, { useState, useEffect } from "react";

export function ChatArea() {
	const username = new Date().getTime();
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState<Array<JSX.Element>>([]);
	const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

	useEffect(() => {
		const newConn = new signalR.HubConnectionBuilder().withUrl("http://localhost:5204/hub").build();
		setConnection(newConn);
	}, []);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => console.log("Connection started!"))
				.catch((err) => {
					console.error(err);
				});

			connection.on("messageReceived", (username: string, message: string) => {
				const element = <ReceivedMessage message={message} time={username.toString()} />;
				setChatMessages((prev) => [...prev, element]);
			});
		}
	}, [connection]);

	function send() {
		if (connection) {
			connection.send("newMessage", username, message).then(() => console.log("Message sent!"));
			setChatMessages((prev) => [...prev, <SentMessage message={message} time={username.toString()} />]);
			setMessage("");
		}
	}

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
				<div className="flex flex-col gap-4" id="messages">
					{/* <ReceivedMessage message="Hello, how are you?" time="12:34 PM" />
					<SentMessage message="I'm doing great, thanks for asking!" time="12:35 PM" />
					<ReceivedMessage message="Did you see the new design?" time="12:36 PM" /> */}
					{chatMessages.map((message, index) => (
						<React.Fragment key={index}>{message}</React.Fragment>
					))}
				</div>
			</div>

			{/* Textarea */}
			<div className="mt-4 flex items-center gap-2">
				<Input
					className="flex-1"
					type="text"
					placeholder="Type your message..."
					id="messageInput"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === "Enter") send();
					}}
				/>
				<Button size="icon" variant="ghost">
					<PaperclipIcon className="h-5 w-5" />
				</Button>
				<Button size="icon" variant="ghost" type="submit" onClick={send} id="btnSend">
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
