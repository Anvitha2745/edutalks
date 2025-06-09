
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AdminQuiz {
  id: string;
  title: string;
  category: string; // Example: Grammar, Vocabulary, Idioms
  questionsCount: number;
  status: "Published" | "Draft" | "Archived";
  lastUpdated: string;
}

const mockAdminQuizzes: AdminQuiz[] = [
  { id: "q1", title: "Basic English Grammar", category: "Grammar", questionsCount: 10, status: "Published", lastUpdated: "2023-10-20" },
  { id: "q2", title: "Travel Vocabulary Advanced", category: "Vocabulary", questionsCount: 15, status: "Published", lastUpdated: "2023-10-22" },
  { id: "q3", title: "Intermediate Idioms Part 1", category: "Idioms", questionsCount: 20, status: "Draft", lastUpdated: "2023-10-25" },
  { id: "q4", title: "Verb Tenses Review", category: "Grammar", questionsCount: 12, status: "Archived", lastUpdated: "2023-09-15" },
];

export default function QuizManagementPage() {
  const { toast } = useToast();

  const handleAction = (action: string, quizTitle: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for quiz "${quizTitle}" triggered.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Quiz Management</h1>
        <p className="text-muted-foreground font-body">Create, edit, and manage quizzes for Edutalks users.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Quizzes</CardTitle>
              <CardDescription className="font-body">List of quizzes available on the platform.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search quizzes..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Quiz
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminQuizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium font-body">{quiz.title}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{quiz.category}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{quiz.questionsCount}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={quiz.status === "Published" ? "default" : quiz.status === "Draft" ? "secondary" : "outline"}
                        className={`capitalize ${quiz.status === "Published" ? 'bg-green-500/20 text-green-700 border-green-400' : quiz.status === "Draft" ? 'bg-yellow-500/20 text-yellow-700 border-yellow-400' : 'bg-gray-500/20 text-gray-700 border-gray-400'}`}
                    >
                        {quiz.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{quiz.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('Preview Quiz', quiz.title)}>
                          <PlayCircle className="mr-2 h-4 w-4" /> Preview Quiz
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit Quiz', quiz.title)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Quiz
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete Quiz', quiz.title)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Quiz
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
