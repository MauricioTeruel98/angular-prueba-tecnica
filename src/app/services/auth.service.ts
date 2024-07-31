import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    if (email === 'user@demo.com' && password === '123456') {
      this.isAuthenticated = true;
      localStorage.setItem('authToken', 'fake-jwt-token'); // Almacenar token de autenticación en localStorage
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken'); // Eliminar token de autenticación de localStorage
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('authToken'); // Verificar autenticación
  }
}
