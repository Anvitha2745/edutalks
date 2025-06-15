
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, FileQuestion, BookCopy, ShieldCheck, UsersRound, GraduationCap, BadgePercent, TicketPercent, BookUser } from "lucide-react";
import Image from "next/image";

export default function AdminDashboardPage() {
  const quickLinks = [
    { href: "/admin/users", label: "Manage Users & Instructors", icon: Users, description: "View, edit, and manage user and instructor accounts." },
    { href: "/admin/courses", label: "Manage Courses", icon: GraduationCap, description: "Add, edit, and manage all courses." },
    { href: "/admin/quizzes", label: "Manage Quizzes", icon: FileQuestion, description: "Create, update, and delete quizzes." },
    { href: "/admin/topics", label: "Manage Topics", icon: BookCopy, description: "Oversee daily discussion topics." },
    { href: "/admin/referrals", label: "Referral System", icon: UsersRound, description: "Configure and monitor referrals." },
    { href: "/admin/offers", label: "Manage Offers", icon: BadgePercent, description: "Create and manage course discounts." },
    { href: "/admin/coupons", label: "Manage Coupons", icon: TicketPercent, description: "Generate and track coupon codes." },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <CardTitle className="font-headline text-4xl">Admin Dashboard</CardTitle>
          </div>
          <CardDescription className="font-body text-lg text-foreground/80">
            Welcome, Administrator! Manage Edutalks content, users, and system settings from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="font-body text-foreground/90">
                This is your central hub for overseeing all aspects of the Edutalks platform. 
                Use the quick links below or the sidebar navigation to access different management sections.
              </p>
              <Button asChild size="lg" className="shadow-md hover:shadow-primary/40 transition-shadow">
                <Link href="/admin/users">
                  View Users & Instructors <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="https://placehold.co/400x300.png" 
                alt="Admin panel illustration" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
                data-ai-hint="control panel interface"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-3xl mb-6">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
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
          <CardTitle className="font-headline text-2xl">Platform Statistics (Mock)</CardTitle>
          <CardDescription className="font-body">Overview of platform activity. This is a placeholder.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Active Subscriptions</p>
              <p className="text-2xl font-bold">567</p>
            </div>
             <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Courses Sold</p>
              <p className="text-2xl font-bold">890</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

