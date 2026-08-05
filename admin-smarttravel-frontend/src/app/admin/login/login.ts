import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { email, password } = this.loginForm.value;

      try {
        const success = await this.authService.login(email, password);
        if (success) {
          // Navigate to dashboard after successful login
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage.set('Invalid email or password');
        }
      } catch (error: any) {
        const errorMsg = error?.message || 'An error occurred. Please try again.';
        this.errorMessage.set(errorMsg);
        console.error('Login error:', error);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.errorMessage.set('Please fill in all fields');
    }
  }

  goToRegister() {
    this.router.navigate(['/admin/register']);
  }
}
