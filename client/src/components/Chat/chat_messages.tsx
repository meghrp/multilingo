import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CheckIcon, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
	message: string;
	time: string;
	senderName?: string;
	isRead?: boolean;
	originalMessage?: string;
	originalLanguage?: string;
}

const SentMessage: React.FC<MessageProps> = ({ 
	message, 
	time, 
	isRead = true, 
	originalMessage,
	originalLanguage
}) => {
	const [showOriginal, setShowOriginal] = useState(false);
	const hasTranslation = originalMessage && originalMessage !== message;

	return (
		<div className="flex items-end gap-3 justify-end">
			<div className="flex flex-col items-end">
				<div className="bg-indigo-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
					<p className="text-sm">{message}</p>
					
					{hasTranslation && (
						<div className="mt-2 pt-2 border-t border-indigo-400">
							<button 
								onClick={() => setShowOriginal(!showOriginal)}
								className="flex items-center text-xs text-indigo-200 hover:text-white"
							>
								<Globe className="h-3 w-3 mr-1" />
								{showOriginal ? "Hide original" : `Show original (${originalLanguage})`}
								{showOriginal ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
							</button>
							
							{showOriginal && (
								<p className="mt-2 text-sm text-indigo-100 italic">
									"{originalMessage}"
								</p>
							)}
						</div>
					)}
				</div>
				<div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
					<span>{time}</span>
					{isRead ? (
						<div className="ml-1 text-indigo-500">
							<CheckIcon className="h-3 w-3 inline" />
							<CheckIcon className="h-3 w-3 inline -ml-1" />
						</div>
					) : (
						<div className="ml-1 text-gray-400">
							<CheckIcon className="h-3 w-3 inline" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const ReceivedMessage: React.FC<MessageProps> = ({ 
	message, 
	time, 
	senderName,
	originalMessage,
	originalLanguage
}) => {
	const [showOriginal, setShowOriginal] = useState(false);
	const hasTranslation = originalMessage && originalMessage !== message;

	return (
		<div className="flex items-end gap-3">
			<Avatar className="h-8 w-8">
				<AvatarImage src="/placeholder-user.jpg" />
				<AvatarFallback className="bg-indigo-200 text-indigo-600">JD</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				{senderName && (
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1">{senderName}</span>
				)}
				<div className="bg-white dark:bg-indigo-900 p-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm border border-gray-100 dark:border-indigo-800">
					<p className="text-sm text-gray-800 dark:text-gray-200">{message}</p>
					
					{hasTranslation && (
						<div className="mt-2 pt-2 border-t border-gray-200 dark:border-indigo-800">
							<button 
								onClick={() => setShowOriginal(!showOriginal)}
								className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300"
							>
								<Globe className="h-3 w-3 mr-1" />
								{showOriginal ? "Hide original" : `Show original (${originalLanguage})`}
								{showOriginal ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
							</button>
							
							{showOriginal && (
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
									"{originalMessage}"
								</p>
							)}
						</div>
					)}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">{time}</div>
			</div>
		</div>
	);
};

const SystemMessage: React.FC<{ message: string }> = ({ message }) => {
	return (
		<div className="flex justify-center my-2">
			<div className="bg-gray-200 dark:bg-indigo-900/50 text-gray-500 dark:text-gray-400 text-xs px-3 py-1 rounded-full">
				{message}
			</div>
		</div>
	);
};

export { SentMessage, ReceivedMessage, SystemMessage };
