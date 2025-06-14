
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, TicketPercent, Copy, Percent, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AdminCoupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses?: number;
  currentUses: number;
  expiryDate?: string;
  applicableTo: "all_courses" | "subscription_only" | "specific_courses"; // Simplified for now
  status: "Active" | "Expired" | "Disabled" | "Draft";
}

const mockAdminCoupons: AdminCoupon[] = [
  { id: "coupon1", code: "WELCOME20", discountType: "percentage", discountValue: 20, currentUses: 50, maxUses: 1000, expiryDate: "2024-12-31", applicableTo: "all_courses", status: "Active" },
  { id: "coupon2", code: "FLAT100SUB", discountType: "fixed", discountValue: 100, currentUses: 120, applicableTo: "subscription_only", status: "Active" },
  { id: "coupon3", code: "GRAMMAR50", discountType: "percentage", discountValue: 50, currentUses: 10, maxUses: 50, expiryDate: "2023-11-30", applicableTo: "specific_courses", status: "Expired" },
  { id: "coupon4", code: "NEWUSER", discountType: "fixed", discountValue: 50, currentUses: 0, status: "Draft", applicableTo: "all_courses" },
];

export default function CouponManagementPage() {
  const { toast } = useToast();

  const handleAction = (action: string, couponCode: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for coupon "${couponCode}" triggered. This would interact with Firebase.`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Coupon Code Copied!", description: `${code} copied to clipboard.` });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl flex items-center">
            <TicketPercent className="w-10 h-10 mr-3 text-primary"/>
            Coupon Management
        </h1>
        <p className="text-muted-foreground font-body">Create, manage, and track discount coupon codes for courses and subscriptions.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Coupons</CardTitle>
              <CardDescription className="font-body">List of available coupon codes.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search coupons..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body" onClick={() => handleAction('Create New Coupon', '')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Coupon
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Applicable To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium font-mono">
                    <div className="flex items-center gap-2">
                        {coupon.code}
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyCode(coupon.code)}>
                            <Copy className="h-3 w-3"/>
                        </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">
                    {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                  </TableCell>
                   <TableCell className="font-body text-muted-foreground capitalize">
                     {coupon.discountType === "percentage" ? <Percent className="inline-block h-4 w-4 mr-1 text-primary"/> : <IndianRupee className="inline-block h-4 w-4 mr-1 text-primary"/>}
                    {coupon.discountType}
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">
                    {coupon.currentUses} {coupon.maxUses ? `/ ${coupon.maxUses}` : ''}
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{coupon.expiryDate || "No Expiry"}</TableCell>
                  <TableCell className="font-body text-muted-foreground capitalize">
                    {coupon.applicableTo.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={coupon.status === "Active" ? "default" : coupon.status === "Draft" ? "secondary" : "outline"}
                        className={`capitalize font-body ${
                            coupon.status === "Active" ? 'bg-green-500/20 text-green-700 border-green-400' 
                            : coupon.status === "Draft" ? 'bg-yellow-500/20 text-yellow-700 border-yellow-400'
                            : coupon.status === "Disabled" ? 'bg-orange-500/20 text-orange-700 border-orange-400'
                            : 'bg-gray-500/20 text-gray-700 border-gray-400'}`} // Expired or other
                    >
                        {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-body">
                        <DropdownMenuItem onClick={() => handleAction('Edit Coupon', coupon.code)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Coupon
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleAction(coupon.status === 'Disabled' ? 'Enable Coupon' : 'Disable Coupon', coupon.code)}>
                          {coupon.status === 'Disabled' ? <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> : <XCircle className="mr-2 h-4 w-4 text-orange-500" />}
                           {coupon.status === 'Disabled' ? 'Enable' : 'Disable'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete Coupon', coupon.code)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Coupon
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying mock data. Full coupon data would be fetched from Firebase and paginated here.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Re-export XCircle and CheckCircle if needed, or import directly in components.
// For lucide-react, direct import is usually fine.
import { CheckCircle, XCircle } from "lucide-react"; 
