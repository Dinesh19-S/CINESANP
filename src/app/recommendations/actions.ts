'use server';

import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { z } from 'zod';

const FormSchema = z.object({
  preferences: z.string().min(10, { message: 'Please describe your preferences in a bit more detail (at least 10 characters).' }),
});

export async function getRecommendations(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    preferences: formData.get('preferences'),
  });

  if (!validatedFields.success) {
    return {
      recommendations: null,
      reasoning: null,
      message: validatedFields.error.flatten().fieldErrors.preferences?.[0] || 'Invalid input.',
    };
  }
  
  try {
    const result = await getPersonalizedRecommendations({
      userPreferences: validatedFields.data.preferences,
      currentTrends: 'Recent blockbuster releases focus on sci-fi epics and superhero crossovers. There is also a rising interest in indie horror films and thought-provoking documentaries about technology.',
    });
    return { recommendations: result.recommendations, reasoning: result.reasoning, message: null };
  } catch (error) {
    console.error(error);
    return { 
        recommendations: null,
        reasoning: null,
        message: 'Failed to get recommendations from AI. Please try again later.' 
    };
  }
}
