import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, take, tap, mapTo } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Tokens } from '../models/tokens';
import { config } from '../config';

export interface SignupData {
  username: string,
  email: string,
  password: string,
  cnfpass: string
}
export interface LoginData {
  email: string,
  password: string,
}
export interface RefreshToken {
  refresh_token: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private _http: HttpClient, private _router: Router) { }

  isUserLoggedIn() {
    return !!this.getJwtToken();
  }

  registerUser(formData: SignupData) {
    console.log('formData::', formData);
    return this._http.post(`${config.apiUrl}/api/register`, formData)
      .pipe(
        catchError(err => {
          console.log(err);
          alert(err.error.message);
          return EMPTY;
        }));

  }
  loginUser(loginData: LoginData): Observable<boolean> {
    return this._http.post(`${config.apiUrl}/api/login`, loginData)
      .pipe(
        tap(tokens => this.doLoginUser(tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error.message);
          console.log(error);
          return of(false);
        })
      );
  }

  logoutUser() {
    return this._http.post<any>('/api/logout', {
      refresh_token: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  refreshToken() {
    return this._http.post<any>(`${config.apiUrl}/api/refresh`, {
      refresh_token: 'dsffa'
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt_token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  doLoginUser(tokens) {
    this.storeTokens(tokens);
    // write code for getting user data // /api/me
  }

  doLogoutUser() {
    this.removeTokens();
  }

  storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
