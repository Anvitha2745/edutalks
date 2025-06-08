import { DailyTopicCard, type DailyTopic } from "@/components/topics/DailyTopicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

const mockTopics: DailyTopic[] = [
  {
    id: "1",
    title: "The Future of Remote Work",
    description: "Explore the pros and cons of remote work and how it might evolve in the coming years. What are your personal experiences or preferences?",
    category: "Work & Career",
    date: "October 26, 2023",
    imageUrl: "https://placehold.co/600x400.png?text=Remote+Work",
    discussionPoints: ["Impact on work-life balance", "Technology requirements", "Company culture challenges"],
    
  },
  {
    id: "2",
    title: "Sustainable Living Practices",
    description: "Discuss various ways individuals and communities can adopt more sustainable lifestyles. What small changes can make a big difference?",
    category: "Environment",
    date: "October 25, 2023",
    imageUrl: "https://placehold.co/600x400.png?text=Sustainability",
    discussionPoints: ["Recycling and waste reduction", "Renewable energy sources", "Conscious consumerism"],
  },
  {
    id: "3",
    title: "The Impact of Social Media on Society",
    description: "Analyze the positive and negative effects of social media on communication, mental health, and societal norms. How can we use it more responsibly?",
    category: "Technology",
    date: "October 24, 2023",
    imageUrl: "https://placehold.co/600x400.png?text=Social+Media",
    discussionPoints: ["Information spread and misinformation", "Cyberbullying", "Community building"],
  },
   {
    id: "4",
    title: "Favorite Travel Destinations",
    description: "Share your dream travel destinations or memorable travel experiences. What makes a place special to you?",
    category: "Travel",
    date: "October 23, 2023",
    imageUrl: "https://placehold.co/600x400.png?text=Travel",
    discussionPoints: ["Cultural experiences", "Natural wonders", "Budget travel tips"],
  },
  {
    id: "5",
    title: "Learning New Skills in Adulthood",
    description: "Discuss the challenges and rewards of learning new skills as an adult. What skill are you currently learning or wish to learn?",
    category: "Personal Development",
    date: "October 22, 2023",
    imageUrl: "https://placehold.co/600x400.png?text=Learning",
    discussionPoints: ["Time management", "Motivation techniques", "Online resources vs. traditional classes"],
  },
];

export default function DailyTopicsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-4xl">Daily Topics</h1>
          <p className="text-muted-foreground font-body">Expand your vocabulary and practice conversation with new topics every day.</p>
        </div>
        <Button className="font-body">
           <PlusCircle className="mr-2 h-4 w-4" /> Suggest a Topic
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all" className="font-body">All Topics</TabsTrigger>
            <TabsTrigger value="work" className="font-body">Work & Career</TabsTrigger>
            <TabsTrigger value="environment" className="font-body">Environment</TabsTrigger>
            <TabsTrigger value="technology" className="font-body">Technology</TabsTrigger>
          </TabsList>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search topics..." className="pl-10 font-body w-full md:w-64" />
          </div>
        </div>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTopics.map((topic) => (
              <DailyTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="work">
          <p className="font-body text-muted-foreground">Work & Career topics will be displayed here.</p>
        </TabsContent>
        <TabsContent value="environment">
           <p className="font-body text-muted-foreground">Environment topics will be displayed here.</p>
        </TabsContent>
         <TabsContent value="technology">
           <p className="font-body text-muted-foreground">Technology topics will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
