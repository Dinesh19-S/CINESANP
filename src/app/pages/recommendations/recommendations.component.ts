import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {
  preferences = '';
  recommendations: string[] = [];
  reasoning = '';
  loading = false;
  error = '';

  async getRecommendations(): Promise<void> {
    if (!this.preferences.trim() || this.preferences.length < 10) {
      this.error = 'Please describe your preferences in more detail (at least 10 characters).';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      // Mock AI response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.recommendations = [
        'Inception (2010) - Mind-bending sci-fi thriller',
        'The Matrix (1999) - Groundbreaking cyberpunk action',
        'Blade Runner 2049 (2017) - Visually stunning sequel',
        'Interstellar (2014) - Epic space exploration drama',
        'Ex Machina (2014) - Thought-provoking AI thriller'
      ];
      
      this.reasoning = 'Based on your love for mind-bending sci-fi movies like Inception and The Matrix, I\'ve recommended films that feature complex narratives, stunning visuals, and thought-provoking themes about reality, consciousness, and technology. These movies all share similar DNA in terms of their philosophical depth and visual spectacle.';
    } catch (error) {
      this.error = 'Failed to get recommendations. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  clearResults(): void {
    this.recommendations = [];
    this.reasoning = '';
    this.error = '';
  }
}