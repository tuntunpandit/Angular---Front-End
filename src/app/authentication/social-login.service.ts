import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  socialProvider = '';
  constructor(private _http: HttpClient, private _OAuth: SocialAuthService, private _router: Router) { }

  isSocailMediaUserLoggedin() {
    if (this.socialProvider && (this.socialProvider !== '')) {
      return true;
    } else {
      return false;
    }
  }

  setSocialMediaUser(provider: string) {
    this.socialProvider = provider;
    this.isSocailMediaUserLoggedin();
  }
  saveSocailLoginData(responce) {
    return this._http.post('/api/socialUser', responce).pipe(
      catchError(err => {
        console.log(err);
        alert(err.message);
        return EMPTY;
      }));
  }

  logoutSocialUser() {
    this._OAuth.signOut();
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
