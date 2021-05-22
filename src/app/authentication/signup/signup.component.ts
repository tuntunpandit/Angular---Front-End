import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService, SignupData } from '../auth.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  regForm: FormGroup;
  constructor(private _authS: AuthService, private _router: Router) {
    this.regForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnf_password: new FormControl(null, this.passwordValidator),
    });

    this.regForm.controls.password.valueChanges
      .subscribe(
        x => this.regForm.controls.cnf_password.updateValueAndValidity()
      )
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.regForm.get(controlName).invalid && this.regForm.get(controlName).touched;
  }
  passwordValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          }
        }
      }
    }

    return null;
  }

  regiserUser() {

    if (this.regForm.invalid) {
      return;
    }
    console.log('registerData', this.regForm.value);
    this._authS.registerUser(this.regForm.value).subscribe(res => {
      console.log('registerData', res);
      this._router.navigate(['/login']);
      alert(`Account created successfully`);
    })
  }
}
