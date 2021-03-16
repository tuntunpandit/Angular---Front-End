import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const autRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
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
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(autRoutes),
  ]
})
export class AuthModule { }
