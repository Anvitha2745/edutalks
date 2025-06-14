
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Sparkles, Award, Gift } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PricingPage() {
  const { toast } = useToast();

  const handleSubscribeClick = () => {
    // In a real app, this would integrate with a payment gateway (e.g., Stripe, Razorpay)
    // and then update subscription status in Firebase.
    // The referral code from the input would be sent to the backend for validation and application.
    toast({
      title: "Subscription Initiated (Mock)",
      description: "In a real application, this would lead to a payment gateway and then update Firebase.",
    });
  };

  const premiumFeatures = [
    { text: "1-Day Free Trial Included", icon: <Sparkles className="w-5 h-5 text-accent" /> },
    { text: "Full Year Access to All Features", icon: <Award className="w-5 h-5 text-primary" /> },
    { text: "Unlimited Voice Calls", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Access to All Quizzes & Learning Materials", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Complete Daily Topic Archive", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Advanced AI Pronunciation Feedback", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Priority Support", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="font-headline text-4xl text-center mb-2">Unlock Edutalks Premium</h1>
        <p className="text-muted-foreground font-body text-center text-lg">
          Supercharge your English learning journey with our comprehensive one-year plan.
        </p>
      </div>

      <Card className="shadow-xl border-2 border-primary transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="bg-primary/10 p-6 rounded-t-lg items-center text-center">
          <div className="p-3 bg-primary text-primary-foreground rounded-full inline-block mb-3">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <CardTitle className="font-headline text-3xl">Edutalks Premium</CardTitle>
          <CardDescription className="font-body text-base">One-Time Payment for Full Year Access</CardDescription>
          {/* Pricing is kept in $ for international audience, referral reward is in INR */}
          <p className="font-headline text-4xl text-primary mt-2">$49.99<span className="text-lg text-muted-foreground">/year</span></p>
          <p className="font-body text-sm text-accent font-semibold mt-1">Includes a 1-Day Free Trial!</p>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-headline text-xl mb-4">What&apos;s Included:</h3>
          <ul className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-start font-body">
                <span className="mr-3 mt-0.5 shrink-0">{feature.icon}</span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-center p-6 border-t space-y-4">
          <div className="w-full">
            <Label htmlFor="referralCode" className="font-body flex items-center mb-1 text-sm">
              <Gift className="w-4 h-4 mr-2 text-muted-foreground" />
              Referral Code (Optional)
            </Label>
            <Input id="referralCode" placeholder="Enter referral code (e.g., EDUUSER123)" className="font-body" />
            <p className="text-xs text-muted-foreground mt-1">
              If you have a referral code, enter it here for potential benefits!
            </p>
          </div>
          <Button size="lg" className="w-full font-body text-lg" onClick={handleSubscribeClick}>
            Start Your 1-Day Free Trial & Subscribe
          </Button>
          <p className="text-xs text-muted-foreground mt-3 font-body">
            You will be charged after the 1-day trial period. Cancel anytime before the trial ends.
          </p>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Current Free Plan</CardTitle>
          <CardDescription className="font-body">
            Enjoy basic access to Edutalks.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2 font-body text-muted-foreground">
                <li>Limited voice call duration</li>
                <li>Access to select quizzes</li>
                <li>Today&apos;s daily topic only</li>
                <li>Basic pronunciation feedback</li>
            </ul>
        </CardContent>
        <CardFooter>
             <Button variant="outline" asChild className="font-body">
                <Link href="/dashboard">Continue with Free Plan</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
