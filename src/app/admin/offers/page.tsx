
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, BadgePercent, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AdminOffer {
  id: string;
  courseTitle: string; 
  courseId: string;
  discountPercentage?: number;
  discountFixedAmountINR?: number;
  originalPriceINR: number;
  offerPriceINR: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Scheduled" | "Expired" | "Draft";
}

const mockAdminOffers: AdminOffer[] = [
  { id: "offer1", courseTitle: "Advanced English Grammar Mastery", courseId: "c1", discountPercentage: 25, originalPriceINR: 1999, offerPriceINR: 1499, startDate: "2023-12-01", endDate: "2023-12-31", status: "Active" },
  { id: "offer2", courseTitle: "IELTS Preparation Intensive", courseId: "c3", discountFixedAmountINR: 500, originalPriceINR: 2999, offerPriceINR: 2499, startDate: "2024-01-01", endDate: "2024-01-15", status: "Scheduled" },
  { id: "offer3", courseTitle: "Beginner English Fundamentals", courseId: "c4", discountPercentage: 10, originalPriceINR: 999, offerPriceINR: 899, startDate: "2023-11-01", endDate: "2023-11-15", status: "Expired" },
];

export default function OfferManagementPage() {
  const { toast } = useToast();

  const handleAction = (action: string, offerDetails: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Mock action '${action}' for offer related to "${offerDetails}" triggered. This would interact with Firebase.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl flex items-center">
            <BadgePercent className="w-10 h-10 mr-3 text-primary"/>
            Offer Management
        </h1>
        <p className="text-muted-foreground font-body">Create, manage, and track promotional offers for courses.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">All Offers</CardTitle>
              <CardDescription className="font-body">List of current, scheduled, and past offers.</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search offers..." className="pl-9 font-body w-full" />
                </div>
                <Button variant="default" className="font-body" onClick={() => handleAction('Create New Offer', '')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Offer
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Offer Price (₹)</TableHead>
                <TableHead>Original Price (₹)</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium font-body">{offer.courseTitle}</TableCell>
                  <TableCell className="font-body text-muted-foreground">
                    {offer.discountPercentage ? `${offer.discountPercentage}% off` : `₹${offer.discountFixedAmountINR} off`}
                  </TableCell>
                  <TableCell className="font-body font-semibold text-primary">{offer.offerPriceINR.toLocaleString()}</TableCell>
                  <TableCell className="font-body text-muted-foreground line-through">{offer.originalPriceINR.toLocaleString()}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{offer.startDate}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{offer.endDate}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={offer.status === "Active" ? "default" : offer.status === "Scheduled" ? "secondary" : "outline"}
                        className={`capitalize font-body ${
                            offer.status === "Active" ? 'bg-green-500/20 text-green-700 border-green-400' 
                            : offer.status === "Scheduled" ? 'bg-blue-500/20 text-blue-700 border-blue-400' 
                            : offer.status === "Expired" ? 'bg-gray-500/20 text-gray-700 border-gray-400'
                            : 'bg-yellow-500/20 text-yellow-700 border-yellow-400'}`} // Draft status
                    >
                        {offer.status}
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
                        <DropdownMenuItem onClick={() => handleAction('Edit Offer', offer.courseTitle)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Offer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleAction('Delete Offer', offer.courseTitle)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Offer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying mock data. Full offer data would be fetched from Firebase and paginated here.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
