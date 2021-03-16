import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const autRoutes: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'login',
        component: LoginComponent,
      },
      { 
        path: 'signup',
        component: SignupComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
