import RecommendationForm from '@/components/recommendation-form';
import { Ticket } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Ticket className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Personalized Movie Recommendations
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Describe your movie tastes, and our AI will curate a list of films just for you. Mention genres, actors, directors, or even just the mood you're in.
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
