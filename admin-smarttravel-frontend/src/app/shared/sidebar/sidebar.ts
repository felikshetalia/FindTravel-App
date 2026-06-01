import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
