import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import Link from "next/link";

export interface DailyTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl?: string;
  discussionPoints?: string[];
}

interface DailyTopicCardProps {
  topic: DailyTopic;
}

export function DailyTopicCard({ topic }: DailyTopicCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {topic.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={topic.imageUrl} 
          alt={topic.title} 
          className="w-full h-48 object-cover rounded-t-lg"
          data-ai-hint="topic illustration" 
        />
      )}
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline text-2xl leading-tight">{topic.title}</CardTitle>
            <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded-full font-body">{topic.category}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground font-body">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{topic.date}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="font-body line-clamp-3">{topic.description}</CardDescription>
        {topic.discussionPoints && topic.discussionPoints.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold font-body text-sm mb-1">Discussion Points:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground font-body space-y-1">
              {topic.discussionPoints.slice(0, 2).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
              {topic.discussionPoints.length > 2 && <li>...and more!</li>}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full font-body">
          <Link href={`/dashboard/topics/${topic.id}`}>
            Discuss Topic <MessageCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
