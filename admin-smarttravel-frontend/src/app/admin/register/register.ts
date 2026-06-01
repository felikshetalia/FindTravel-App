import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      setupKey: ['', [Validators.required]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMessage.set('Passwords do not match');
        return;
      }

      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const { email, password: pass, setupKey } = this.registerForm.value;

      try {
        const success = await this.authService.register(email, pass, setupKey);
        if (success) {
          this.successMessage.set('Registration successful! Redirecting to login...');
          setTimeout(() => {
            this.router.navigate(['/admin/login']);
          }, 2000);
        }
      } catch (error: any) {
        const errorMsg = error?.message || 'Registration failed. Please try again.';
        this.errorMessage.set(errorMsg);
        console.error('Register error:', error);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.errorMessage.set('Please fill in all fields correctly');
    }
  }

  goToLogin() {
    this.router.navigate(['/admin/login']);
  }
}
