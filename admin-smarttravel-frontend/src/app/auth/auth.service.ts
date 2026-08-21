import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);
  private apiUrl = 'http://localhost:3000/api/auth';

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

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
        credentials: 'include',
        body: JSON.stringify({ email, password, setupKey }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return true;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during registration');
    }
  }

  async logout(): Promise<void> {
    await fetch(`${this.apiUrl}/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    this.isLoggedIn.set(false);
  }

  async checkAuth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.apiUrl}/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        this.isLoggedIn.set(false);
        return false;
      }

      this.isLoggedIn.set(true);
      return true;
    } catch {
      this.isLoggedIn.set(false);
      return false;
    }
  }
}
