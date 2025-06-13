
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/UserNav";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            {/* Ensure Logo is not a link itself when wrapped by another Link */}
            <Logo size="sm" isLink={false} />
          </Link>
        </div>
        
        {/* Mobile sidebar trigger */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
           {/* Placeholder for search or other actions */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
