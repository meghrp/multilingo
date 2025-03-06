# Multilingo Chat Application

A modern, multilingual chat application that allows users to communicate across language barriers.

## Features

- Real-time messaging with translation support
- Group chat functionality
- Dark mode support
- Responsive design
- User presence indicators
- Unread message counters

## Project Structure

```
client/
├── public/            # Static assets
│   └── avatars/       # User and group avatar images
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   │   ├── chat/      # Chat-related components
│   │   ├── sidebar/   # Sidebar components
│   │   └── ui/        # Reusable UI components
│   ├── context/       # React context providers
│   ├── data/          # Mock data for development
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
└── ...                # Configuration files
```

## Naming Conventions

- Files and directories use kebab-case (e.g., `chat-item.tsx`)
- Components use PascalCase (e.g., `export function ChatItem()`)
- Index files are used for main components in a directory
- TypeScript interfaces and types use PascalCase

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Radix UI (for accessible components)