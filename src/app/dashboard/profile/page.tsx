
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel as ShadcnFormLabel, // Renamed to avoid conflict
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Save, CreditCard, ShieldCheck, Camera, MapPin, Users, Video, XCircle, Gift, Wallet as WalletIcon, Copy, Info } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label"; // Standard Label for non-form elements

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  learningGoals: z.string().max(200, {message: "Learning goals must not be longer than 200 characters."}).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock data for initial load - in a real app, fetch from Firebase
const defaultValues: Partial<ProfileFormValues> = {
  fullName: "Edutalks User",
  email: "user@edutalks.com",
  bio: "Passionate about learning new languages and connecting with people.",
  learningGoals: "Achieve B2 fluency in English, practice daily conversations.",
};

export default function ProfilePage() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [avatarSrc, setAvatarSrc] = useState<string | null>("https://placehold.co/150x150.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Mock subscription data - assuming user is subscribed.
  const mockSubscription = {
    status: "Premium User (Yearly)",
    renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
  };

  const [userReferralCode, setUserReferralCode] = useState<string>("LOADING...");
  const [walletBalance, setWalletBalance] = useState<string>("₹0.00"); 

  useEffect(() => {
    // Simulate fetching user-specific referral code from Firebase
    setTimeout(() => {
      setUserReferralCode("EDUUSER123"); 
    }, 1000);
    // Wallet balance would be fetched from Firebase in a real app.
  }, []);

  function onSubmit(data: ProfileFormValues) {
    // In a real app, update user data in Firebase Firestore
    console.log("Profile updated (mock):", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved (mock).",
    });
  }

  const handleCopyReferralCode = () => {
    if (userReferralCode && userReferralCode !== "LOADING...") {
      navigator.clipboard.writeText(userReferralCode);
      toast({ title: "Referral Code Copied!", description: `${userReferralCode} copied to clipboard.` });
    }
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
        // In a real app, you'd upload this to Firebase Storage and update user's profile URL in Firestore
        toast({ title: "Avatar Updated", description: "New avatar previewed. Save changes to persist (mock)." });
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
        setShowCamera(true);
        toast({ title: "Camera Activated" });
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        setShowCamera(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings.",
        });
      }
    } else {
      toast({ variant: "destructive", title: "Camera Not Supported", description: "Your browser doesn't support camera access." });
    }
  }, [toast]);

  const capturePhoto = () => {
    if (videoRef.current && videoStream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setAvatarSrc(dataUrl);
        // In a real app, upload this to Firebase Storage
        toast({ title: "Photo Captured", description: "Avatar updated with new photo. Save changes to persist (mock)." });
      }
      closeCamera();
    }
  };

  const closeCamera = useCallback(() => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
    setVideoStream(null);
    setShowCamera(false);
    if (videoRef.current) {
        videoRef.current.srcObject = null;
    }
  }, [videoStream]);

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const handleGetLocation = useCallback(() => {
    setLocation(null);
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast({ title: "Location Fetched", description: `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}` });
        },
        (error) => {
          setLocationError(error.message);
          toast({ variant: "destructive", title: "Location Error", description: error.message });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      const unsupportedError = "Geolocation is not supported by this browser.";
      setLocationError(unsupportedError);
      toast({ variant: "destructive", title: "Location Not Supported", description: unsupportedError });
    }
  }, [toast]);
  
  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);


  const handleAccessContacts = () => {
    toast({
      title: "Contacts API (User-Initiated)",
      description: "The Contact Picker API allows users to select contacts to share. This requires user interaction due to privacy reasons. Full implementation requires careful handling of permissions and browser compatibility. See console for more info.",
    });
    console.log("To implement contact access, use the Contact Picker API: navigator.contacts.select(['name', 'email'], {multiple: true}). This is a user-initiated action and requires HTTPS.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Your Profile</h1>
        <p className="text-muted-foreground font-body">Manage your account settings and personalize your Edutalks experience.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Account Information</CardTitle>
          <CardDescription className="font-body">Update your personal details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-2 border-primary shadow-md">
                  <AvatarImage src={avatarSrc || "https://placehold.co/150x150.png"} alt="User avatar" data-ai-hint="person avatar"/>
                  <AvatarFallback className="text-3xl">
                    {defaultValues.fullName ? defaultValues.fullName.substring(0, 2).toUpperCase() : "ET"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-3 items-center md:items-start">
                  <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload from Gallery
                  </Button>
                  <Input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleAvatarFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  <Button variant="outline" type="button" onClick={openCamera}>
                    <Camera className="mr-2 h-4 w-4" /> Take Photo with Camera
                  </Button>
                </div>
              </div>

              {showCamera && (
                <Card className="mt-4 border-primary shadow-md">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center justify-between">
                        <span>Live Camera Feed</span>
                        <Button variant="ghost" size="icon" onClick={closeCamera} aria-label="Close camera">
                            <XCircle className="h-5 w-5 text-destructive"/>
                        </Button>
                    </CardTitle>
                    {hasCameraPermission === false && (
                         <Alert variant="destructive">
                            <AlertTitle>Camera Access Denied</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser settings to use this feature.
                            </AlertDescription>
                        </Alert>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <video 
                        ref={videoRef} 
                        className="w-full max-w-md aspect-video rounded-md bg-muted shadow-inner" 
                        autoPlay 
                        muted 
                        playsInline
                    />
                    {videoStream && hasCameraPermission && (
                      <Button type="button" onClick={capturePhoto} className="mt-4">
                        <Camera className="mr-2 h-4 w-4" /> Capture Photo
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <ShadcnFormLabel className="font-body">Full Name</ShadcnFormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} className="font-body" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <ShadcnFormLabel className="font-body">Email Address</ShadcnFormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} className="font-body" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <ShadcnFormLabel className="font-body">Short Bio</ShadcnFormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none font-body"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <ShadcnFormLabel className="font-body">Learning Goals</ShadcnFormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What do you want to achieve with Edutalks?"
                        className="resize-none font-body"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="font-body">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">Referral Program</CardTitle>
          </div>
          <CardDescription className="font-body">Invite friends and earn rewards!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 font-body">
          <div>
            <Label htmlFor="userReferralCode">Your Unique Referral Code</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input id="userReferralCode" readOnly value={userReferralCode} className="font-mono bg-muted/50" />
              <Button variant="outline" size="icon" onClick={handleCopyReferralCode} aria-label="Copy referral code" disabled={userReferralCode === "LOADING..."}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
             <p className="text-xs text-muted-foreground mt-1">This code is unique to you. It would be generated and stored by Firebase.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this code with your friends. When they sign up for a yearly subscription using your code, you&apos;ll receive a reward (e.g., ₹50, amount managed by admin) in your wallet!
          </p>
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="#">View Referral Terms & Conditions</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <WalletIcon className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">My Wallet</CardTitle>
          </div>
          <CardDescription className="font-body">Your available balance from referrals. This balance would be fetched from Firebase.</CardDescription>
        </CardHeader>
        <CardContent className="font-body space-y-3">
          <p className="text-3xl font-bold">{walletBalance}</p>
           <p className="text-sm text-muted-foreground">
            Your wallet balance can be used to get discounts on future Edutalks subscriptions.
          </p>
          <p className="text-sm text-muted-foreground">
            You can also withdraw your balance to your bank account or UPI ID.
          </p>
          <Alert variant="default" className="bg-accent/10 border-accent/30 text-accent-foreground/80">
            <Info className="h-4 w-4 text-accent" />
            <AlertTitle className="font-headline text-accent">Important</AlertTitle>
            <AlertDescription>
              Unused wallet balance will expire 90 days after it is credited.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-3">
            <Button variant="outline" disabled>Withdraw Funds (Coming Soon)</Button>
            <p className="text-xs text-muted-foreground">
                Withdrawals may be subject to a small processing fee/commission. Minimum withdrawal amount may apply.
            </p>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">Location Services</CardTitle>
          </div>
           <CardDescription className="font-body">The app will attempt to access your location to personalize experiences. You will be prompted for permission upon page load if not already granted/denied.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 font-body">
            <Button onClick={handleGetLocation} variant="outline">Refresh My Current Location</Button>
            {location && (
                <Alert>
                    <MapPin className="h-4 w-4" />
                    <AlertTitle className="font-headline">Location Acquired</AlertTitle>
                    <AlertDescription>
                        Latitude: {location.latitude.toFixed(6)}, Longitude: {location.longitude.toFixed(6)}
                    </AlertDescription>
                </Alert>
            )}
            {locationError && (
                <Alert variant="destructive">
                     <AlertTitle className="font-headline">Location Error</AlertTitle>
                    <AlertDescription>{locationError}</AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">Contacts Access (User-Initiated)</CardTitle>
          </div>
           <CardDescription className="font-body">To connect with friends easily, you can choose to share contacts from your device. For privacy and security, this action must be initiated by you by clicking the button below; it cannot be enabled automatically.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
            <Button onClick={handleAccessContacts} variant="outline">Share Contacts (via Contact Picker)</Button>
            <p className="text-xs text-muted-foreground mt-2">
                This feature uses the Contact Picker API, allowing you to select specific contacts to share. Browser support may vary. Requires HTTPS.
            </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">Subscription Status</CardTitle>
          </div>
          <CardDescription className="font-body">Manage your Edutalks subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 font-body">
            <p>Current Plan: <span className="font-semibold">{mockSubscription.status}</span></p>
            <p>Renews on: <span className="font-semibold">{mockSubscription.renewalDate}</span></p>
            {/* In a real app, integrate with your payment provider (e.g., Stripe, Razorpay) via Firebase */}
            <Button variant="outline" disabled>Manage Subscription (Mock)</Button>
        </CardContent>
      </Card>


       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Account Security</CardTitle>
          <CardDescription className="font-body">Manage your password and account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Implement password change via Firebase Authentication methods */}
          <Button variant="outline" className="font-body" disabled>Change Password (Mock)</Button>
          {/* Implement account deletion via Firebase Authentication and Firestore data cleanup */}
          <Button variant="destructive" className="font-body" disabled>Delete Account (Disabled)</Button>
        </CardContent>
      </Card>
    </div>
  );
}

