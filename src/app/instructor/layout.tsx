"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck, // For My Courses
  MessageSquareWarning, // For Doubts
  LogOut,
  Presentation, // Changed icon
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Logo } from "@/components/layout/Logo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const instructorNavItems = [
  { href: "/instructor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/instructor/courses", label: "My Courses", icon: BookOpenCheck },
  { href: "/instructor/doubts", label: "Student Doubts", icon: MessageSquareWarning },
];

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleInstructorLogout = () => {
    // Mock logout
    console.log("Instructor logged out");
    router.push("/auth/instructor/login");
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Presentation className="h-7 w-7 text-primary" />
            <span className="font-headline font-bold text-xl">Instructor Panel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {instructorNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={
                      pathname === item.href ||
                      (item.href !== "/instructor" && pathname.startsWith(item.href))
                    }
                    tooltip={{ children: item.label, className: "font-body" }}
                    className="font-body"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <Separator className="my-2" />
        <SidebarFooter className="p-4 space-y-2">
          <Button variant="outline" onClick={handleInstructorLogout} className="w-full font-body">
            <LogOut className="mr-2 h-4 w-4" /> Instructor Logout
          </Button>
          <p className="text-xs text-muted-foreground font-body text-center">
            &copy; {new Date().getFullYear()} Edutalks Instructor
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
