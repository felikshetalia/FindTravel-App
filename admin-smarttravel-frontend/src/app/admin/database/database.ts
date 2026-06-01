import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  styleUrl: './database.scss',
})
export class DatabaseComponent {
  tables: DatabaseTable[] = [
    { name: 'Offers', link: '/admin/database/offers', size: 4 },
    { name: 'Accommodation', link: '/admin/database/accommodations', size: 4 },
    { name: 'Locations', link: '/admin/database/locations', size: 4 },
    { name: 'Airports', link: '/admin/database/airports', size: 4 },
    { name: 'Flights', link: '/admin/database/flights', size: 4 },
  ];
}
