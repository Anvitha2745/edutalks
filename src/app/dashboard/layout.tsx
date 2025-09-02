
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic,
  BookOpen,
  CheckCircle,
  MessageSquareQuote,
  UserCircle,
  CreditCard,
  GraduationCap, // Added icon for Courses
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

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: GraduationCap }, // Added Courses link
  { href: "/dashboard/calls", label: "Voice Calls", icon: Mic },
  { href: "/dashboard/topics", label: "Daily Topics", icon: BookOpen },
  { href: "/dashboard/quizzes", label: "Quizzes", icon: CheckCircle },
  { href: "/dashboard/pronunciation", label: "Pronunciation", icon: MessageSquareQuote },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { href: "/dashboard/pricing", label: "Subscription", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4 flex items-center justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "font-body" }}
                  className="font-body"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
           <div className="text-center text-xs text-muted-foreground font-body group-data-[collapsible=icon]:hidden">
             <p>&copy; {new Date().getFullYear()} Edutalks</p>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
