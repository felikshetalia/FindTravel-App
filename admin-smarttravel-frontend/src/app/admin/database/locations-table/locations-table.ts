import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Location } from '../models';
@Component({
  selector: 'app-flights-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations-table.html',
  styleUrl: './locations-table.scss',
})
export class LocationsTableComponent implements OnInit {
  private _apiService = inject(ApiService);

  locations = signal<Location[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  columns: string[] = ['City', 'State', 'Country', 'Actions'];

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.isLoading.set(true);
    this.error.set(null);
    this._apiService.getLocations().subscribe({
      next: (data) => {
        this.locations.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading locations:', err);
        this.error.set('Failed to load locations');
        this.isLoading.set(false);
      },
    });
  }

  onAddNew() {
    console.log('Add new location');
  }

  onEdit(location: Location) {
    console.log('Edit location:', location);
  }

  onDelete(location: Location) {
    if (confirm(`Are you sure you want to delete location "${location.id}"?`)) {
      this._apiService.deleteLocation(location.id).subscribe({
        next: () => {
          this.locations.set(this.locations().filter((l) => l.id !== location.id));
        },
        error: (err) => {
          console.error('Error deleting location:', err);
          this.error.set('Failed to delete location');
        },
      });
    }
  }
}
