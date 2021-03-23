import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authS: AuthService) { }

  ngOnInit(): void {
  }


  login() {
    this._authS.getUser().subscribe(data => {
      console.log("data", data);
    })
  }
}
