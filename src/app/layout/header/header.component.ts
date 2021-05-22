import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authS: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authS.logoutUser();
  }
}

