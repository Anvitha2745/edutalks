
'use client';

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
import { auth } from "@/lib/firebase"; // Import Firebase auth for getting ID token

// Placeholder for your Cloud Function base URL
const CLOUD_FUNCTION_BASE_URL = "YOUR_CLOUD_FUNCTION_BASE_URL_HERE"; // e.g., https://us-central1-your-project-id.cloudfunctions.net

// Matches the structure from your Firestore 'users' collection
interface BackendUser {
  id: string; // UID from Firebase Auth, also document ID in Firestore
  email?: string;
  firstName?: string;
  lastName?: string;
  role: "student" | "instructor" | "admin";
  isActive: boolean;
  createdAt: string | { _seconds: number, _nanoseconds: number }; // Firestore timestamp
  updatedAt?: string | { _seconds: number, _nanoseconds: number };
  // Add other fields if necessary
}

// Frontend display structure
interface AdminUserDisplay {
  id: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string; // Keep for UI, but it's not in backend schema
  role: "student" | "instructor" | "admin";
  status: "Active" | "Suspended"; // Derived from isActive
  joinedDate: string;
  isActive: boolean; // Store the original isActive for updates
}

export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUserDisplay[]>([]);
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

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error("Authentication token not available. Please ensure you are logged in as an admin.");
      }
      if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") {
        throw new Error("Cloud Function URL is not configured. Please update it in src/app/admin/users/page.tsx");
      }

      const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch users: ${response.statusText}`);
      }
      const backendUsers: BackendUser[] = await response.json();
      
      const displayUsers = backendUsers.map((user): AdminUserDisplay => {
        let creationDate = "N/A";
        if (typeof user.createdAt === 'string') {
            creationDate = new Date(user.createdAt).toLocaleDateString();
        } else if (user.createdAt && typeof user.createdAt._seconds === 'number') {
            creationDate = new Date(user.createdAt._seconds * 1000).toLocaleDateString();
        }

        return {
            id: user.id,
            fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            email: user.email,
            avatarUrl: `https://placehold.co/100x100.png?text=${(user.firstName || 'U').substring(0,1)}${(user.lastName || '').substring(0,1)}`, // Placeholder avatar
            role: user.role,
            status: user.isActive ? 'Active' : 'Suspended',
            joinedDate: creationDate,
            isActive: user.isActive,
        };
      });
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

  const handleUpdateUserStatus = async (userId: string, currentIsActive: boolean) => {
    // Optimistically update UI
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, status: !currentIsActive ? 'Active' : 'Suspended', isActive: !currentIsActive } : u));

    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error("Authentication token not available.");
      }
       if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") {
        throw new Error("Cloud Function URL is not configured.");
      }

      const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentIsActive }), // Send the new desired state
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update user: ${response.statusText}`);
      }

      toast({
        title: "User Status Updated",
        description: `User ${!currentIsActive ? 'unsuspended' : 'suspended'} successfully.`,
      });
    } catch (err) {
      console.error("Error updating user status:", err);
      toast({
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Could not update user status.",
        variant: "destructive",
      });
      // Revert optimistic update on error
      fetchUsers(); 
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Add a confirmation dialog here in a real app
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error("Authentication token not available.");
      }
      if (CLOUD_FUNCTION_BASE_URL === "YOUR_CLOUD_FUNCTION_BASE_URL_HERE") {
        throw new Error("Cloud Function URL is not configured.");
      }
      const response = await fetch(`${CLOUD_FUNCTION_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete user: ${response.statusText}`);
      }
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error("Error deleting user:", err);
      toast({
        title: "Delete Failed",
        description: err instanceof Error ? err.message : "Could not delete user.",
        variant: "destructive",
      });
    }
  };


  const handleGenericAction = (action: string, userName?: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for user ${userName || 'N/A'} triggered. Role change needs specific API.`,
    });
  };

  const getRoleBadgeVariant = (role: AdminUserDisplay["role"]) => {
    switch (role) {
      case "admin": return "destructive";
      case "instructor": return "default";
      default: return "outline"; // student
    }
  };

  const getRoleIcon = (role: AdminUserDisplay["role"]) => {
    switch (role) {
      case "admin": return <ShieldCheck className="mr-2 h-4 w-4" />;
      case "instructor": return <BookUser className="mr-2 h-4 w-4" />;
      default: return <UserCheck className="mr-2 h-4 w-4" />; // student
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
              <Button variant="default" className="font-body" onClick={() => handleGenericAction('Add User/Instructor (Not Implemented)')}>
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
                          <AvatarImage src={user.avatarUrl || `https://placehold.co/100x100.png?text=${user.fullName ? user.fullName.substring(0,1) : 'U'}`} alt={user.fullName || 'User'} />
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
                          <DropdownMenuItem onClick={() => handleGenericAction('View Profile (Not Implemented)', user.fullName)}>
                            <Eye className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenericAction('Edit User (Role - Not Implemented)', user.fullName)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit User (Role)
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Active" ? (
                            <DropdownMenuItem className="text-orange-600 focus:text-orange-700 focus:bg-orange-500/10" onClick={() => handleUpdateUserStatus(user.id, user.isActive)}>
                              <UserCog className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-500/10" onClick={() => handleUpdateUserStatus(user.id, user.isActive)}>
                              <UserCheck className="mr-2 h-4 w-4" /> Unsuspend User
                            </DropdownMenuItem>
                          )}
                          {user.role !== "admin" && ( // Prevent admin from deleting other admins through this simple UI
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteUser(user.id)}>
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
              Displaying {filteredUsers.length} user(s). Ensure your Cloud Function URL is correctly configured.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
