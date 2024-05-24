"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SentMessage, ReceivedMessage } from "./chat_messages";
import * as signalR from "@microsoft/signalr";
import React, { useState, useEffect } from "react";
import { MoreVerticalIcon, PaperclipIcon, SendIcon } from "../ui/icons";

export function ChatArea() {
	const username = new Date().getTime();
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState<Array<JSX.Element>>([]);
	const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

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
				const element = <ReceivedMessage message={message} time={username.toString()} />;
				setChatMessages((prev) => [...prev, element]);
			});
		}
	}, [connection]);

	function send() {
		if (connection && message.trim() !== "") {
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
