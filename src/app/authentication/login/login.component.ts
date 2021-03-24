import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialLoginService } from '../social-login.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  socialuser: SocialUser;

  constructor(private _authS: AuthService, private _router: Router,
    private _socialService: SocialLoginService, private _OAuth: SocialAuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {

  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this._authS.loginUser(this.loginForm.value).subscribe(res => {
      console.log("loginData", res);
      localStorage.setItem('token', res.toString());
      this._router.navigate(['/dashboard']);
    })
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this._OAuth.signIn(socialPlatformProvider).then(userData => {
      console.log("userData After login::", userData);
      this.saveResponse(userData);
    });
  }

  saveResponse(socialusers: SocialUser) {
    this._socialService.saveSocailLoginData(socialusers).subscribe((res: any) => {
      this.socialuser = res;
      localStorage.setItem('token', JSON.stringify(this.socialuser.idToken));
      this._socialService.setSocialMediaUser(this.socialuser.provider);
      this._router.navigate(['/dashboard']);
    });
  }
}
