import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  X, 
  Search, 
  Bell, 
  BellOff, 
  UserPlus, 
  Trash, 
  LogOut, 
  Image, 
  Edit, 
  Users,
  Globe
} from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  isOnline: boolean;
  language?: string;
}

interface GroupInfoProps {
  groupId: string;
  groupName: string;
  groupAvatar: string;
  members: GroupMember[];
  onClose: () => void;
}

export function GroupInfo({ groupId, groupName, groupAvatar, members, onClose }: GroupInfoProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMuted, setIsMuted] = React.useState(false);
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-80 bg-white dark:bg-indigo-950 border-l border-gray-200 dark:border-indigo-900 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-indigo-900 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-indigo-600 dark:text-indigo-300">Group Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-900">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Group Details */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 border-4 border-indigo-100 dark:border-indigo-800">
            <AvatarImage src={groupAvatar} alt={groupName} />
            <AvatarFallback className="bg-indigo-200 text-indigo-600 text-2xl">{groupName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{groupName}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {members.length} members
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900">
            <UserPlus className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-300">Add Friend</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <><BellOff className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" /> <span className="text-indigo-600 dark:text-indigo-300">Unmute</span></>
            ) : (
              <><Bell className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" /> <span className="text-indigo-600 dark:text-indigo-300">Mute</span></>
            )}
          </Button>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="font-medium text-sm mb-3 text-gray-500 dark:text-gray-400 uppercase">
          Members
        </h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
          <Input 
            placeholder="Search members..." 
            className="pl-9 bg-indigo-50 dark:bg-indigo-900 border-0 rounded-full text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          {filteredMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-indigo-100 dark:border-indigo-800">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-indigo-200 text-indigo-600">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {member.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-indigo-950" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{member.name}</p>
                    {member.isAdmin && (
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  {member.language && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      <Globe className="h-3 w-3 mr-1 text-indigo-400" />
                      {member.language}
                    </div>
                  )}
                </div>
              </div>
              {member.id !== "current-user-id" && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:bg-indigo-100 dark:hover:bg-indigo-900">
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-indigo-900 mt-4">
        <Button variant="outline" className="w-full rounded-full border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Leave Group
        </Button>
      </div>
    </div>
  );
} 