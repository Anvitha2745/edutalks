"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, PhoneOff, Volume2, Maximize, Users, MessageSquare } from "lucide-react";
import Image from "next/image";

interface VoiceCallInterfaceProps {
  userName: string;
  userAvatar: string;
  onEndCall: () => void;
}

export function VoiceCallInterface({ userName, userAvatar, onEndCall }: VoiceCallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl overflow-hidden">
      <CardHeader className="bg-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">In call with {userName}</CardTitle>
            <CardDescription className="font-body text-primary/80">LinguaVerse Voice Call</CardDescription>
          </div>
          <div className="font-mono text-sm bg-background/70 px-2 py-1 rounded-md">
            {formatDuration(callDuration)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center bg-background relative min-h-[300px]">
        <div className="absolute inset-0">
          <Image 
            src={userAvatar} 
            alt={`${userName}'s avatar`} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-20 blur-sm"
            data-ai-hint="abstract background"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-lg mb-6">
            <AvatarImage src={userAvatar} alt={userName} data-ai-hint="person talking" />
            <AvatarFallback className="text-4xl">{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="font-headline text-3xl mb-2 text-foreground">{userName}</h2>
          <p className="text-muted-foreground font-body">Connected</p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 md:p-6 flex justify-center items-center space-x-3 md:space-x-4">
        <Button
          variant={isMuted ? "outline" : "default"}
          size="lg"
          className="rounded-full p-3 md:p-4"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff className="h-5 w-5 md:h-6 md:w-6" /> : <Mic className="h-5 w-5 md:h-6 md:w-6" />}
        </Button>
        <Button variant="destructive" size="lg" className="rounded-full p-3 md:p-4" onClick={onEndCall} aria-label="End Call">
          <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full p-3 md:p-4" aria-label="Speaker Settings">
          <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full p-3 md:p-4 hidden md:inline-flex" aria-label="Toggle Fullscreen">
          <Maximize className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
         <Button variant="outline" size="lg" className="rounded-full p-3 md:p-4 hidden md:inline-flex" aria-label="Participants">
          <Users className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
         <Button variant="outline" size="lg" className="rounded-full p-3 md:p-4" aria-label="Chat">
          <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
