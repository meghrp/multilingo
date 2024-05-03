import Sidebar from "@/components/Sidebar/sidebar";
import { ChatArea } from "@/components/Chat/chat_area";

export default function Component() {
	return (
		<div className="flex h-screen w-full overflow-hidden">
			<Sidebar />
			<ChatArea />
		</div>
	);
}
