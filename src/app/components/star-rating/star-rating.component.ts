import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() totalStars: number = 5;
  @Input() showLabel: boolean = true;

  get stars(): number[] {
    return Array(this.totalStars).fill(0).map((_, i) => i + 1);
  }

  getStarType(star: number): string {
    if (star <= this.rating) {
      return 'star';
    } else if (star - 0.5 <= this.rating) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }
}