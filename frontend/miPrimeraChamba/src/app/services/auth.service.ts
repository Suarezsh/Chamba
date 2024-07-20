import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }

  setUserData(userData: any) {
    this.cookieService.set('user_id', userData.user_id);
    this.cookieService.set('tipo', userData.tipo);
    this.cookieService.set('email', userData.email);
  }

  getUserData(): any {
    const user_id = this.cookieService.get('user_id');
    const tipo = this.cookieService.get('tipo');
    const email = this.cookieService.get('email');
    if (user_id && tipo && email) {
      return { user_id, tipo, email };
    }
    return null;
  }

  clearUserData() {
    this.cookieService.delete('user_id');
    this.cookieService.delete('tipo');
    this.cookieService.delete('email');
  }

  getUserInfo(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}user/`, { user_id: userId });
  }
}
