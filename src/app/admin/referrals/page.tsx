
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Cog, ListChecks, Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReferralEntry {
  id: string;
  referringUser: string; // User ID or name from Firebase Auth/Firestore
  referredUser: string;  // User ID or name from Firebase Auth/Firestore
  date: string; // Timestamp from Firestore
  status: "Pending Subscription" | "Completed" | "Expired"; // Status tracked in Firestore
  rewardPaid: string; // "₹XX.XX" or "₹0.00"
}

// Mock data, in a real app this would come from Firebase Firestore
const mockReferralHistory: ReferralEntry[] = [
  { id: "ref1", referringUser: "Alice (userFirebaseId1)", referredUser: "Charlie (userFirebaseId3)", date: "2023-11-01", status: "Completed", rewardPaid: "₹50.00" },
  { id: "ref2", referringUser: "Bob (userFirebaseId2)", referredUser: "Diana (userFirebaseId4)", date: "2023-11-05", status: "Pending Subscription", rewardPaid: "₹0.00" },
  { id: "ref3", referringUser: "Alice (userFirebaseId1)", referredUser: "Edward (userFirebaseId5)", date: "2023-10-15", status: "Expired", rewardPaid: "₹0.00" },
];


export default function ReferralManagementPage() {
  const { toast } = useToast();
  // This would be fetched from Firebase (e.g., a config document in Firestore)
  const [rewardAmount, setRewardAmount] = useState<string>("50"); 

  const handleUpdateReward = () => {
    // In a real app, this would update the value in Firebase Firestore
    toast({
      title: "Referral Reward Updated (Mock)",
      description: `New referral reward amount set to ₹${rewardAmount}. This would be saved in Firebase.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Referral System Management</h1>
        <p className="text-muted-foreground font-body">Configure referral rewards and monitor referral activity using Firebase.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Cog className="w-7 h-7 text-primary" />
            <CardTitle className="font-headline text-2xl">Referral Settings</CardTitle>
          </div>
          <CardDescription className="font-body">
            Set the reward amount (in ₹ INR) for successful referrals (when the referred user subscribes to a yearly plan).
            This setting would be stored in Firebase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rewardAmount" className="font-body text-base flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
                Current Reward Amount (₹)
            </Label>
            <div className="flex items-center gap-3 mt-1">
                <Input 
                    id="rewardAmount" 
                    type="number" 
                    value={rewardAmount}
                    onChange={(e) => setRewardAmount(e.target.value)}
                    className="font-body max-w-xs"
                    placeholder="e.g., 50"
                />
                <Button onClick={handleUpdateReward} className="font-body">
                    Update Amount
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-body">
              This amount (in ₹) will be credited to the referrer's wallet upon successful yearly subscription by the referred user.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
                <ListChecks className="w-7 h-7 text-primary" />
                <div>
                    <CardTitle className="font-headline text-2xl">Referral History & Analytics</CardTitle>
                    <CardDescription className="font-body">Track referrals and their status (data from Firebase Firestore).</CardDescription>
                </div>
            </div>
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search referrals..." className="pl-9 font-body w-full md:w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-body">
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-1.5"/> Total Referrals Made</p>
                    <p className="text-2xl font-bold">125</p> {/* Mock data, fetch from Firestore */}
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-center"><DollarSign className="w-4 h-4 mr-1.5"/> Total Rewards Paid (₹)</p>
                    <p className="text-2xl font-bold">₹3,900.00</p> {/* Mock data, fetch from Firestore */}
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">62.4%</p> {/* Mock data, calculate from Firestore data */}
                </div>
            </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referring User</TableHead>
                <TableHead>Referred User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reward Paid (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReferralHistory.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium font-body">{referral.referringUser}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{referral.referredUser}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{referral.date}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={referral.status === "Completed" ? "default" : referral.status === "Pending Subscription" ? "secondary" : "outline"}
                        className={`capitalize font-body ${
                            referral.status === "Completed" ? 'bg-green-500/20 text-green-700 border-green-400' 
                            : referral.status === "Pending Subscription" ? 'bg-yellow-500/20 text-yellow-700 border-yellow-400' 
                            : 'bg-gray-500/20 text-gray-700 border-gray-400'}`}
                    >
                        {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{referral.rewardPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <p className="text-xs text-muted-foreground mt-4 font-body text-center">
              Displaying mock data. Full referral history would be fetched from Firebase and paginated here.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
