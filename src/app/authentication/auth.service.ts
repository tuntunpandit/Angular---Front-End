import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  registerUser(formData: SignupData) {
    console.log('formData::', formData);
    return this._http.post('/api/register', formData).pipe(
      catchError(err => {
        console.log(err);
        alert(err.message);
        return EMPTY;
      }));

  }
  loginUser(formData: LoginData) {
    return this._http.post('/api/login', formData).pipe(
      catchError(err => {
        console.log(err);
        alert(err.message);
        return EMPTY;
      }));
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
