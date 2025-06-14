
// src/app/dashboard/courses/[courseId]/page.tsx
"use client"; 

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Users, PlayCircle, Star, ShoppingCart, TicketPercent, CheckCheck, Lightbulb, NotebookText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseListItem } from "../page"; 
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

// Mock data, replace with actual data fetching logic
const mockCourseDetails: Record<string, CourseListItem & { longDescription: string; modules: string[]; learningOutcomes: string[]; prerequisites?: string[]; reviewsCount?: number; rating?: number;  }> = {
  course1: {
    id: "course1",
    title: "Advanced English Grammar Mastery (Core)",
    category: "Grammar",
    description: "Deep dive into complex grammatical structures, tenses, and usage for fluent and accurate English. Included with your subscription.",
    longDescription: "This comprehensive course covers advanced topics in English grammar, including conditional sentences, passive voice, reported speech, advanced verb patterns, and idiomatic expressions. Perfect for learners aiming for C1/C2 levels or those who want to refine their grammatical precision.",
    priceINR: 0, // This is included
    isIncludedWithSubscription: true,
    currentProgress: 75,
    imageUrl: "https://placehold.co/800x400.png",
    instructor: "Dr. Emily Carter",
    modules: ["Advanced Tenses", "Conditionals & Subjunctives", "Passive Voice & Causatives", "Reported Speech", "Complex Sentences", "Advanced Vocabulary & Idioms"],
    learningOutcomes: ["Master complex grammatical structures.", "Use a wide range of vocabulary and idioms.", "Improve writing and speaking accuracy.", "Understand nuanced English usage."],
    prerequisites: ["Intermediate (B1/B2) level of English proficiency."],
    reviewsCount: 120,
    rating: 4.8,
    dataAiHint: "grammar textbook education"
  },
   course2: {
    id: "course2",
    title: "Business English Communication",
    category: "Professional",
    description: "Learn essential vocabulary, phrases, and communication strategies for the modern workplace.",
    longDescription: "Tailored for professionals, this course focuses on effective communication in business contexts. Topics include presentations, negotiations, meetings, report writing, and cross-cultural communication. Enhance your professional image and career prospects.",
    priceINR: 2499,
    currentProgress: 30,
    imageUrl: "https://placehold.co/800x400.png",
    instructor: "Mr. John Smith",
    modules: ["Effective Presentations", "Negotiation Skills", "Email & Report Writing", "Conducting Meetings", "Networking English", "Cross-Cultural Communication"],
    learningOutcomes: ["Communicate confidently in business settings.", "Write professional emails and reports.", "Deliver impactful presentations.", "Navigate cross-cultural business interactions."],
    reviewsCount: 95,
    rating: 4.6,
    dataAiHint: "business meeting presentation"
  },
};


export default function CourseDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<(CourseListItem & { longDescription: string; modules: string[]; learningOutcomes: string[]; prerequisites?: string[]; reviewsCount?: number; rating?: number; }) | null>(null);
  const [isPurchased, setIsPurchased] = useState(false); // Mock purchase status for non-subscription courses

  useEffect(() => {
    if (courseId) {
      const fetchedCourse = mockCourseDetails[courseId];
      setCourse(fetchedCourse || null);
      if (fetchedCourse?.id === "course2") { // Mock course2 as purchased
        setIsPurchased(true);
      }
    }
  }, [courseId]);

  const handlePurchase = () => {
    if (!course) return;
    toast({
      title: "Purchase Initiated (Mock)",
      description: `You are about to purchase "${course.title}". In a real app, this would redirect to a payment gateway.`,
    });
  };

  const handleRaiseDoubt = () => {
    toast({
        title: "Doubt Submitted (Mock)",
        description: "Your question has been sent to the instructor. They will get back to you soon."
    })
  }
  
  const handleSaveNotes = () => {
    toast({
        title: "Notes Saved (Mock)",
        description: "Your notes for this course have been saved."
    })
  }

  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="font-headline text-3xl mb-4">Course Not Found</h1>
        <p className="font-body text-muted-foreground mb-6">Sorry, we couldn&apos;t find the course you&apos;re looking for.</p>
        <Button asChild>
          <Link href="/dashboard/courses"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const userHasAccess = course.isIncludedWithSubscription || isPurchased;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Button variant="outline" asChild className="mb-4 font-body">
        <Link href="/dashboard/courses"><ArrowLeft className="mr-2 h-4 w-4"/> Back to All Courses</Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={800}
              height={400}
              className="w-full h-auto md:h-80 object-cover"
              data-ai-hint={course.dataAiHint || "online learning course content"}
            />
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className="font-body">{course.category}</Badge>
                {course.rating && course.reviewsCount && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{course.rating.toFixed(1)} ({course.reviewsCount} reviews)</span>
                  </div>
                )}
              </div>
              <CardTitle className="font-headline text-4xl leading-tight">{course.title}</CardTitle>
              {course.instructor && (
                <p className="font-body text-md text-muted-foreground">Taught by: {course.instructor}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-body text-lg leading-relaxed text-foreground/90">{course.longDescription}</p>
              
              {userHasAccess && typeof course.currentProgress === 'number' && (
                <div className="my-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-headline text-xl">Your Progress</h3>
                        <span className="font-body text-lg font-semibold text-primary">{course.currentProgress}% Complete</span>
                    </div>
                    <Progress value={course.currentProgress} className="h-3" />
                </div>
              )}

              <div>
                <h3 className="font-headline text-xl mb-2">What you&apos;ll learn:</h3>
                <ul className="list-disc list-inside space-y-1 font-body text-foreground/80">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCheck className="w-5 h-5 mr-2 mt-0.5 text-green-600 shrink-0" /> {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {course.prerequisites && (
                 <div>
                    <h3 className="font-headline text-xl mb-2">Prerequisites:</h3>
                    <ul className="list-disc list-inside space-y-1 font-body text-foreground/80">
                        {course.prerequisites.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {userHasAccess && (
            <>
              <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {course.modules.map((moduleName, index) => (
                        <li key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center">
                            <BookOpen className="w-5 h-5 mr-3 text-primary" />
                            <span className="font-body">{moduleName}</span>
                        </div>
                        <Button variant="ghost" size="sm"><PlayCircle className="w-5 h-5 mr-1"/> Start Lesson</Button>
                        </li>
                    ))}
                    </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center">
                        <NotebookText className="w-6 h-6 mr-2 text-primary"/> My Notes
                    </CardTitle>
                    <CardDescription className="font-body">Jot down your thoughts and learnings for this course.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your notes here... (mock, not saved)" className="min-h-[150px] font-body"/>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveNotes} className="font-body">Save Notes (Mock)</Button>
                </CardFooter>
              </Card>
            </>
          )}

          {!userHasAccess && (
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-6 bg-muted/50 rounded-md">
                        <p className="font-body text-muted-foreground">Purchase this course to access all modules and learning materials.</p>
                        <Button onClick={handlePurchase} className="mt-4 font-body">
                            <ShoppingCart className="mr-2 h-4 w-4" /> Purchase Course
                        </Button>
                    </div>
                </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-1 space-y-6">
            {!userHasAccess && (
                <Card className="shadow-lg sticky top-20">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Purchase this Course</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-baseline gap-2">
                        {course.offerPriceINR ? (
                            <>
                            <p className="font-body text-3xl font-bold text-primary">₹{course.offerPriceINR}</p>
                            <p className="font-body text-xl text-muted-foreground line-through">₹{course.priceINR}</p>
                            </>
                        ) : (
                            <p className="font-body text-3xl font-bold text-primary">₹{course.priceINR}</p>
                        )}
                        </div>
                        {course.offerPriceINR && (
                            <Badge variant="destructive" className="font-body">Special Offer!</Badge>
                        )}
                        <p className="font-body text-sm text-muted-foreground">One-time payment for lifetime access to this course.</p>
                        
                        <div className="pt-2">
                            <Label htmlFor="couponCodeCourse" className="font-body flex items-center mb-1 text-sm">
                            <TicketPercent className="w-4 h-4 mr-2 text-muted-foreground" />
                            Coupon Code (Optional)
                            </Label>
                            <Input id="couponCodeCourse" placeholder="Enter coupon code" className="font-body" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full font-body" onClick={handlePurchase}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {userHasAccess && (
                 <Card className="shadow-lg sticky top-20">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Course Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Button onClick={handleRaiseDoubt} className="w-full font-body">
                            <Lightbulb className="mr-2 h-4 w-4" /> Raise a Doubt
                        </Button>
                    </CardContent>
                 </Card>
            )}

             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">This course includes:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 font-body text-sm">
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-muted-foreground"/> Approx. {course.modules.length * 5} hours of content</p>
                    <p className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-muted-foreground"/> {course.modules.length} modules</p>
                    <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-muted-foreground"/> Lifetime access</p>
                    {course.isIncludedWithSubscription && <p className="flex items-center"><CheckCheck className="w-4 h-4 mr-2 text-green-600"/> Included in your subscription</p>}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
