'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations } from '@/app/recommendations/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Film, Loader2 } from 'lucide-react';

const initialState = {
  recommendations: null,
  reasoning: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Get Recommendations
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-4">
            <Textarea
              name="preferences"
              placeholder="e.g., I love mind-bending sci-fi movies like Inception and The Matrix. I'm also a fan of director Denis Villeneuve and enjoy films with great cinematography..."
              rows={6}
              className="text-base"
              required
            />
            <div className="flex justify-end">
              <SubmitButton />
            </div>
            {state.message && <p className="text-sm font-medium text-destructive">{state.message}</p>}
          </form>
        </CardContent>
      </Card>

      {state.recommendations && (
        <div className="mt-8 space-y-6 animate-fade-in-up">
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Film />
                Here are your recommendations:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-lg">
                {state.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Lightbulb />
                Why you'll like them:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{state.reasoning}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
