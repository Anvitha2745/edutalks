import { PronunciationPractice } from "@/components/pronunciation/PronunciationPractice";

export default function PronunciationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Pronunciation Practice</h1>
        <p className="text-muted-foreground font-body">Improve your English pronunciation with AI-powered feedback.</p>
      </div>
      <PronunciationPractice />
    </div>
  );
}
