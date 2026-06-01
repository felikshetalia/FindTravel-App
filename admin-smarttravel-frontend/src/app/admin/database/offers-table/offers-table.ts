import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Offer } from '../models';

@Component({
  selector: 'app-offers-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './offers-table.html',
  styleUrl: './offers-table.scss',
})
export class OffersTableComponent implements OnInit {
  private _apiService = inject(ApiService);

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
    console.log('Add new offer');
  }

  onEdit(offer: Offer) {
    console.log('Edit offer:', offer);
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
