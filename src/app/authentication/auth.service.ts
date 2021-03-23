import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface SignupData {
  username: string,
  email: string,
  password: string,
  cnfpass: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  api_url: string = '/api/register';
  constructor(private _http: HttpClient) { }

  isUserLoggedIn() {
    return false;
  }

  registerUser(formData: SignupData) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    console.log('formData::', formData);
    return this._http.post(this.api_url, formData, { 'headers': headers }).pipe(
      catchError(err => {
        console.log(err);
        return EMPTY;
      }));

  }
  getUser() {
    return this._http.get('/api/products').pipe(
      catchError(err => {
        console.log(err);
        return EMPTY;
      }));

  }

}
