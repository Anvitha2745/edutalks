
// import { config } from 'dotenv'; // Import dotenv
// config(); // Load .env file before any other imports that might use environment variables

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
