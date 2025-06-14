
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  BookCopy,
  LogOut,
  Shield,
  UsersRound, 
  Cog, 
  GraduationCap, // For Course Management
  BadgePercent,  // For Offer Management
  TicketPercent, // For Coupon Management
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

const adminNavItems = [
  { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/courses", label: "Course Management", icon: GraduationCap },
  { href: "/admin/quizzes", label: "Quiz Management", icon: FileQuestion },
  { href: "/admin/topics", label: "Topic Management", icon: BookCopy },
  { href: "/admin/referrals", label: "Referral System", icon: UsersRound },
  { href: "/admin/offers", label: "Offer Management", icon: BadgePercent },
  { href: "/admin/coupons", label: "Coupon Management", icon: TicketPercent },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleAdminLogout = () => {
    console.log("Admin logged out");
    router.push("/auth/admin/login");
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-destructive" />
            <span className="font-headline font-bold text-xl">Admin Panel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} asChild>
                  <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
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
          <Button variant="outline" onClick={handleAdminLogout} className="w-full font-body">
            <LogOut className="mr-2 h-4 w-4" /> Admin Logout
          </Button>
          <p className="text-xs text-muted-foreground font-body text-center">&copy; {new Date().getFullYear()} Edutalks Admin</p>
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
