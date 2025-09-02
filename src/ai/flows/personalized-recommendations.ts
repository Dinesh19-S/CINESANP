// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview A personalized movie recommendation AI agent.
 *
 * - getPersonalizedRecommendations - A function that provides personalized movie recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user\s movie preferences, including genres, actors, directors, and themes they enjoy.'
    ),
  currentTrends: z
    .string()
    .describe('A summary of current movie trends and community interest.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized movie recommendations.'),
  reasoning: z
    .string()
    .describe(
      'Explanation of why each movie was recommended based on user preferences and current trends.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a movie recommendation expert. Provide a list of personalized movie recommendations based on the user's preferences and current trends.

User Preferences: {{{userPreferences}}}
Current Trends: {{{currentTrends}}}

Provide the recommendations along with a brief explanation for each recommendation.
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
