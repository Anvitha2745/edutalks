
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, Eye, Tag, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface AdminCourse {
  id: string;
  title: string;
  category: string;
  priceINR: number;
  status: "Published" | "Draft" | "Archived";
  instructor?: string;
  studentsCount: number;
  imageUrl?: string;
}

const mockAdminCourses: AdminCourse[] = [
  { id: "c1", title: "Advanced English Grammar Mastery", category: "Grammar", priceINR: 1999, status: "Published", instructor: "Dr. Emily Carter", studentsCount: 150, imageUrl: "https://placehold.co/100x100.png" },
  { id: "c2", title: "Business English Communication", category: "Professional", priceINR: 2499, status: "Published", instructor: "Mr. John Smith", studentsCount: 120, imageUrl: "https://placehold.co/100x100.png" },
  { id: "c3", title: "IELTS Preparation Intensive", category: "Exam Prep", priceINR: 2999, status: "Draft", instructor: "Ms. Sarah Lee", studentsCount: 0, imageUrl: "https://placehold.co/100x100.png" },
  { id: "c4", title: "Beginner English Fundamentals", category: "Beginner", priceINR: 999, status: "Archived", instructor: "Admin", studentsCount: 300, imageUrl: "https://placehold.co/100x100.png" },
];

export default function CourseManagementPage() {
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
            <GraduationCap className="w-10 h-10 mr-3 text-primary"/>
            Course Management
        </h1>
        <p className="text-muted-foreground font-body">Create, edit, and manage all courses on the Edutalks platform.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Courses</CardTitle>
              <CardDescription className="font-body">List of courses available on the platform.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body" onClick={() => handleAction('Create New Course', '')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium font-body">
                    <div className="flex items-center gap-3">
                        {course.imageUrl && <Image src={course.imageUrl} alt={course.title} width={40} height={40} className="rounded" data-ai-hint="course thumbnail"/>}
                        <span>{course.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.category}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.priceINR.toLocaleString()}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.instructor || "N/A"}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{course.studentsCount}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={course.status === "Published" ? "default" : course.status === "Draft" ? "secondary" : "outline"}
                        className={`capitalize font-body ${course.status === "Published" ? 'bg-green-500/20 text-green-700 border-green-400' : course.status === "Draft" ? 'bg-yellow-500/20 text-yellow-700 border-yellow-400' : 'bg-gray-500/20 text-gray-700 border-gray-400'}`}
                    >
                        {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-body">
                        <DropdownMenuItem onClick={() => handleAction('View Course', course.title)}>
                          <Eye className="mr-2 h-4 w-4" /> View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit Course', course.title)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete Course', course.title)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying mock data. Full course data would be fetched from Firebase and paginated here.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
