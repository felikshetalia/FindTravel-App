import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Flight } from '../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flights-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './flights-table.html',
  styleUrl: './flights-table.scss',
})
export class FlightsTableComponent implements OnInit {
  private _apiService = inject(ApiService);

  flights = signal<Flight[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  columns: string[] = [
    'Flight Number',
    'Airline',
    'From → To',
    'Departure',
    'Arrival',
    'Price',
    'Currency',
    'Actions',
  ];

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.isLoading.set(true);
    this.error.set(null);
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading flights:', err);
        this.error.set('Failed to load flights');
        this.isLoading.set(false);
      },
    });
  }

  onAddNew() {
    console.log('Add new flight');
  }

  onEdit(flight: Flight) {
    console.log('Edit flight:', flight);
  }

  onDelete(flight: Flight) {
    if (confirm(`Are you sure you want to delete flight "${flight.flightNumber}"?`)) {
      this._apiService.deleteFlight(flight.id).subscribe({
        next: () => {
          this.flights.set(this.flights().filter((f) => f.id !== flight.id));
        },
        error: (err) => {
          console.error('Error deleting flight:', err);
          this.error.set('Failed to delete flight');
        },
      });
    }
  }
}
