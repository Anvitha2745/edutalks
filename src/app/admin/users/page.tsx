
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Search, Edit, Trash2, Eye, UserCog, UserCheck, ShieldCheck, BookUser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: "User" | "Moderator" | "Instructor" | "Admin"; // Added Instructor and Admin
  status: "Active" | "Suspended" | "Pending";
  joinedDate: string;
}

const mockAdminUsers: AdminUser[] = [
  { id: "u1", fullName: "Alice Wonderland", email: "alice@example.com", avatarUrl: "https://placehold.co/100x100.png?a=1", role: "User", status: "Active", joinedDate: "2023-01-15" },
  { id: "u2", fullName: "Bob The Builder", email: "bob@example.com", avatarUrl: "https://placehold.co/100x100.png?b=2", role: "Instructor", status: "Active", joinedDate: "2023-02-20" },
  { id: "u3", fullName: "Charlie Brown", email: "charlie@example.com", avatarUrl: "https://placehold.co/100x100.png?c=3", role: "Moderator", status: "Suspended", joinedDate: "2023-03-10" },
  { id: "u4", fullName: "Diana Prince", email: "diana@example.com", avatarUrl: "https://placehold.co/100x100.png?d=4", role: "User", status: "Pending", joinedDate: "2023-04-05" },
  { id: "u5", fullName: "Edu Admin", email: "admin@edutalks.com", avatarUrl: "https://placehold.co/100x100.png?e=5", role: "Admin", status: "Active", joinedDate: "2022-01-01" },
];

export default function UserManagementPage() {
  const { toast } = useToast();

  const handleAction = (action: string, userName: string, userId?: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for user ${userName} triggered. User ID: ${userId || 'N/A'}. This would interact with Firebase.`,
    });
  };

  const getRoleBadgeVariant = (role: AdminUser["role"]) => {
    switch (role) {
      case "Admin": return "destructive"; // More prominent for admin
      case "Instructor": return "default"; // Primary color for instructor
      case "Moderator": return "secondary";
      default: return "outline";
    }
  };

  const getRoleIcon = (role: AdminUser["role"]) => {
    switch (role) {
        case "Admin": return <ShieldCheck className="mr-2 h-4 w-4" />;
        case "Instructor": return <BookUser className="mr-2 h-4 w-4" />;
        case "Moderator": return <UserCog className="mr-2 h-4 w-4" />;
        default: return <UserCheck className="mr-2 h-4 w-4" />;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">User & Instructor Management</h1>
        <p className="text-muted-foreground font-body">View, manage roles, and moderate Edutalks users and instructors.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Users</CardTitle>
              <CardDescription className="font-body">List of registered users, instructors, and moderators.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body" onClick={() => handleAction('Add User/Instructor', '')}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add User / Instructor
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="person avatar" />
                        <AvatarFallback>{user.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium font-body">{user.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="font-body">
                    <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize flex items-center">
                       {getRoleIcon(user.role)} {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={user.status === "Active" ? "default" : user.status === "Suspended" ? "destructive" : "outline"}
                        className={`capitalize font-body ${user.status === "Active" ? 'bg-green-500/20 text-green-700 border-green-400' : user.status === "Suspended" ? 'bg-red-500/20 text-red-700 border-red-400' : 'bg-yellow-500/20 text-yellow-700 border-yellow-400'}`}
                    >
                        {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{user.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-body">
                        <DropdownMenuItem onClick={() => handleAction('View Profile', user.fullName, user.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit User', user.fullName, user.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.role !== "Instructor" && user.role !== "Admin" && (
                             <DropdownMenuItem onClick={() => handleAction('Make Instructor', user.fullName, user.id)}>
                                <BookUser className="mr-2 h-4 w-4" /> Make Instructor
                            </DropdownMenuItem>
                        )}
                        {user.role === "Instructor" && (
                             <DropdownMenuItem onClick={() => handleAction('Remove Instructor Role', user.fullName, user.id)}>
                                <UserCog className="mr-2 h-4 w-4" /> Remove Instructor Role
                            </DropdownMenuItem>
                        )}
                         {user.role !== "Admin" && (
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete User', user.fullName, user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete User
                            </DropdownMenuItem>
                         )}
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
