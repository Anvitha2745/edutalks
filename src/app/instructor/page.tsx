
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessageSquareWarning, UserCheck, BarChart3, Settings } from "lucide-react";
import Image from "next/image";

export default function InstructorDashboardPage() {
  const quickLinks = [
    { href: "/instructor/courses", label: "Manage My Courses", icon: BookOpenCheck, description: "View and update your assigned courses." },
    { href: "/instructor/doubts", label: "View Student Doubts", icon: MessageSquareWarning, description: "Address questions and provide support." },
    // { href: "/instructor/profile", label: "My Instructor Profile", icon: UserCheck, description: "Update your public profile." },
    // { href: "/instructor/analytics", label: "Course Analytics", icon: BarChart3, description: "Track student engagement and progress." },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-green-500/10 via-blue-500/5 to-purple-500/10 border-green-500/30">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
             <Image src="https://placehold.co/60x60.png" alt="Instructor Icon" width={60} height={60} className="rounded-full" data-ai-hint="teacher education icon"/>
            <CardTitle className="font-headline text-4xl">Instructor Dashboard</CardTitle>
          </div>
          <CardDescription className="font-body text-lg text-foreground/80">
            Welcome, Instructor! Manage your courses, engage with students, and track their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="font-body text-foreground/90">
                This is your dedicated space to oversee your teaching activities on Edutalks.
                Use the quick links or sidebar to navigate.
              </p>
              <Button asChild size="lg" className="shadow-md bg-primary hover:bg-primary/90 transition-shadow">
                <Link href="/instructor/courses">
                  View My Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="https://placehold.co/400x300.png" 
                alt="Instructor teaching illustration" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
                data-ai-hint="teacher online class"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-3xl mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {quickLinks.map((link) => (
            <Card key={link.href} className="hover:shadow-xl transition-shadow duration-300 flex flex-col border-border hover:border-primary/50">
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
                  <Link href={link.href}>Go to Section <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Recent Activity (Mock)</CardTitle>
          <CardDescription className="font-body">Overview of recent student interactions. This is a placeholder.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <ul className="space-y-3">
            <li className="p-3 bg-muted/50 rounded-lg text-sm">New doubt submitted for "Advanced English Grammar".</li>
            <li className="p-3 bg-muted/50 rounded-lg text-sm">3 students completed Module 1 of "Business Communication".</li>
            <li className="p-3 bg-muted/50 rounded-lg text-sm">Reminder: Course content update scheduled for "IELTS Prep".</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
