
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Search, Edit, Trash2, Eye, UserCog, UserCheck, ShieldCheck, BookUser, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ApiUser } from "@/app/api/admin/users/route"; // Import the user type

// Interface matching the structure from the API and suitable for the table
interface AdminUserDisplay {
  id: string; // uid from Firebase
  fullName?: string; // displayName
  email?: string;
  avatarUrl?: string; // photoURL
  role: "User" | "Moderator" | "Instructor" | "Admin"; // This will need to be derived or fetched
  status: "Active" | "Suspended"; // Based on 'disabled' property
  joinedDate: string; // creationTime
}


export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUserDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: Send Authorization header with Firebase ID token for security
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || `Failed to fetch users: ${response.statusText}`);
        }
        const apiUsers: ApiUser[] = await response.json();
        
        // Transform ApiUser to AdminUserDisplay
        const displayUsers = apiUsers.map(apiUser => ({
          id: apiUser.uid,
          fullName: apiUser.displayName,
          email: apiUser.email,
          avatarUrl: apiUser.photoURL,
          // TODO: Role needs to be properly determined (e.g., from custom claims or Firestore)
          // For now, default to 'User' or try to guess based on email for mock display
          role: apiUser.email === 'admin@edutalks.com' ? 'Admin' : 
                apiUser.email === 'instructor@edutalks.com' ? 'Instructor' : 
                'User', 
          status: apiUser.disabled ? 'Suspended' : 'Active',
          joinedDate: new Date(apiUser.creationTime).toLocaleDateString(),
        }));
        setUsers(displayUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        toast({
          title: "Error Fetching Users",
          description: err instanceof Error ? err.message : "Could not load user data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [toast]);

  const handleAction = (action: string, userName?: string, userId?: string) => {
    // TODO: Implement actual Firebase actions (e.g., update role, disable user)
    // These actions would typically call another API endpoint (e.g., PUT /api/admin/users/[userId])
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for user ${userName || userId || 'N/A'} triggered. This would interact with Firebase via a backend API.`,
    });
  };

  const getRoleBadgeVariant = (role: AdminUserDisplay["role"]) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Instructor": return "default"; 
      case "Moderator": return "secondary";
      default: return "outline";
    }
  };

  const getRoleIcon = (role: AdminUserDisplay["role"]) => {
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
                <Button variant="default" className="font-body" onClick={() => handleAction('Add User/Instructor')}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add User / Instructor
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 font-body">Loading users...</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-destructive">
              <AlertTriangle className="h-8 w-8 mb-2" />
              <p className="font-body font-semibold">Failed to load users</p>
              <p className="font-body text-sm">{error}</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">Retry</Button>
            </div>
          )}
          {!isLoading && !error && users.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">
                 <Users className="h-12 w-12 mx-auto mb-4" />
                <p className="font-semibold text-lg">No users found.</p>
                <p>There are currently no users in the system or matching your search.</p>
            </div>
          )}
          {!isLoading && !error && users.length > 0 && (
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatarUrl || `https://placehold.co/100x100.png?text=${user.fullName ? user.fullName.substring(0,1) : 'U'}`} alt={user.fullName || 'User'} data-ai-hint="person avatar" />
                          <AvatarFallback>{user.fullName ? user.fullName.substring(0, 2).toUpperCase() : (user.email ? user.email.substring(0,2).toUpperCase() : 'N/A')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium font-body">{user.fullName || user.email || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-body text-muted-foreground">{user.email || 'N/A'}</TableCell>
                    <TableCell className="font-body">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize flex items-center">
                        {getRoleIcon(user.role)} {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                          variant={user.status === "Active" ? "default" : "destructive"}
                          className={`capitalize font-body ${user.status === "Active" ? 'bg-green-500/20 text-green-700 border-green-400' : 'bg-red-500/20 text-red-700 border-red-400'}`}
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
                            <Edit className="mr-2 h-4 w-4" /> Edit User (e.g. Role)
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Active" && (
                            <DropdownMenuItem className="text-orange-600 focus:text-orange-700 focus:bg-orange-500/10" onClick={() => handleAction('Suspend User', user.fullName, user.id)}>
                                <UserCog className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          )}
                          {user.status === "Suspended" && (
                             <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-500/10" onClick={() => handleAction('Unsuspend User', user.fullName, user.id)}>
                                <UserCheck className="mr-2 h-4 w-4" /> Unsuspend User
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
          )}
          {!isLoading && !error && users.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4 font-body text-center">
                Displaying {users.length} user(s). Pagination would be needed for larger datasets.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
