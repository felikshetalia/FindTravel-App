import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fallback',
  imports: [],
  templateUrl: './fallback.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './fallback.scss',
})
export class FallbackComponent {}
