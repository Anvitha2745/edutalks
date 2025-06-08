// src/ai/flows/pronunciation-feedback.ts
'use server';

/**
 * @fileOverview Provides real-time pronunciation feedback during voice calls.
 *
 * - getPronunciationFeedback - A function that provides pronunciation feedback.
 * - PronunciationFeedbackInput - The input type for the getPronunciationFeedback function.
 * - PronunciationFeedbackOutput - The return type for the getPronunciationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PronunciationFeedbackInputSchema = z.object({
  text: z
    .string()
    .describe('The text spoken by the user.'),
  referenceText: z.string().describe('The correct pronunciation of the spoken text.'),
});
export type PronunciationFeedbackInput = z.infer<typeof PronunciationFeedbackInputSchema>;

const PronunciationFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user’s pronunciation, including specific areas for improvement.'),
  score: z.number().describe('A score representing the accuracy of the pronunciation (0-100).'),
});
export type PronunciationFeedbackOutput = z.infer<typeof PronunciationFeedbackOutputSchema>;

export async function getPronunciationFeedback(input: PronunciationFeedbackInput): Promise<PronunciationFeedbackOutput> {
  return pronunciationFeedbackFlow(input);
}

const pronunciationFeedbackPrompt = ai.definePrompt({
  name: 'pronunciationFeedbackPrompt',
  input: {schema: PronunciationFeedbackInputSchema},
  output: {schema: PronunciationFeedbackOutputSchema},
  prompt: `You are an AI pronunciation coach. Provide feedback on the user's pronunciation based on the following:

User's Text: {{{text}}}
Reference Text: {{{referenceText}}}

Provide specific feedback on areas for improvement, and assign an overall pronunciation score from 0-100. Ensure the score reflects the accuracy and clarity of the user's pronunciation.

Format your response as:
Feedback: [Detailed feedback on pronunciation]
Score: [Pronunciation score (0-100)]`,
});

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await pronunciationFeedbackPrompt(input);
    return output!;
  }
);
