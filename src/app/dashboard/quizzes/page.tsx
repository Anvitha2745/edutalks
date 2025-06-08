"use client";

import { useState } from "react";
import { QuizInterface, type Quiz } from "@/components/quizzes/QuizInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ArrowRight, ListFilter, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Basic English Grammar",
    questions: [
      { id: "q1", text: "Which sentence is grammatically correct?", options: ["He go to school.", "He goes to school.", "He going to school."], correctAnswer: "He goes to school.", explanation: "'Goes' is the correct third-person singular present tense form of 'go'." },
      { id: "q2", text: "What is the plural of 'child'?", options: ["Childs", "Childrens", "Children"], correctAnswer: "Children", explanation: "'Children' is the irregular plural form of 'child'." },
      { id: "q3", text: "Choose the correct article: 'I saw __ elephant.'", options: ["a", "an", "the"], correctAnswer: "an", explanation: "'An' is used before words starting with a vowel sound." },
    ],
  },
  {
    id: "2",
    title: "Vocabulary Challenge: Travel",
    questions: [
      { id: "q1", text: "What do you call a place where you stay overnight when traveling?", options: ["Accommodation", "Itinerary", "Souvenir"], correctAnswer: "Accommodation", explanation: "Accommodation refers to lodging like hotels or guesthouses." },
      { id: "q2", text: "A document that allows you to enter a foreign country is called a ___.", options: ["Passport", "Visa", "Ticket"], correctAnswer: "Visa", explanation: "While a passport identifies you, a visa grants permission to enter for a specific purpose/duration." },
    ],
  },
  {
    id: "3",
    title: "Intermediate Idioms",
    questions: [
      { id: "q1", text: "What does 'to hit the books' mean?", options: ["To physically hit books", "To study hard", "To read a lot of books"], correctAnswer: "To study hard" },
      { id: "q2", text: "If something 'costs an arm and a leg', it is:", options: ["Very cheap", "Moderately priced", "Very expensive"], correctAnswer: "Very expensive" },
    ],
  }
];


export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizResult({ score, total: totalQuestions });
    // setSelectedQuiz(null); // Optionally clear quiz to show list again or results
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizResult(null); // Clear previous results when starting a new quiz
  }

  if (selectedQuiz && !quizResult) {
    return <QuizInterface quiz={selectedQuiz} onQuizComplete={handleQuizComplete} />;
  }
  
  if (selectedQuiz && quizResult) {
     return (
      <div className="space-y-8">
        <Card className="w-full max-w-lg mx-auto shadow-xl">
          <CardHeader className="items-center">
            <CardTitle className="font-headline text-3xl">Quiz Results: {selectedQuiz.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="font-body text-xl">
              Your Score: <span className="font-bold text-primary">{quizResult.score}</span> / {quizResult.total}
            </p>
             <Image 
                src={`https://placehold.co/300x200.png?text=Score:${quizResult.score}/${quizResult.total}`}
                alt="Quiz score illustration" 
                width={300} 
                height={200}
                className="mx-auto my-4 rounded-lg"
                data-ai-hint="quiz result badge"
              />
            <Button onClick={() => { setSelectedQuiz(null); setQuizResult(null); }} className="font-body">
              Back to Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl">Interactive Quizzes</h1>
        <p className="text-muted-foreground font-body">Test your English skills and track your progress with our engaging quizzes.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search quizzes..." className="pl-10 font-body w-full md:max-w-sm" />
        </div>
        <Button variant="outline" className="font-body w-full md:w-auto">
            <ListFilter className="mr-2 h-4 w-4" /> Filter by Difficulty
        </Button>
      </div>

      {mockQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockQuizzes.map((quiz) => (
            <Card key={quiz.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center text-primary mb-2">
                    <CheckSquare className="w-8 h-8 mr-3" />
                    <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
                </div>
                <CardDescription className="font-body">
                  {quiz.questions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-body text-sm text-muted-foreground line-clamp-3">
                  A quick quiz to test your understanding of {quiz.title.toLowerCase()}.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleStartQuiz(quiz)} className="w-full font-body">
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
           <Image src="https://placehold.co/400x300.png" alt="No quizzes available" width={400} height={300} className="mx-auto mb-6 rounded-lg" data-ai-hint="empty state puzzle"/>
          <h2 className="font-headline text-2xl mb-2">No Quizzes Available</h2>
          <p className="font-body text-muted-foreground">Check back later for new quizzes!</p>
        </div>
      )}
    </div>
  );
}
