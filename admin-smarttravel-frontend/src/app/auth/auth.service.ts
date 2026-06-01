import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);
  private accessToken: string | null = null;
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor() {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      this.accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.isLoggedIn.set(true);
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during login');
    }
  }

  async register(email: string, password: string, setupKey: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, setupKey }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during registration');
    }
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  checkAuth(): boolean {
    // Check if user is logged in from localStorage on app init
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.accessToken = token;
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('accessToken');
  }
}
