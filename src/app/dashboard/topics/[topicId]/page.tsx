
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define an interface for the page's props
interface TopicDetailPageProps {
  params: { topicId: string };
  // searchParams could be added here if needed:
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Mock data fetching - simplified for diagnostics
const getTopicDetails = (topicId: string) => {
  // Simulate API call - return a simple, hardcoded object
  const mockTopic = {
    id: topicId,
    title: "The Future of Remote Work (Detailed - Diagnostic)",
    description: "Explore the pros and cons of remote work and how it might evolve in the coming years. This topic delves deeper into the societal shifts, technological advancements, and personal well-being aspects related to remote work. What are your personal experiences or preferences? Consider the impact on urban planning, employee engagement, and global talent acquisition.",
    category: "Work & Career",
    date: "October 26, 2023",
    imageUrl: "https://placehold.co/800x400.png?text=Remote+Work+Deep+Dive",
    author: "Edutalks Team",
    authorAvatar: "https://placehold.co/100x100.png?text=ET",
    discussionPoints: [
      "Impact on work-life balance: flexibility vs. isolation.",
      "Technological requirements and cybersecurity concerns.",
      "Challenges in maintaining company culture and team cohesion.",
      "The role of AI and automation in future remote setups.",
      "Economic impact on cities and local businesses.",
      "Mental health considerations for remote employees."
    ],
    relatedVocabulary: ["Telecommuting", "Hybrid model", "Digital nomad", "Ergonomics", "Asynchronous communication", "Virtual collaboration"],
  };
  if (topicId === "1" || topicId) return mockTopic; // Always return for any topicId for now
  return null;
};

const mockComments = [
    { id: "c1", user: "Alice", avatar: "https://placehold.co/50x50.png?a=A", text: "Great topic! I think remote work is here to stay.", timestamp: "2 hours ago" },
    { id: "c2", user: "Bob", avatar: "https://placehold.co/50x50.png?b=B", text: "I agree, but companies need to focus more on mental well-being for remote employees.", timestamp: "1 hour ago" },
];


export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const topic = getTopicDetails(params.topicId); // Now synchronous

  if (!topic) {
    return (
      <div className="text-center py-10">
        <h1 className="font-headline text-3xl mb-4">Topic Not Found</h1>
        <p className="font-body text-muted-foreground mb-6">Sorry, we couldn&apos;t find the topic you&apos;re looking for.</p>
        <Button asChild>
          <Link href="/dashboard/topics"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Topics</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/dashboard/topics"><ArrowLeft className="mr-2 h-4 w-4"/> Back to All Topics</Link>
      </Button>

      <Card className="shadow-lg overflow-hidden">
        {topic.imageUrl && (
          <Image 
            src={topic.imageUrl} 
            alt={topic.title} 
            width={800} 
            height={400} 
            className="w-full h-64 object-cover"
            data-ai-hint="topic detail header" 
          />
        )}
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-body">{topic.category}</span>
            <span className="text-sm text-muted-foreground font-body">{topic.date}</span>
          </div>
          <CardTitle className="font-headline text-4xl leading-tight">{topic.title}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={topic.authorAvatar} alt={topic.author} data-ai-hint="author avatar"/>
              <AvatarFallback>{topic.author.substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-body">By {topic.author}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="font-body text-lg leading-relaxed text-foreground/90">{topic.description}</p>
          
          <div>
            <h3 className="font-headline text-2xl mb-3">Key Discussion Points</h3>
            <ul className="list-disc list-inside space-y-2 font-body text-foreground/80">
              {topic.discussionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-2xl mb-3">Related Vocabulary</h3>
            <div className="flex flex-wrap gap-2">
              {topic.relatedVocabulary.map((word, index) => (
                <span key={index} className="bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full text-sm font-body">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-4">
            <div className="flex space-x-2">
                <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4" /> Like (123)</Button>
                <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Comment (12)</Button>
            </div>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Join the Discussion</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {mockComments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                        <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.user} data-ai-hint="commenter avatar" />
                            <AvatarFallback>{comment.user.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold font-body">{comment.user}</p>
                                <p className="text-xs text-muted-foreground font-body">{comment.timestamp}</p>
                            </div>
                            <p className="font-body text-sm">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Textarea placeholder="Write your comment..." className="mt-6 min-h-[100px] font-body" />
            <Button className="mt-4">Post Comment</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// This function is needed for Next.js to know which paths to pre-render if you are using SSG.
// For SSR or ISR, it might not be strictly necessary for basic functionality but good for optimization.
// For this mock app, we'll assume we might want to statically generate page for topicId=1
// export async function generateStaticParams() {
//   return [{ topicId: '1' }];
// }

