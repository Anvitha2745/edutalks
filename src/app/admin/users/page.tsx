
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Search, Edit, Trash2, Eye, UserCog, UserCheck, ShieldCheck, BookUser, Loader2, AlertTriangle, Users as UsersIcon } from "lucide-react";
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
  raw: ApiUser; // Keep raw API user data for updates
}


export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUserDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async () => {
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
      
      const displayUsers = apiUsers.map((apiUser): AdminUserDisplay => ({
        id: apiUser.uid,
        fullName: apiUser.displayName,
        email: apiUser.email,
        avatarUrl: apiUser.photoURL,
        role: apiUser.customClaims?.admin ? 'Admin' : 
              apiUser.customClaims?.instructor ? 'Instructor' : 
              'User', // Simplified role determination
        status: apiUser.disabled ? 'Suspended' : 'Active',
        joinedDate: new Date(apiUser.creationTime).toLocaleDateString(),
        raw: apiUser,
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
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateUserStatus = async (userId: string, disabled: boolean) => {
    // Optimistically update UI
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, status: disabled ? 'Suspended' : 'Active' } : u));

    try {
      // TODO: Send Authorization header with Firebase ID token for security
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disabled }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Failed to update user: ${response.statusText}`);
      }

      const updatedApiUser: ApiUser = await response.json();
      // Update UI with confirmed data
      setUsers(prevUsers => prevUsers.map(u => u.id === userId ? {
        ...u,
        status: updatedApiUser.disabled ? 'Suspended' : 'Active',
        raw: updatedApiUser,
       } : u));

      toast({
        title: "User Status Updated",
        description: `User ${disabled ? 'suspended' : 'unsuspended'} successfully.`,
      });

    } catch (err) {
      console.error("Error updating user status:", err);
      toast({
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Could not update user status.",
        variant: "destructive",
      });
      // Revert optimistic update
      fetchUsers(); 
    }
  };
  
  // Placeholder for other actions
  const handleGenericAction = (action: string, userName?: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for user ${userName || 'N/A'} triggered. This needs full implementation.`,
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

  const filteredUsers = users.filter(user => 
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                    <Input 
                        placeholder="Search users by name or email..." 
                        className="pl-9 font-body w-full" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="default" className="font-body" onClick={() => handleGenericAction('Add User/Instructor')}>
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
              <Button variant="outline" size="sm" onClick={fetchUsers} className="mt-4">Retry</Button>
            </div>
          )}
          {!isLoading && !error && filteredUsers.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">
                 <UsersIcon className="h-12 w-12 mx-auto mb-4" />
                <p className="font-semibold text-lg">No users found.</p>
                <p>{searchTerm ? "No users match your search criteria." : "There are currently no users in the system."}</p>
            </div>
          )}
          {!isLoading && !error && filteredUsers.length > 0 && (
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
                {filteredUsers.map((user) => (
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
                          <DropdownMenuItem onClick={() => handleGenericAction('View Profile', user.fullName)}>
                            <Eye className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenericAction('Edit User (Role)', user.fullName)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit User (Role)
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Active" ? (
                            <DropdownMenuItem className="text-orange-600 focus:text-orange-700 focus:bg-orange-500/10" onClick={() => handleUpdateUserStatus(user.id, true)}>
                                <UserCog className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          ) : (
                             <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-500/10" onClick={() => handleUpdateUserStatus(user.id, false)}>
                                <UserCheck className="mr-2 h-4 w-4" /> Unsuspend User
                            </DropdownMenuItem>
                          )}
                          {/* Prevent deleting admins as a safeguard, can be adjusted */}
                          {user.role !== "Admin" && (
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleGenericAction('Delete User', user.fullName)}>
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
          {!isLoading && !error && filteredUsers.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4 font-body text-center">
                Displaying {filteredUsers.length} user(s). Pagination would be needed for larger datasets.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
