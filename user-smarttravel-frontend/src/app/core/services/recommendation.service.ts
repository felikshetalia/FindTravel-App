import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { RecommendationRequestDto } from '../../models/dto/recommendation-request.dto';
import { RecommendationResponseDto } from '../../models/dto/recommendation-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.API_URL_BASE}/ai/recommendations`;

  ask(request: RecommendationRequestDto): Observable<RecommendationResponseDto> {
    return this._http.post<RecommendationResponseDto>(this._apiUrl, request);
  }
}
