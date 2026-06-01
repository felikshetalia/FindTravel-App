import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Airport } from '../models';
@Component({
  selector: 'app-flights-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airports-table.html',
  styleUrl: './airports-table.scss',
})
export class AirportsTableComponent implements OnInit {
  private _apiService = inject(ApiService);

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
    console.log('Add new airport');
  }

  onEdit(airport: Airport) {
    console.log('Edit airport:', airport);
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
