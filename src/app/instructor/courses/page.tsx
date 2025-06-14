
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Eye, Users, MessageSquareWarning, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface InstructorCourse {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft" | "Archived";
  studentsEnrolled: number;
  pendingDoubts: number;
  lastUpdated: string;
  imageUrl?: string;
}

// Mock data, in a real app this would come from Firebase based on instructor's assignments
const mockInstructorCourses: InstructorCourse[] = [
  { id: "c1", title: "Advanced English Grammar Mastery", category: "Grammar", status: "Published", studentsEnrolled: 150, pendingDoubts: 5, lastUpdated: "2024-05-20", imageUrl: "https://placehold.co/100x100.png" },
  { id: "c2", title: "Business English Communication", category: "Professional", status: "Published", studentsEnrolled: 120, pendingDoubts: 2, lastUpdated: "2024-05-18", imageUrl: "https://placehold.co/100x100.png" },
  { id: "c3", title: "IELTS Preparation Intensive", category: "Exam Prep", status: "Draft", studentsEnrolled: 0, pendingDoubts: 0, lastUpdated: "2024-06-01", imageUrl: "https://placehold.co/100x100.png" },
];

export default function InstructorCoursesPage() {
  const { toast } = useToast();

  const handleAction = (action: string, courseTitle: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for course "${courseTitle}" triggered. This would interact with Firebase.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl flex items-center">
            My Courses
        </h1>
        <p className="text-muted-foreground font-body">Manage content, view student progress, and interact with learners for your assigned courses.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">Your Assigned Courses</CardTitle>
              <CardDescription className="font-body">Overview of courses you are instructing.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search your courses..." className="pl-9 font-body w-full" />
                </div>
                {/* Instructors might not create courses directly, admins might assign. This button is optional. */}
                {/* <Button variant="default" className="font-body" onClick={() => handleAction('Propose New Course', '')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Propose New Course
                </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Pending Doubts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInstructorCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium font-body">
                    <div className="flex items-center gap-3">
                        {course.imageUrl && <Image src={course.imageUrl} alt={course.title} width={40} height={40} className="rounded" data-ai-hint="course thumbnail"/>}
                        <span>{course.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.category}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.studentsEnrolled}</TableCell>
                  <TableCell className="font-body text-muted-foreground">
                    <Badge variant={course.pendingDoubts > 0 ? "destructive" : "outline"} className="flex items-center gap-1">
                        {course.pendingDoubts > 0 && <MessageSquareWarning className="h-3 w-3" />}
                        {course.pendingDoubts}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={course.status === "Published" ? "default" : course.status === "Draft" ? "secondary" : "outline"}
                        className={`capitalize font-body ${course.status === "Published" ? 'bg-green-500/20 text-green-700 border-green-400' : course.status === "Draft" ? 'bg-yellow-500/20 text-yellow-700 border-yellow-400' : 'bg-gray-500/20 text-gray-700 border-gray-400'}`}
                    >
                        {course.status}
                    </Badge>
                  </TableCell>
                   <TableCell className="font-body text-muted-foreground">{course.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-body">
                        <DropdownMenuItem onClick={() => handleAction('View Course Details', course.title)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit Course Content', course.title)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Content
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleAction('View Enrolled Students', course.title)}>
                          <Users className="mr-2 h-4 w-4" /> View Students
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleAction('View Course Analytics', course.title)}>
                          <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying mock data. Full course data would be fetched from Firebase and filtered for the logged-in instructor.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
