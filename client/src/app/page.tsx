"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatLayout } from "@/components/chat-layout";
import { useAuth } from "@/context/auth-context";

export default function Home() {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, isLoading, router]);

	// Show a loading state while checking authentication
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-lg">Loading...</p>
			</div>
		);
	}

	// Only render the chat if authenticated
	if (!isAuthenticated) {
		return null; // Will redirect in the useEffect
	}

	return (
		<main className="h-screen">
			<ChatLayout />
		</main>
	);
}
