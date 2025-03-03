"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SentMessage, ReceivedMessage, SystemMessage } from "./chat_messages";
import * as signalR from "@microsoft/signalr";
import React, { useState, useEffect, useRef } from "react";
import { 
	MoreVerticalIcon, 
	PaperclipIcon, 
	SendIcon, 
	PhoneIcon, 
	VideoIcon, 
	InfoIcon, 
	SmileIcon,
	ImageIcon,
	MicIcon,
	Globe
} from "lucide-react";

interface ChatAreaProps {
	onToggleGroupInfo?: () => void;
}

export function ChatArea({ onToggleGroupInfo }: ChatAreaProps) {
	const username = new Date().getTime();
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState<Array<JSX.Element>>([]);
	const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isGroup, setIsGroup] = useState(false);
	const [userLanguage, setUserLanguage] = useState("English");

	// Scroll to bottom whenever messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatMessages]);

	useEffect(() => {
		const newConn = new signalR.HubConnectionBuilder().withUrl("http://localhost:5068/hub").build();
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
				const element = <ReceivedMessage 
					message={message} 
					time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
					senderName="John Doe"
					originalMessage="Bonjour, comment ça va?" 
					originalLanguage="French"
				/>;
				setChatMessages((prev) => [...prev, element]);
			});
		}
	}, [connection]);

	function send() {
		if (connection && message.trim() !== "") {
			connection.send("newMessage", username, message).then(() => console.log("Message sent!"));
			setChatMessages((prev) => [
				...prev, 
				<SentMessage 
					message={message} 
					time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
				/>
			]);
			setMessage("");
		}
	}

	// For demo purposes, let's add some sample messages
	useEffect(() => {
		// Only add sample messages if there are none
		if (chatMessages.length === 0) {
			const sampleMessages = [
				<SystemMessage message="Today" />,
				<ReceivedMessage 
					message="Hey there! How's it going?" 
					time="10:30 AM" 
					senderName="John Doe"
				/>,
				<SentMessage 
					message="Hi! I'm doing well, thanks for asking. How about you?" 
					time="10:31 AM" 
				/>,
				<ReceivedMessage 
					message="I'm good too! Just wanted to check in about the project." 
					time="10:32 AM" 
					senderName="John Doe"
					originalMessage="Je vais bien aussi ! Je voulais juste prendre des nouvelles du projet." 
					originalLanguage="French"
				/>,
				<SentMessage 
					message="Sure, I've been working on the design. I'll share it with you soon." 
					time="10:33 AM" 
					originalMessage="Claro, he estado trabajando en el diseño. Lo compartiré contigo pronto."
					originalLanguage="Spanish"
				/>,
				<SystemMessage message="John Doe added Alex Johnson to the group" />,
				<ReceivedMessage 
					message="Hi everyone! Excited to join this group." 
					time="11:15 AM" 
					senderName="Alex Johnson"
					originalMessage="Hola a todos! Emocionado de unirme a este grupo."
					originalLanguage="Spanish"
				/>,
			];
			setChatMessages(sampleMessages);
			// Set isGroup to true for demo purposes
			setIsGroup(true);
		}
	}, []);

	return (
		<div className="flex-1 flex flex-col h-full bg-white dark:bg-indigo-950">
			{/* Chat Header */}
			<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-indigo-900">
				<div className="flex items-center gap-3">
					<Avatar className="h-12 w-12 border-2 border-indigo-100 dark:border-indigo-800">
						<AvatarImage alt="John Doe" src="/placeholder-user.jpg" />
						<AvatarFallback className="bg-indigo-200 text-indigo-600">JD</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center gap-2">
							<h2 className="font-semibold text-gray-900 dark:text-white">{isGroup ? "Project Team" : "John Doe"}</h2>
							<div className="h-2 w-2 rounded-full bg-green-400"></div>
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{isGroup ? "5 members" : "Online"}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-1">
					<div className="flex items-center bg-indigo-100 dark:bg-indigo-900 rounded-full px-3 py-1 mr-2">
						<Globe className="h-4 w-4 text-indigo-500 dark:text-indigo-400 mr-1" />
						<span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">{userLanguage}</span>
					</div>
					<Button size="icon" variant="ghost" className="rounded-full">
						<PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</Button>
					<Button size="icon" variant="ghost" className="rounded-full">
						<VideoIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</Button>
					<Button 
						size="icon" 
						variant="ghost" 
						className="rounded-full"
						onClick={onToggleGroupInfo}
					>
						<InfoIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</Button>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 bg-indigo-50 dark:bg-indigo-950">
				<div className="flex flex-col gap-4 max-w-3xl mx-auto">
					{chatMessages.map((message, index) => (
						<React.Fragment key={index}>{message}</React.Fragment>
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Message Input */}
			<div className="p-3 border-t border-gray-200 dark:border-indigo-900 bg-white dark:bg-indigo-950">
				<div className="flex items-end gap-2 max-w-3xl mx-auto">
					<Button size="icon" variant="ghost" className="rounded-full h-10 w-10">
						<PaperclipIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</Button>
					<Button size="icon" variant="ghost" className="rounded-full h-10 w-10">
						<ImageIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</Button>
					<div className="relative flex-1">
						<Input
							className="pr-10 py-3 bg-indigo-50 dark:bg-indigo-900 border-0 rounded-full text-sm"
							placeholder="Type a message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === "Enter") send();
							}}
						/>
						<Button 
							size="icon" 
							variant="ghost" 
							className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
						>
							<SmileIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
						</Button>
					</div>
					{message.trim() ? (
						<Button 
							size="icon" 
							className="rounded-full h-10 w-10 bg-indigo-500 hover:bg-indigo-600" 
							onClick={send}
						>
							<SendIcon className="h-5 w-5" />
						</Button>
					) : (
						<Button 
							size="icon" 
							className="rounded-full h-10 w-10 bg-indigo-500 hover:bg-indigo-600"
						>
							<MicIcon className="h-5 w-5" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
