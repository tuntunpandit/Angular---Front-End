import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { SocialLoginService } from 'src/app/authentication/social-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authS: AuthService, private _socialService: SocialLoginService) { }

  ngOnInit(): void {
  }

  logout() {
    if (this._socialService.isSocailMediaUserLoggedin()) {
      this._socialService.logoutSocialUser();
    } else {
      this._authS.logoutUser();
    }

  }
}

