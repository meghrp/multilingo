import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageProps {
	message: string;
	time: string;
}

const SentMessage: React.FC<MessageProps> = ({ message, time }) => {
	return (
		<div className="flex items-end gap-3 justify-end">
			<div className="bg-gray-950 text-white p-3 rounded-lg max-w-[70%]">
				<p>{message}</p>
				<div className="text-xs text-gray-200 mt-1">{time}</div>
			</div>
			<Avatar>
				<AvatarImage src="/placeholder-user.jpg" />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
		</div>
	);
};

const ReceivedMessage: React.FC<MessageProps> = ({ message, time }) => {
	return (
		<div className="flex items-end gap-3">
			<Avatar>
				<AvatarImage src="/placeholder-user.jpg" />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[70%]">
				<p>{message}</p>
				<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</div>
			</div>
		</div>
	);
};

export { SentMessage, ReceivedMessage };
