import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Offer } from '../models';

@Component({
  selector: 'app-offers-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './offers-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './offers-table.scss',
})
export class OffersTableComponent implements OnInit {
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  offers = signal<Offer[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  columns: string[] = [
    'Description',
    'Price',
    'Currency',
    'Created At',
    'Location',
    'Accommodation',
    'Outbound flight number',
    'Return flight number',
    'Tags',
    'Actions',
  ];

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.isLoading.set(true);
    this.error.set(null);
    this._apiService.getOffersWithRelations().subscribe({
      next: (data) => {
        this.offers.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading offers:', err);
        this.error.set('Failed to load offers');
        this.isLoading.set(false);
      },
    });
  }

  onAddNew() {
    this._router.navigate(['/admin/database/offers/add']);
  }

  onEdit(offer: Offer) {
    this._router.navigate(['/admin/database/offers', offer.id, 'edit']);
  }

  onDelete(offer: Offer) {
    if (confirm(`Are you sure you want to delete "${offer.location}"?`)) {
      this._apiService.deleteOffer(offer.id).subscribe({
        next: () => {
          this.offers.set(this.offers().filter((o) => o.id !== offer.id));
        },
        error: (err) => {
          console.error('Error deleting offer:', err);
          this.error.set('Failed to delete offer');
        },
      });
    }
  }
}
