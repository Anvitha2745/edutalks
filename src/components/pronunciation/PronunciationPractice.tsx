
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getPronunciationFeedback, type PronunciationFeedbackInput, type PronunciationFeedbackOutput } from "@/ai/flows/pronunciation-feedback";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, MicVocal, CheckCircle, Info, Speaker } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  text: z.string().min(5, { message: "Please enter at least 5 characters." }).max(500, {message: "Text is too long (max 500 characters)."}),
  referenceText: z.string().min(5, { message: "Please enter at least 5 characters." }).max(500, {message: "Reference text is too long (max 500 characters)."}),
});

export function PronunciationPractice() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState<PronunciationFeedbackOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false); // Mock recording state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      referenceText: "Hello, how are you today?",
    },
  });

  const handleRecord = () => {
    // Mock recording functionality
    if(isRecording) {
        setIsRecording(false);
        form.setValue("text", "I am fine, thank you. And you?"); // Simulate recorded text
    } else {
        setIsRecording(true);
        form.setValue("text", ""); // Clear text when starting recording
        // Simulate recording for 3 seconds
        setTimeout(() => {
            setIsRecording(false);
            form.setValue("text", "I am feeling great today, thank you for asking."); // Simulate recorded text
        }, 3000);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFeedbackResult(null);
    setError(null);
    try {
      const result = await getPronunciationFeedback(values as PronunciationFeedbackInput);
      setFeedbackResult(result);
    } catch (err) {
      console.error("Error getting pronunciation feedback:", err);
      let errorMessage = "Failed to get feedback. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      // Check for specific error messages related to API keys for Genkit
      if (typeof err === 'string' && err.includes("API key not valid")) {
        errorMessage = "Failed to get feedback: The API key is not valid. Please check your server configuration.";
      } else if (err instanceof Error && (err.message.includes("API key") || err.message.includes("authentication"))) {
         errorMessage = "Failed to get feedback due to an authentication issue. Please ensure your API key is correctly configured on the server.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Speaker className="w-10 h-10 text-primary" />
            <div>
                <CardTitle className="font-headline text-3xl">Pronunciation Practice</CardTitle>
                <CardDescription className="font-body">
                Get AI-powered feedback on your English pronunciation.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="referenceText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-lg">Reference Text (What you should say)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the correct text here..."
                      className="resize-none min-h-[80px] font-body text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
                 <Button type="button" variant={isRecording ? "destructive" : "outline"} onClick={handleRecord} className="font-body w-full md:w-auto" disabled={isLoading}>
                    <MicVocal className={`mr-2 h-5 w-5 ${isRecording ? 'animate-pulse text-red-400' : ''}`} />
                    {isRecording ? "Stop Recording" : "Record Your Speech"}
                </Button>
                {isRecording && <p className="text-sm text-muted-foreground font-body text-center md:text-left">Recording... speak into your microphone.</p>}
            </div>


            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-lg">Your Spoken Text (Or type it)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your speech will appear here after recording, or you can type it directly."
                      className="resize-none min-h-[120px] font-body text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading} className="w-full font-body text-lg py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" /> Get Feedback
                </>
              )}
            </Button>
            {error && <Alert variant="destructive">
                        <Info className="h-4 w-4"/>
                        <AlertTitle className="font-headline">Error</AlertTitle>
                        <AlertDescription className="font-body">{error}</AlertDescription>
                      </Alert>}
          </CardFooter>
        </form>
      </Form>

      {feedbackResult && (
        <div className="p-6 border-t">
          <h3 className="font-headline text-2xl mb-4">Feedback Results</h3>
          <Card className="bg-background">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-xl">Overall Score: {feedbackResult.score}/100</CardTitle>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${feedbackResult.score >= 70 ? 'bg-green-500 text-white' : feedbackResult.score >= 40 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}>
                        {feedbackResult.score}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
              <Progress value={feedbackResult.score} className="mb-4 h-3" />
              <p className="font-body text-base leading-relaxed whitespace-pre-wrap">{feedbackResult.feedback}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
