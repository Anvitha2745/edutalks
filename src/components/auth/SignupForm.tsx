
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase"; 
import { createUserWithEmailAndPassword, updateProfile, AuthError, type User } from "firebase/auth";

// Placeholder for your Cloud Function base URL
const CLOUD_FUNCTION_BASE_URL = "YOUR_CLOUD_FUNCTION_BASE_URL_HERE"; // e.g., https://us-central1-your-project-id.cloudfunctions.net


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).max(50, {message: "Full name is too long."}),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function createUserProfileInFirestore(firebaseUser: User, fullName: string) {
    try {
      const token = await firebaseUser.getIdToken();
      if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") {
        console.warn("Cloud Function URL is not configured. Skipping Firestore profile creation.");
        toast({
          title: "Profile Partially Created",
          description: "Your authentication account is set up, but please configure the backend URL to complete profile creation in Firestore.",
          variant: "default", // Changed from destructive to default or warning
        });
        return;
      }

      // Simple split for fullName to firstName and lastName
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(' ') || " ";


      const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          role: 'student', // Default role for new signups
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user profile in Firestore.");
      }
      console.log("User profile created in Firestore successfully.");
    } catch (error) {
      console.error("Error creating user profile in Firestore:", error);
      toast({
        title: "Profile Creation Issue",
        description: `Your account is created, but there was an issue setting up your full profile: ${error instanceof Error ? error.message : String(error)}. You can complete this from your profile page or contact support.`,
        variant: "default", // Changed from destructive
        duration: 7000,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.fullName,
        });
        // After Firebase Auth user is created and displayName updated, create profile in Firestore
        await createUserProfileInFirestore(userCredential.user, values.fullName);
      }

      toast({
        title: "Signup Successful",
        description: "Your account has been created. Welcome!",
      });
      router.push("/dashboard");

    } catch (error) {
      const authError = error as AuthError;
      console.error("Firebase signup error:", authError);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (authError.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      } else if (authError.code === "auth/weak-password") {
        errorMessage = "The password is too weak. Please choose a stronger password.";
      }
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Create Your Account</CardTitle>
        <CardDescription className="text-center font-body">
          Join Edutalks and start your language learning adventure!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="font-body" disabled={isLoading} />
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
                  <FormLabel className="font-body">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} className="font-body" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body">Password</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="font-body pr-10"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="font-body pr-10"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-body" disabled={isLoading}>
              {isLoading ? "Signing up..." : <><UserPlus className="mr-2 h-4 w-4" /> Sign Up</>}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 pt-4">
        <p className="text-sm text-muted-foreground font-body">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
