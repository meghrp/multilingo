import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { ChatProvider } from "@/context/chat-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Multilingo | Chat with anyone in any language",
    description: "A multilingual chat application that breaks down language barriers",
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#18181b' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <ChatProvider>
                        {children}
                    </ChatProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
