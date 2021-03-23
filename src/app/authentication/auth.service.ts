import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  url: string = 'http//localhost:3000/api/register'
  constructor(private _http: HttpClient) { }

  isUserLoggedIn() {
    return false;
  }

  registerUser(formData: SignupData) {
    return this._http.post(this.url, formData, { observe: 'body' }).pipe(
      catchError(err => {
        console.log(err);
        // this.msgS.global({ type: 'danger', content: err.message });
        return EMPTY;
      }))

  }

}
