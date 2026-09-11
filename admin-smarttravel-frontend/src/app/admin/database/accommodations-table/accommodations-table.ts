import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Accommodation } from '../models';

@Component({
  selector: 'app-accommodations-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accommodations-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './accommodations-table.scss',
})
export class AccommodationsTableComponent implements OnInit {
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  accommodations = signal<Accommodation[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  columns: string[] = ['Name', 'Location', 'Address', 'Price/Night', 'Nights', 'Actions'];

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.isLoading.set(true);
    this.error.set(null);
    this._apiService.getAccommodationsWithRelations().subscribe({
      next: (data) => {
        this.accommodations.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading accommodations:', err);
        this.error.set('Failed to load accommodations');
        this.isLoading.set(false);
      },
    });
  }

  onAddNew() {
    this._router.navigate(['/admin/database/accommodations/add']);
  }

  onEdit(accommodation: Accommodation) {
    this._router.navigate(['/admin/database/accommodations', accommodation.id, 'edit']);
  }

  onDelete(accommodation: Accommodation) {
    if (confirm(`Are you sure you want to delete "${accommodation.name}"?`)) {
      this._apiService.deleteEntity('accommodations', accommodation.id).subscribe({
        next: () => {
          this.accommodations.set(this.accommodations().filter((a) => a.id !== accommodation.id));
        },
        error: (err) => {
          console.error('Error deleting accommodation:', err);
          this.error.set('Failed to delete accommodation');
        },
      });
    }
  }
}
