import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TopicDetailPage(props: any) {
  const topicId = props?.params?.topicId;

  if (!topicId) {
    return (
      <div className="text-center py-10">
        <h1 className="font-headline text-3xl mb-4">Topic ID Missing</h1>
        <p className="font-body text-muted-foreground mb-6">No topic ID was provided.</p>
        <Button asChild>
          <Link href="/dashboard/topics">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-4 font-body">
        <Link href="/dashboard/topics">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Topics
        </Link>
      </Button>
      <h1 className="font-headline text-4xl">Topic Details</h1>
      <p className="font-body">Displaying details for Topic ID: {topicId}</p>
      <p className="font-body text-sm text-muted-foreground mt-4">
        This page has been simplified for diagnostic purposes.
      </p>
    </div>
  );
}
