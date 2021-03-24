import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _authS: AuthService, private _router: Router) {
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
}
