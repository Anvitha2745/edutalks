
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/UserNav";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <Logo size="sm" isLink={false} />
          </Link>
        </div>
        
        {/* Mobile sidebar trigger */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-4">
           <div className="w-full flex-1">
             {/* <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search features..."
                  className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div> */}
           </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
