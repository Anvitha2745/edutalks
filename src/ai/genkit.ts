// import { config } from 'dotenv'; // Import dotenv
// config(); // Load .env file before any other imports that might use environment variables

// import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai';

// export const ai = genkit({
//   plugins: [googleAI()],
//   model: 'googleai/gemini-2.0-flash',
// });


// Mock implementation for build diagnostics
const mockAiObject = {
  defineFlow: (config: any, fn: any) => {
    console.log(`Mock ai.defineFlow called for ${config.name}`);
    // Return a function that mimics the flow's expected behavior,
    // e.g., returning a promise with a resolved dummy output structure.
    return async (input: any) => {
      console.log(`Mock flow ${config.name} called with input:`, input);
      if (config.outputSchema) {
        // Try to return a minimal valid object based on a known schema if possible
        // For PronunciationFeedbackOutputSchema:
        if (config.name === 'pronunciationFeedbackFlow') {
          return Promise.resolve({ score: 0, feedback: "Mocked feedback" });
        }
      }
      return Promise.resolve({}); // Default mock output
    };
  },
  definePrompt: (config: any) => {
    console.log(`Mock ai.definePrompt called for ${config.name}`);
    // Return a function that mimics a prompt call
    return async (input: any) => {
      console.log(`Mock prompt ${config.name} called with input:`, input);
      // For PronunciationFeedbackOutputSchema:
      if (config.name === 'pronunciationFeedbackPrompt') {
         return Promise.resolve({ output: { score: 0, feedback: "Mocked feedback" } });
      }
      return Promise.resolve({ output: {} }); // Default mock output
    };
  },
  generate: (options: any) => {
    console.log('Mock ai.generate called with options:', options);
    return Promise.resolve({ text: () => "Mocked AI generation", output: {} });
  },
  // Add any other methods your flows/code might call from the 'ai' object
  // e.g., defineTool, defineSchema, etc.
};

export const ai: any = mockAiObject;
