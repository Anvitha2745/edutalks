
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
import { Eye, EyeOff, LogIn, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/layout/Logo";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@edutalks.com", // Default for easy testing
      password: "password", // Default for easy testing
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Placeholder for admin login logic
    console.log("Admin login attempt:", values);
    if (values.email === "admin@edutalks.com" && values.password === "password") {
      toast({
        title: "Admin Login Successful (Mock)",
        description: "Redirecting to admin dashboard.",
      });
      // Simulate successful login and redirect
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      toast({
        title: "Admin Login Failed (Mock)",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-destructive/10 via-background to-destructive/20 p-4">
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
      <Card className="w-full max-w-md shadow-xl border-destructive/50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldAlert className="w-12 h-12 text-destructive" />
          </div>
          <CardTitle className="font-headline text-3xl text-center">Admin Panel Login</CardTitle>
          <CardDescription className="text-center font-body">
            Access restricted to authorized personnel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} className="font-body" />
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
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-body bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Login to Admin Panel
              </Button>
            </form>
          </Form>
        </CardContent>
         <CardFooter className="text-center text-xs text-muted-foreground pt-4">
            <p>This is a restricted area. All activities may be monitored.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
