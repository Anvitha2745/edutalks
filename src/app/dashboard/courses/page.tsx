
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Tag, Search, ListFilter, PercentCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export interface CourseListItem {
  id: string;
  title: string;
  category: string;
  description: string;
  priceINR: number;
  offerPriceINR?: number;
  imageUrl: string;
  instructor?: string;
  isIncludedWithSubscription?: boolean; // New field
  currentProgress?: number; // Mock progress 0-100
  dataAiHint?: string;
}

const mockCourses: CourseListItem[] = [
  {
    id: "course1",
    title: "Advanced English Grammar Mastery (Core)",
    category: "Grammar",
    description: "Deep dive into complex grammatical structures, tenses, and usage for fluent and accurate English. Included with your subscription.",
    priceINR: 0, // Or handle display differently if included
    isIncludedWithSubscription: true,
    currentProgress: 75, // Mock progress
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Dr. Emily Carter",
    dataAiHint: "grammar textbook education"
  },
  {
    id: "course2",
    title: "Business English Communication",
    category: "Professional",
    description: "Learn essential vocabulary, phrases, and communication strategies for the modern workplace.",
    priceINR: 2499,
    currentProgress: 30, // Mock progress
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Mr. John Smith",
    dataAiHint: "business meeting presentation"
  },
  {
    id: "course3",
    title: "IELTS Preparation Intensive",
    category: "Exam Prep",
    description: "Comprehensive preparation for all sections of the IELTS exam with mock tests and expert tips.",
    priceINR: 2999,
    offerPriceINR: 2499,
    currentProgress: 0, // Mock progress
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Ms. Sarah Lee",
    dataAiHint: "exam study success"
  },
  {
    id: "course4",
    title: "Conversational English Fluency",
    category: "Speaking",
    description: "Practice real-life conversations, improve pronunciation, and build confidence in speaking English.",
    priceINR: 1599,
    currentProgress: 10, // Mock progress
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Mr. David Miller",
    dataAiHint: "people talking conversation"
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-4xl flex items-center">
            <GraduationCap className="w-10 h-10 mr-3 text-primary" />
            Explore Courses
          </h1>
          <p className="text-muted-foreground font-body">
            Enhance your skills with our specialized English courses. Some courses may be included with your subscription.
          </p>
        </div>
        {/* Placeholder for future "Suggest a Course" button if needed */}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search courses..." className="pl-10 font-body w-full md:max-w-sm" />
        </div>
        <Button variant="outline" className="font-body w-full md:w-auto">
          <ListFilter className="mr-2 h-4 w-4" /> Filter by Category
        </Button>
      </div>

      {mockCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover rounded-t-lg"
                data-ai-hint={course.dataAiHint || "online learning course"}
              />
              <CardHeader>
                <div className="flex justify-between items-start mb-1">
                  <CardTitle className="font-headline text-xl leading-tight">{course.title}</CardTitle>
                  <Badge variant="secondary" className="font-body whitespace-nowrap">{course.category}</Badge>
                </div>
                {course.instructor && (
                  <p className="text-xs text-muted-foreground font-body">By {course.instructor}</p>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-3">{course.description}</p>
                {!course.isIncludedWithSubscription && (
                  <div className="flex items-baseline gap-2">
                    {course.offerPriceINR ? (
                      <>
                        <p className="font-body text-2xl font-semibold text-primary">₹{course.offerPriceINR}</p>
                        <p className="font-body text-lg text-muted-foreground line-through">₹{course.priceINR}</p>
                      </>
                    ) : (
                      <p className="font-body text-2xl font-semibold text-primary">₹{course.priceINR}</p>
                    )}
                  </div>
                )}
                {course.offerPriceINR && !course.isIncludedWithSubscription && (
                    <Badge variant="destructive" className="mt-1 font-body">Special Offer!</Badge>
                )}
                {course.isIncludedWithSubscription && (
                  <Badge variant="default" className="mt-1 font-body bg-green-600 hover:bg-green-700">Included with Subscription</Badge>
                )}
                 {typeof course.currentProgress === 'number' && course.currentProgress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{course.currentProgress}%</span>
                    </div>
                    <Progress value={course.currentProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full font-body">
                  <Link href={`/dashboard/courses/${course.id}`}>
                    {course.isIncludedWithSubscription || (course.currentProgress || 0) > 0 ? "Continue Learning" : "View Details"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Image 
            src="https://placehold.co/400x300.png" 
            alt="No courses available" 
            width={400} 
            height={300} 
            className="mx-auto mb-6 rounded-lg"
            data-ai-hint="empty bookshelf library"
          />
          <h2 className="font-headline text-2xl mb-2">No Courses Available Yet</h2>
          <p className="font-body text-muted-foreground">Please check back later for new and exciting courses!</p>
        </div>
      )}
    </div>
  );
}
