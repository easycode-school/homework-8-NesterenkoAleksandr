import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer } from './../interfaces/OnLoginAnswer';
import { User } from '../interfaces/user';
import { OnSignupAnswer } from '../interfaces/OnSignupAnswer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Подключение к серверу
   * @param email - адрес электронной почты пользователя
   * @param password - пароль пользователя
   */
  public login(email: string, password: string): Observable<OnLoginAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_id', res.id);
          localStorage.setItem('mlp_client_token', res.token);
        }
        return res;
      })
    );
  }

  /**
   * Регистрация нового пользователя
   * @param user - данные для регистрации нового пользователя
   */
  public signUp(user: User): Observable<OnSignupAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<OnSignupAnswer>(`${this.apiUrl}/public/auth/signup`, user, httpOptions);
  }
}
