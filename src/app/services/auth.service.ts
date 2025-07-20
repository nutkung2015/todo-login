import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token || localStorage.getItem('token') || '';
  }

  setAuthorizationHeader(token: string) {
    // สร้าง header สำหรับ requests ที่ต้องการ authentication
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // ตรวจสอบว่า token หมดอายุหรือไม่
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expired = tokenData.exp * 1000 < Date.now();

      if (expired) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}