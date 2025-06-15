
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Search, UserPlus } from "lucide-react";
import { VoiceCallInterface } from "@/components/voice-call/VoiceCallInterface";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: "online" | "offline" | "busy";
}

const mockUsers: User[] = [
  { id: "1", name: "Alice Wonderland", avatarUrl: "https://placehold.co/100x100.png?a=1", status: "online" },
  { id: "2", name: "Bob The Builder", avatarUrl: "https://placehold.co/100x100.png?b=2", status: "offline" },
  { id: "3", name: "Charlie Brown", avatarUrl: "https://placehold.co/100x100.png?c=3", status: "busy" },
  { id: "4", name: "Diana Prince", avatarUrl: "https://placehold.co/100x100.png?d=4", status: "online" },
  { id: "5", name: "Edward Scissorhands", avatarUrl: "https://placehold.co/100x100.png?e=5", status: "online" },
];

export default function VoiceCallsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inCallWith, setInCallWith] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startCall = (user: User) => {
    if (user.status === 'online') {
      setInCallWith(user);
    }
  };

  const endCall = () => {
    setInCallWith(null);
  };

  if (inCallWith) {
    return <VoiceCallInterface userName={inCallWith.name} userAvatar={inCallWith.avatarUrl} onEndCall={endCall} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Voice Calls</h1>
        <p className="text-muted-foreground font-body">Connect with other Edutalks users and practice your English speaking skills.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Available Users</CardTitle>
          <CardDescription className="font-body">Find someone to talk to. Click the phone icon to start a call.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-10 font-body"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="font-body">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Friend
            </Button>
          </div>

          {filteredUsers.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <ul className="space-y-4">
                {filteredUsers.map((user) => (
                  <li key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold font-body">{user.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className={`h-2 w-2 rounded-full mr-2 ${
                            user.status === 'online' ? 'bg-green-500' : user.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                          }`}></span>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={user.status === 'online' ? "default" : "outline"} 
                      size="icon" 
                      onClick={() => startCall(user)}
                      disabled={user.status !== 'online'}
                      aria-label={`Call ${user.name}`}
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="text-center py-10 text-muted-foreground font-body">
              <Image src="https://placehold.co/300x200.png" alt="No users found" width={300} height={200} className="mx-auto mb-4 rounded-lg" data-ai-hint="empty state illustration" />
              <p className="font-semibold text-lg">No users found matching your search.</p>
              <p>Try a different name or clear the search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

