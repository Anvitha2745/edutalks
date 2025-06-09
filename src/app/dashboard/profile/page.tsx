"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Save, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  learningGoals: z.string().max(200, {message: "Learning goals must not be longer than 200 characters."}).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

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

  // Mock subscription data
  const mockSubscription = {
    status: "Free User", // Could be "Premium", "Trial Active"
    // trialEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(), // Example for trial
    // nextBillingDate: "N/A",
  };

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile updated (mock):", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved (mock).",
    });
  }

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
              <div className="flex items-center space-x-6 mb-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/150x150.png" alt="User avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload New Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body">Full Name</FormLabel>
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
                      <FormLabel className="font-body">Email Address</FormLabel>
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
                    <FormLabel className="font-body">Short Bio</FormLabel>
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
                    <FormLabel className="font-body">Learning Goals</FormLabel>
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
            <CreditCard className="w-6 h-6 text-primary"/>
            <CardTitle className="font-headline text-2xl">Subscription Status</CardTitle>
          </div>
          <CardDescription className="font-body">Manage your Edutalks subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 font-body">
            <p>Current Plan: <span className="font-semibold">{mockSubscription.status}</span></p>
            {mockSubscription.status === "Trial Active" && mockSubscription.trialEndDate && (
                <p>Trial Ends: <span className="font-semibold">{mockSubscription.trialEndDate}</span></p>
            )}
            {mockSubscription.status === "Premium" && mockSubscription.nextBillingDate &&(
                 <p>Next Billing Date: <span className="font-semibold">{mockSubscription.nextBillingDate}</span></p>
            )}
             {mockSubscription.status !== "Premium" && (
                 <Button asChild>
                    <Link href="/dashboard/pricing">
                        <ShieldCheck className="mr-2 h-4 w-4" /> Upgrade to Premium
                    </Link>
                </Button>
            )}
        </CardContent>
      </Card>


       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Account Security</CardTitle>
          <CardDescription className="font-body">Manage your password and account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="font-body">Change Password</Button>
          <Button variant="destructive" className="font-body">Delete Account (Disabled)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
