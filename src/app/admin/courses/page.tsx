
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, Eye, GraduationCap, Users as UsersIcon, Loader2, AlertTriangle, ListFilter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { auth } from "@/lib/firebase"; // For getting ID token

// Placeholder for your Cloud Function base URL
const CLOUD_FUNCTION_BASE_URL = "YOUR_CLOUD_FUNCTION_BASE_URL_HERE"; // e.g., https://us-central1-your-project-id.cloudfunctions.net/api

interface BackendCourse {
  id: string; // Document ID from Firestore
  title: string;
  description?: string;
  category: string;
  price?: number; // Assumed to be in INR as per previous mock
  instructorId: string;
  isPublished: boolean;
  enrollmentCount: number;
  createdAt: string | { _seconds: number, _nanoseconds: number }; // Firestore timestamp
  updatedAt?: string | { _seconds: number, _nanoseconds: number };
  imageUrl?: string; // Optional image URL
}

// Frontend display structure for admin courses
interface AdminCourseDisplay {
  id: string;
  title: string;
  category: string;
  priceINR: number;
  status: "Published" | "Draft"; // Derived from isPublished
  instructorId: string; // Will need to fetch instructor details later for display name
  studentsCount: number;
  imageUrl?: string;
  createdDate: string;
}

export default function CourseManagementPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<AdminCourseDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getIdToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken(true);
    }
    return null;
  };

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error("Authentication token not available. Please ensure you are logged in as an admin.");
      }
      if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") {
        throw new Error("Cloud Function URL is not configured. Please update it in src/app/admin/courses/page.tsx");
      }

      const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch courses: ${response.statusText}`);
      }
      const backendCourses: BackendCourse[] = await response.json();
      
      const displayCourses = backendCourses.map((course): AdminCourseDisplay => {
        let creationDate = "N/A";
        if (typeof course.createdAt === 'string') {
            creationDate = new Date(course.createdAt).toLocaleDateString();
        } else if (course.createdAt && typeof course.createdAt._seconds === 'number') {
            creationDate = new Date(course.createdAt._seconds * 1000).toLocaleDateString();
        }

        return {
            id: course.id,
            title: course.title,
            category: course.category,
            priceINR: course.price || 0,
            status: course.isPublished ? 'Published' : 'Draft',
            instructorId: course.instructorId, // Displaying ID for now
            studentsCount: course.enrollmentCount || 0,
            imageUrl: course.imageUrl || "https://placehold.co/100x100.png",
            createdDate: creationDate,
        };
      });
      setCourses(displayCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error Fetching Courses",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreateCourse = () => {
    // Placeholder: This will open a dialog/modal for creating a course
    toast({
      title: "Create New Course (Placeholder)",
      description: "This will open a form to add a new course.",
    });
    // Future: setCreateCourseDialogOpen(true);
  };
  
  const handleViewCourse = (courseId: string) => {
    toast({
      title: "View Course (Placeholder)",
      description: `Viewing details for course ID: ${courseId}. This will navigate to a detailed view or open a modal.`,
    });
  };

  const handleEditCourse = (courseId: string) => {
    toast({
      title: "Edit Course (Placeholder)",
      description: `Editing course ID: ${courseId}. This will open an edit form.`,
    });
     // Future: setEditCourseDialogOpen(true); setEditingCourseId(courseId);
  };

  const handleDeleteCourse = async (courseId: string, courseTitle: string) => {
    if (!confirm(`Are you sure you want to delete the course "${courseTitle}"? This action cannot be undone.`)) {
      return;
    }
    // Placeholder: Implement actual delete call to backend
    toast({
      title: "Delete Course (Placeholder)",
      description: `Deleting course: ${courseTitle}. Backend integration needed.`,
    });
    // try {
    //   const token = await getIdToken();
    //   if (!token) throw new Error("Authentication token not available.");
    //   if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") throw new Error("Cloud Function URL not configured.");
      
    //   const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/courses/${courseId}`, {
    //     method: 'DELETE',
    //     headers: { 'Authorization': `Bearer ${token}` },
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error || `Failed to delete course: ${response.statusText}`);
    //   }
    //   toast({ title: "Course Deleted", description: `Course "${courseTitle}" has been deleted.` });
    //   fetchCourses(); // Refresh the list
    // } catch (err) {
    //   const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    //   toast({ title: "Delete Failed", description: errorMessage, variant: "destructive" });
    // }
  };
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl flex items-center">
            <GraduationCap className="w-10 h-10 mr-3 text-primary"/>
            Course Management
        </h1>
        <p className="text-muted-foreground font-body">Create, edit, and manage all courses on the LinguaVerse platform.</p>
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
                    <Input 
                      placeholder="Search courses..." 
                      className="pl-9 font-body w-full" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* <Button variant="outline" className="font-body"> <ListFilter className="mr-2 h-4 w-4"/> Filter</Button> */}
                <Button variant="default" className="font-body" onClick={handleCreateCourse}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 font-body">Loading courses...</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-destructive">
              <AlertTriangle className="h-8 w-8 mb-2" />
              <p className="font-body font-semibold">Failed to load courses</p>
              <p className="font-body text-sm text-center">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchCourses} className="mt-4">Retry</Button>
            </div>
          )}
          {!isLoading && !error && filteredCourses.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">
              <GraduationCap className="h-12 w-12 mx-auto mb-4" />
              <p className="font-semibold text-lg">No courses found.</p>
              <p>{searchTerm ? "No courses match your search criteria." : "There are currently no courses in the system."}</p>
            </div>
          )}
          {!isLoading && !error && filteredCourses.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead>Instructor ID</TableHead>
                  <TableHead><UsersIcon className="inline-block h-4 w-4 mr-1"/>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium font-body">
                      <div className="flex items-center gap-3">
                          {course.imageUrl && <Image src={course.imageUrl} alt={course.title} width={40} height={40} className="rounded" data-ai-hint="course thumbnail"/>}
                          <span>{course.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-body text-muted-foreground">{course.category}</TableCell>
                    <TableCell className="font-body text-muted-foreground">{course.priceINR > 0 ? course.priceINR.toLocaleString() : "Free"}</TableCell>
                    <TableCell className="font-body text-muted-foreground text-xs">{course.instructorId}</TableCell>
                    <TableCell className="font-body text-muted-foreground">{course.studentsCount}</TableCell>
                    <TableCell>
                      <Badge 
                          variant={course.status === "Published" ? "default" : "secondary"}
                          className={`capitalize font-body ${course.status === "Published" ? 'bg-green-500/20 text-green-700 border-green-400' : 'bg-yellow-500/20 text-yellow-700 border-yellow-400'}`}
                      >
                          {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-body text-muted-foreground text-xs">{course.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="font-body">
                          <DropdownMenuItem onClick={() => handleViewCourse(course.id)}>
                            <Eye className="mr-2 h-4 w-4" /> View Course
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCourse(course.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Course
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteCourse(course.id, course.title)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying {isLoading ? '...' : filteredCourses.length} course(s). Ensure your Cloud Function URL for courses is correctly configured.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
