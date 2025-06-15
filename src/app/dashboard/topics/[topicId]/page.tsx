
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Define the props type more directly for a dynamic route segment page.
// The page component receives an object with a 'params' property.
export default async function TopicDetailPage({ params }: { params: { topicId: string } }) {
  // The check for params.topicId is fine.
  if (!params.topicId) {
    return (
      <div className="text-center py-10">
        <h1 className="font-headline text-3xl mb-4">Topic ID Missing</h1>
        <p className="font-body text-muted-foreground mb-6">No topic ID was provided.</p>
        <Button asChild>
          <Link href="/dashboard/topics"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Topics</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-4 font-body">
        <Link href="/dashboard/topics"><ArrowLeft className="mr-2 h-4 w-4"/> Back to All Topics</Link>
      </Button>
      <h1 className="font-headline text-4xl">Topic Details</h1>
      <p className="font-body">Topic ID: {params.topicId}</p>
      <p className="font-body">This is a simplified page for build diagnostics.</p>
    </div>
  );
}

// Commenting out generateStaticParams as it's not needed for this diagnostic version
// and could be a source of build issues if not perfectly configured.
// export async function generateStaticParams() {
//   // In a real app, fetch possible topicIds
//   // For diagnostics, we can return a minimal set or none if the page is purely dynamic
//   return [{ topicId: '1' }, { topicId: 'test-topic' }];
// }
