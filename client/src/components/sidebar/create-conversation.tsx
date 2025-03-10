'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useChat } from '@/context/chat-context';
import { Plus } from 'lucide-react';

export function CreateConversation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userIds, setUserIds] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { createConversation, setCurrentChat, isLoading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userIds.trim()) {
      setError('Please enter at least one user ID');
      return;
    }

    try {
      // Split the input by commas and remove whitespace
      const userIdArray = userIds.split(',').map(id => id.trim()).filter(id => id);
      
      // Create the conversation
      const conversationId = await createConversation(userIdArray);
      
      // Switch to the new conversation
      setCurrentChat(conversationId);
      
      // Close the dialog
      setIsOpen(false);
      
      // Reset the form
      setUserIds('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 p-0 rounded-full bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600"
        >
          <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Conversation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="userIds" className="text-sm font-medium text-foreground">
              Usernames (comma separated)
            </label>
            <Input
              id="userIds"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
              placeholder="e.g. john, sarah, mike"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Enter the exact usernames of people you want to chat with, separated by commas.
              For example: "username1, username2"
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Conversation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 