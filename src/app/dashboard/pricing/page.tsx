
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Sparkles, Award, Gift, TicketPercent } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PricingPage() {
  const { toast } = useToast();

  const handleSubscribeClick = () => {
    toast({
      title: "Subscription Initiated (Mock)",
      description: "In a real application, this would lead to a payment gateway and then update Firebase.",
    });
  };

  const premiumFeatures = [
    { text: "1-Day Free Trial Included", icon: <Sparkles className="w-5 h-5 text-accent" /> },
    { text: "Access to Core English Learning Course", icon: <Award className="w-5 h-5 text-primary" /> },
    { text: "Unlimited Voice Calls", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Access to All General Quizzes & Learning Materials", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Complete Daily Topic Archive", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "AI Pronunciation Feedback", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { text: "Priority Support", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="font-headline text-4xl text-center mb-2">Edutalks Yearly Subscription</h1>
        <p className="text-muted-foreground font-body text-center text-lg">
          Unlock core English learning features with our one-year plan. Specialized courses can be purchased separately.
        </p>
      </div>

      <Card className="shadow-xl border-2 border-primary transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="bg-primary/10 p-6 rounded-t-lg items-center text-center">
          <div className="p-3 bg-primary text-primary-foreground rounded-full inline-block mb-3">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <CardTitle className="font-headline text-3xl">Edutalks Yearly Plan</CardTitle>
          <CardDescription className="font-body text-base">One-Time Payment for Full Year Access to Core Features</CardDescription>
          <p className="font-headline text-4xl text-primary mt-2">₹499<span className="text-lg text-muted-foreground">/year</span></p>
          <p className="font-body text-sm text-accent font-semibold mt-1">Includes a 1-Day Free Trial!</p>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-headline text-xl mb-4">What&apos;s Included in Subscription:</h3>
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
          <div className="w-full mt-2">
            <Label htmlFor="couponCode" className="font-body flex items-center mb-1 text-sm">
              <TicketPercent className="w-4 h-4 mr-2 text-muted-foreground" />
              Coupon Code (Optional)
            </Label>
            <Input id="couponCode" placeholder="Enter coupon code for subscription discount" className="font-body" />
          </div>
          <Button size="lg" className="w-full font-body text-lg mt-2" onClick={handleSubscribeClick}>
            Start Your 1-Day Free Trial & Subscribe
          </Button>
          <p className="text-xs text-muted-foreground mt-3 font-body">
            You will be charged after the 1-day trial period. Cancel anytime before the trial ends.
          </p>
        </CardFooter>
      </Card>

      <div className="text-center font-body text-muted-foreground">
        <p>To access all core features, a yearly subscription is required.</p>
        <p>Explore specialized <Button variant="link" asChild><Link href="/dashboard/courses">Additional Courses</Link></Button> available for individual purchase.</p>
        <p>If you have any questions, please <Button variant="link" asChild><Link href="/contact">contact support</Link></Button>.</p>
      </div>
    </div>
  );
}

