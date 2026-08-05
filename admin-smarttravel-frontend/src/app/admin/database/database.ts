import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface DatabaseTable {
  name: string;
  link: string;
  size: number;
}

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './database.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './database.scss',
})
export class DatabaseComponent implements OnInit {
  private _apiService = inject(ApiService);

  tables = signal<DatabaseTable[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  private tableConfig = [
    { name: 'Offers', link: '/admin/database/offers', apiMethod: 'getOffers' },
    {
      name: 'Accommodation',
      link: '/admin/database/accommodations',
      apiMethod: 'getAccommodations',
    },
    { name: 'Locations', link: '/admin/database/locations', apiMethod: 'getLocations' },
    { name: 'Airports', link: '/admin/database/airports', apiMethod: 'getAirports' },
    { name: 'Flights', link: '/admin/database/flights', apiMethod: 'getFlights' },
  ];

  ngOnInit() {
    this.loadTableCounts();
  }

  private loadTableCounts() {
    this.isLoading.set(true);
    this.error.set(null);

    const requests$ = this.tableConfig.map((config) => {
      const apiMethod = this._apiService[config.apiMethod as keyof ApiService] as any;
      return apiMethod
        .call(this._apiService)
        .toPromise()
        .then(
          (data: any) => ({
            ...config,
            size: Array.isArray(data) ? data.length : 0,
          }),
          (err: any) => {
            console.error(`Error loading ${config.name} count:`, err);
            return { ...config, size: 0 };
          },
        );
    });

    Promise.all(requests$)
      .then((results) => {
        this.tables.set(results);
        this.isLoading.set(false);
      })
      .catch((err) => {
        console.error('Error loading table counts:', err);
        this.error.set('Failed to load table counts');
        this.isLoading.set(false);
        // Set default empty tables
        this.tables.set(this.tableConfig.map((config) => ({ ...config, size: 0 })));
      });
  }
}
