"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizInterfaceProps {
  quiz: Quiz;
  onQuizComplete: (score: number, totalQuestions: number) => void;
}

export function QuizInterface({ quiz, onQuizComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      onQuizComplete(score, quiz.questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(null);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader className="items-center">
          <Award className="w-16 h-16 text-accent mb-4" />
          <CardTitle className="font-headline text-3xl">Quiz Completed!</CardTitle>
          <CardDescription className="font-body">
            You&apos;ve finished the &quot;{quiz.title}&quot; quiz.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="font-body text-xl">
            Your Score: <span className="font-bold text-primary">{score}</span> / {quiz.questions.length}
          </p>
          <p className="font-body text-muted-foreground">
            {score / quiz.questions.length >= 0.7 ? "Great job! Keep up the good work." : "Good effort! Keep practicing to improve."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz} className="font-body">
            <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
        <CardDescription className="font-body">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </CardDescription>
        <Progress value={progress} className="w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="font-body text-lg font-semibold">{currentQuestion.text}</p>
        <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} disabled={showFeedback}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-colors">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="font-body flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showFeedback && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}>
             {isCorrect ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
            <AlertTitle className={`font-headline ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </AlertTitle>
            <AlertDescription className={`font-body ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {currentQuestion.explanation || (isCorrect ? "Well done!" : `The correct answer was: ${currentQuestion.correctAnswer}`)}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {showFeedback ? (
          <Button onClick={handleNextQuestion} className="w-full font-body">
            {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full font-body">
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
