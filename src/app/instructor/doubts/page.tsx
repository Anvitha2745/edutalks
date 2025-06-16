"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  MessageSquareReply,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentDoubt {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseTitle: string;
  doubtSummary: string;
  dateSubmitted: string;
  status: "Pending" | "Answered" | "In Progress";
}

// Mock data
const mockDoubts: StudentDoubt[] = [
  {
    id: "d1",
    studentName: "Alice Wonderland",
    studentAvatar: "https://placehold.co/50x50.png?a=A",
    courseTitle: "Advanced English Grammar",
    doubtSummary: "Confused about subjunctive mood...",
    dateSubmitted: "2024-06-10",
    status: "Pending",
  },
  {
    id: "d2",
    studentName: "Carlos Ray",
    studentAvatar: "https://placehold.co/50x50.png?c=C",
    courseTitle: "Business Communication",
    doubtSummary: "Need clarification on email etiquette for formal complaints.",
    dateSubmitted: "2024-06-09",
    status: "Answered",
  },
  {
    id: "d3",
    studentName: "Fiona Gallagher",
    studentAvatar: "https://placehold.co/50x50.png?f=F",
    courseTitle: "Advanced English Grammar",
    doubtSummary: "Difference between 'lay' and 'lie'?",
    dateSubmitted: "2024-06-11",
    status: "In Progress",
  },
];

export default function InstructorDoubtsPage() {
  const { toast } = useToast();

  const handleAction = (action: string, doubtId: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for doubt ID "${doubtId}" triggered. This would interact with Firebase.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl flex items-center">Student Doubts</h1>
        <p className="text-muted-foreground font-body">
          Review and respond to questions submitted by students in your courses.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">Pending & Resolved Doubts</CardTitle>
              <CardDescription className="font-body">Manage student queries effectively.</CardDescription>
            </div>
            <div className="relative flex-grow md:flex-grow-0 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search doubts..." className="pl-9 font-body w-full md:w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Doubt Summary</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDoubts.map((doubt) => (
                <TableRow key={doubt.id}>
                  <TableCell className="font-medium font-body">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={doubt.studentAvatar}
                          alt={doubt.studentName}
                          data-ai-hint="student avatar"
                        />
                        <AvatarFallback>{doubt.studentName.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <span>{doubt.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{doubt.courseTitle}</TableCell>
                  <TableCell className="font-body text-muted-foreground text-sm">{doubt.doubtSummary}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{doubt.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doubt.status === "Answered"
                          ? "default"
                          : doubt.status === "Pending"
                          ? "destructive"
                          : "secondary"
                      }
                      className={`capitalize font-body ${
                        doubt.status === "Answered"
                          ? "bg-green-500/20 text-green-700 border-green-400"
                          : doubt.status === "Pending"
                          ? "bg-red-500/20 text-red-700 border-red-400"
                          : "bg-yellow-500/20 text-yellow-700 border-yellow-400"
                      }`}
                    >
                      {doubt.status === "Answered" && (
                        <CheckCircle className="inline-block h-3 w-3 mr-1" />
                      )}
                      {doubt.status === "Pending" && (
                        <MessageSquare className="inline-block h-3 w-3 mr-1" />
                      )}
                      {doubt.status === "In Progress" && (
                        <Clock className="inline-block h-3 w-3 mr-1" />
                      )}
                      {doubt.status}
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
                        <DropdownMenuItem onClick={() => handleAction("View & Reply", doubt.id)}>
                          <MessageSquareReply className="mr-2 h-4 w-4" /> View & Reply
                        </DropdownMenuItem>
                        {doubt.status === "Pending" && (
                          <DropdownMenuItem onClick={() => handleAction("Mark as In Progress", doubt.id)}>
                            <Clock className="mr-2 h-4 w-4" /> Mark as In Progress
                          </DropdownMenuItem>
                        )}
                        {doubt.status !== "Answered" && (
                          <DropdownMenuItem onClick={() => handleAction("Mark as Answered", doubt.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Answered
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-4 font-body text-center">
            Displaying mock data. Full doubt list would be fetched from Firebase and filtered for the logged-in instructor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
