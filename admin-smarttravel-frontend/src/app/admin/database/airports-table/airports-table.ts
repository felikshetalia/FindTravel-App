import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Airport } from '../models';
@Component({
  selector: 'app-flights-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airports-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './airports-table.scss',
})
export class AirportsTableComponent implements OnInit {
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  airports = signal<Airport[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  columns: string[] = ['IATA Code', 'Name', 'Location', 'Actions'];

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.isLoading.set(true);
    this.error.set(null);
    this._apiService.getAirportsWithRelations().subscribe({
      next: (data) => {
        this.airports.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading airports:', err);
        this.error.set('Failed to load airports');
        this.isLoading.set(false);
      },
    });
  }

  onAddNew() {
    this._router.navigate(['/admin/database/airports/add']);
  }

  onEdit(airport: Airport) {
    this._router.navigate(['/admin/database/airports', airport.iataCode, 'edit']);
  }

  onDelete(airport: Airport) {
    if (confirm(`Are you sure you want to delete airport "${airport.iataCode}"?`)) {
      this._apiService.deleteAirport(airport.iataCode).subscribe({
        next: () => {
          this.airports.set(this.airports().filter((a) => a.iataCode !== airport.iataCode));
        },
        error: (err) => {
          console.error('Error deleting airport:', err);
          this.error.set('Failed to delete airport');
        },
      });
    }
  }
}
