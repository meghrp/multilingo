import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/chat-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Multilingo | Chat with anyone in any language",
    description: "A multilingual chat application that breaks down language barriers",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ChatProvider>
                    {children}
                </ChatProvider>
            </body>
        </html>
    );
}
