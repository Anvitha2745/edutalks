
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AdminTopic {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  publishDate: string; // Could be 'YYYY-MM-DD' or a more descriptive string
  author: string;
}

const mockAdminTopics: AdminTopic[] = [
  { id: "t1", title: "The Future of Remote Work", category: "Work & Career", status: "Published", publishDate: "2023-10-26", author: "Admin" },
  { id: "t2", title: "Sustainable Living Practices", category: "Environment", status: "Scheduled", publishDate: "2023-11-01", author: "Jane Doe" },
  { id: "t3", title: "Impact of AI on Art", category: "Technology", status: "Draft", publishDate: "N/A", author: "Admin" },
  { id: "t4", title: "Mindfulness and Well-being", category: "Personal Development", status: "Published", publishDate: "2023-10-20", author: "John Smith" },
];

export default function TopicManagementPage() {
  const { toast } = useToast();

  const handleAction = (action: string, topicTitle: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for topic "${topicTitle}" triggered.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Topic Management</h1>
        <p className="text-muted-foreground font-body">Oversee and manage daily discussion topics for Edutalks users.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Topics</CardTitle>
              <CardDescription className="font-body">List of discussion topics on the platform.</CardDescription>
            </div>
             <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search topics..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Topic
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
                <TableHead>Status</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminTopics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell className="font-medium font-body">{topic.title}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{topic.category}</TableCell>
                  <TableCell>
                     <Badge 
                        variant={topic.status === "Published" ? "default" : topic.status === "Scheduled" ? "secondary" : "outline"}
                        className={`capitalize ${topic.status === "Published" ? 'bg-green-500/20 text-green-700 border-green-400' : topic.status === "Scheduled" ? 'bg-blue-500/20 text-blue-700 border-blue-400' : 'bg-yellow-500/20 text-yellow-700 border-yellow-400'}`}
                    >
                        {topic.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{topic.publishDate}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{topic.author}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('View Topic', topic.title)}>
                          <Eye className="mr-2 h-4 w-4" /> View Topic
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit Topic', topic.title)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Topic
                        </DropdownMenuItem>
                        <DropdownMenuItem  className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete Topic', topic.title)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Topic
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
