export interface RecommendationResponseDto {
  recommendations: Recommendation[];
}

export interface Recommendation {
  offerId: string;
  destination: string;
  reason: string;
  budget: number;
  duration: number;
}
