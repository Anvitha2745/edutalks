
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MessageCircleHeart, Mic, Users, CheckCircle, BookOpen, Zap, Shield } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function HomePage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "User Accounts",
      description: "Personalized learning journey with profile management.",
    },
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Voice Calling",
      description: "Practice speaking with other users in real-time.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Daily Topics",
      description: "Fresh conversation starters every day to expand your vocabulary.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Interactive Quizzes",
      description: "Test and improve your English skills with engaging quizzes.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Pronunciation Feedback",
      description: "AI-powered insights to perfect your accent.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 max-w-screen-2xl">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container text-center">
            <div className="inline-block p-3 mb-6 rounded-full bg-primary/20">
              <MessageCircleHeart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="mb-6 font-headline text-5xl md:text-7xl font-bold tracking-tight">
              Welcome to <span className="text-primary">LinguaVerse</span>
            </h1>
            <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              Unlock your English potential with interactive voice calls, daily topics, engaging quizzes, and AI-powered pronunciation feedback.
            </p>
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/auth/signup">Get Started for Free</Link>
            </Button>
            <div className="mt-16">
              <Image
                src="https://placehold.co/1200x600.png"
                alt="LinguaVerse platform showcase"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="language learning app interface"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <h2 className="mb-4 text-center font-headline text-4xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="mb-12 text-center text-muted-foreground font-body max-w-xl mx-auto">
              LinguaVerse offers a comprehensive suite of tools to help you master English communication.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="items-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-2">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center font-body">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container text-center">
            <h2 className="mb-6 font-headline text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 text-muted-foreground font-body max-w-lg mx-auto">
              Join thousands of learners and take your English skills to the next level with LinguaVerse.
            </p>
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/auth/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground font-body space-y-2">
          <p>&copy; {new Date().getFullYear()} LinguaVerse. All rights reserved.</p>
          <div className="text-xs">
            <Link href="/auth/admin/login" className="hover:text-primary hover:underline">
              <Shield className="inline-block mr-1 h-3 w-3" /> Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
