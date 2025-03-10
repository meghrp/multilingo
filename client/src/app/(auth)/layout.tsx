import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Multilingo - Authentication',
  description: 'Sign in or create an account for Multilingo chat application',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 