import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RecommendationService } from '../../core/services/recommendation.service';
import { RecommendationResponseDto } from '../../models/dto/recommendation-response.dto';
import { RecommendationRequestDto } from '../../models/dto/recommendation-request.dto';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly _recommendationService = inject(RecommendationService);

  readonly response = signal<RecommendationResponseDto | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  onSend(prompt: string) {
    const request: RecommendationRequestDto = {
      prompt,
      promptLanguage: 'English',
    };

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this._recommendationService.ask(request).subscribe({
      next: (res) => {
        this.response.set(res);
        this.isLoading.set(false);
      },
      error: (e) => {
        console.error(e);
        this.errorMessage.set(e.error?.message ?? 'Recommendation request failed');
        this.isLoading.set(false);
      },
    });
  }
}
