import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Mic, BookOpen, CheckCircle, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const quickLinks = [
    { href: "/dashboard/calls", label: "Start a Call", icon: Mic, description: "Practice speaking live." },
    { href: "/dashboard/topics", label: "Today's Topic", icon: BookOpen, description: "Explore new conversation starters." },
    { href: "/dashboard/quizzes", label: "Take a Quiz", icon: CheckCircle, description: "Test your knowledge." },
    { href: "/dashboard/pronunciation", label: "Practice Pronunciation", icon: MessageSquareQuote, description: "Get AI feedback." },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-primary/20 to-accent/10 border-primary/30">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Welcome back, Lingua User!</CardTitle>
          <CardDescription className="font-body text-lg text-foreground/80">
            Ready to improve your English today? Let&apos;s get started!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="font-body text-foreground/90">
                Your journey to fluency continues here. Explore daily topics, practice speaking with others, test your skills with quizzes, and get instant feedback on your pronunciation.
              </p>
              <Button asChild size="lg" className="shadow-md hover:shadow-primary/40 transition-shadow">
                <Link href="/dashboard/topics">
                  View Daily Topic <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="https://placehold.co/400x300.png" 
                alt="Language learning illustration" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
                data-ai-hint="happy learning student"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-3xl mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.href} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <link.icon className="w-6 h-6" />
                </div>
                <CardTitle className="font-headline text-xl">{link.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-body text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
              <CardContent>
                 <Button variant="outline" asChild className="w-full font-body">
                  <Link href={link.href}>Go <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Progress (Mock)</CardTitle>
          <CardDescription className="font-body">Keep track of your learning journey. This is a placeholder.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <div className="space-y-4">
            <div>
              <p>Vocabulary Learned: <span className="font-semibold">120 words</span></p>
              <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                <div className="bg-primary h-2.5 rounded-full" style={{width: "60%"}}></div>
              </div>
            </div>
            <div>
              <p>Quizzes Completed: <span className="font-semibold">5 quizzes</span></p>
              <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                <div className="bg-accent h-2.5 rounded-full" style={{width: "75%"}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
