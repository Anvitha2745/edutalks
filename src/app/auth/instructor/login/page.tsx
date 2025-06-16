
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
import { Eye, EyeOff, LogIn, Presentation, ChromeIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/layout/Logo";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthError } from "firebase/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function InstructorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "instructor@edutalks.com", // Default for easy testing
      password: "password", // Default for easy testing
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Placeholder for instructor-specific login logic (e.g., checking roles after general Firebase auth)
    if (values.email === "instructor@edutalks.com" && values.password === "password") {
       try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Instructor Login Successful",
          description: "Redirecting to instructor dashboard.",
        });
        // TODO: Add role check here if necessary
        router.push("/instructor");
      } catch (error) {
        const authError = error as AuthError;
        console.error("Instructor Firebase login error:", authError);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (authError.code === "auth/user-not-found" || authError.code === "auth/wrong-password" || authError.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password. Please ensure you have instructor credentials.";
        }
        toast({
          title: "Instructor Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } else {
         // Fallback for non-default credentials, attempt standard Firebase auth
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            // After successful auth, you'd typically check if this user has an 'instructor' role.
            // For now, we'll assume any successful login here is an instructor for demo purposes.
            // This needs to be replaced with actual role checking (e.g., custom claims or Firestore role field).
            toast({
                title: "Login Successful (Instructor Role Mocked)",
                description: "Redirecting to instructor dashboard. Role verification needed in real app.",
            });
            router.push("/instructor");
        } catch (error) {
            const authError = error as AuthError;
            console.error("Instructor Firebase login error:", authError);
            let errorMessage = "Login failed. Please check your credentials.";
            if (authError.code === "auth/user-not-found" || authError.code === "auth/wrong-password" || authError.code === "auth/invalid-credential") {
                errorMessage = "Invalid email or password for instructor account.";
            }
            toast({
                title: "Instructor Login Failed",
                description: errorMessage,
                variant: "destructive",
            });
        }
    }
    setIsLoading(false);
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // After successful Google auth, you'd typically check if this user has an 'instructor' role.
      // For now, we'll assume any successful login here is an instructor for demo purposes.
      // This needs to be replaced with actual role checking.
      toast({
        title: "Google Sign-In Successful (Instructor Role Mocked)",
        description: "Redirecting to instructor dashboard. Role verification needed.",
      });
      router.push("/instructor");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Instructor Google Sign-In error:", authError);
      let errorMessage = "Could not sign in with Google. Please try again.";
       if (authError.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup closed. Please try again.";
      }
      toast({
        title: "Instructor Google Sign-In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-green-500/10 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
             Back to Home
          </Link>
        </Button>
      </div>
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      <Card className="w-full max-w-md shadow-xl border-primary/50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Presentation className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-center">Instructor Panel Login</CardTitle>
          <CardDescription className="text-center font-body">
            Access your courses and student interactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="instructor@example.com" {...field} className="font-body" disabled={isLoading} />
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
              <Button type="submit" className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? "Logging in..." : <><LogIn className="mr-2 h-4 w-4" /> Login to Instructor Panel</>}
              </Button>
            </form>
          </Form>
          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 font-body" onClick={handleGoogleSignIn} disabled={isLoading}>
            <ChromeIcon className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
        </CardContent>
         <CardFooter className="text-center text-xs text-muted-foreground pt-4">
            <p>Access for registered Edutalks instructors only.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
