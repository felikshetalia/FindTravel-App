import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './admin-layout.scss',
})
export class AdminLayoutComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Check authentication status on layout init
    this.authService.checkAuth();
  }
}
