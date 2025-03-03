import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X, Search, Upload, Check, Globe } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  language?: string;
}

interface CreateGroupProps {
  users: User[];
  onClose: () => void;
  onCreateGroup: (groupName: string, selectedUsers: string[]) => void;
}

export function CreateGroup({ users, onClose, onCreateGroup }: CreateGroupProps) {
  const [step, setStep] = useState<'select-members' | 'group-details'>('select-members');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState<File | null>(null);
  const [groupAvatarPreview, setGroupAvatarPreview] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGroupAvatar(file);
      setGroupAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      onCreateGroup(groupName, selectedUsers);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-indigo-950 rounded-xl w-[480px] max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-indigo-900 flex items-center justify-between">
          <h2 className="font-semibold text-lg text-indigo-600 dark:text-indigo-300">
            {step === 'select-members' ? 'Select Friends' : 'Create Group'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-900">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {step === 'select-members' ? (
          <>
            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-indigo-900">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
                <Input 
                  placeholder="Search friends..." 
                  className="pl-9 bg-indigo-50 dark:bg-indigo-900 border-0 rounded-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {selectedUsers.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    if (!user) return null;
                    return (
                      <div 
                        key={userId} 
                        className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full text-sm"
                      >
                        <span>{user.name}</span>
                        <button 
                          onClick={() => handleUserSelect(userId)}
                          className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {filteredUsers.map(user => (
                  <div 
                    key={user.id} 
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer ${
                      selectedUsers.includes(user.id) 
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300' 
                        : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-indigo-100 dark:border-indigo-800">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-indigo-200 text-indigo-600">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-indigo-950" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        {user.language && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <Globe className="h-3 w-3 mr-1 text-indigo-400" />
                            {user.language}
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-indigo-900 flex justify-between">
              <Button variant="outline" onClick={onClose} className="rounded-full border-indigo-200 dark:border-indigo-800">
                Cancel
              </Button>
              <Button 
                onClick={() => setStep('group-details')} 
                disabled={selectedUsers.length === 0}
                className="rounded-full bg-indigo-500 hover:bg-indigo-600"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Group Details */}
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-6">
                <div 
                  className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden border-4 border-indigo-200 dark:border-indigo-800"
                  style={groupAvatarPreview ? { backgroundImage: `url(${groupAvatarPreview})`, backgroundSize: 'cover' } : {}}
                >
                  {!groupAvatarPreview && (
                    <Upload className="h-8 w-8 text-indigo-400" />
                  )}
                </div>
                <label 
                  htmlFor="group-avatar-upload" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center cursor-pointer"
                >
                  <Upload className="h-4 w-4 text-white" />
                </label>
                <input 
                  id="group-avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="w-full mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Name
                </label>
                <Input 
                  placeholder="Enter group name" 
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full bg-indigo-50 dark:bg-indigo-900 border-0 rounded-full"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Friends ({selectedUsers.length})
                </label>
                <div className="flex flex-wrap gap-2 bg-indigo-50 dark:bg-indigo-900/50 p-3 rounded-xl">
                  {selectedUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    if (!user) return null;
                    return (
                      <div 
                        key={userId} 
                        className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full text-sm"
                      >
                        <span>{user.name}</span>
                        <button 
                          onClick={() => handleUserSelect(userId)}
                          className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-indigo-900 flex justify-between">
              <Button variant="outline" onClick={() => setStep('select-members')} className="rounded-full border-indigo-200 dark:border-indigo-800">
                Back
              </Button>
              <Button 
                onClick={handleCreateGroup} 
                disabled={!groupName.trim() || selectedUsers.length === 0}
                className="rounded-full bg-indigo-500 hover:bg-indigo-600"
              >
                Create Group
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 